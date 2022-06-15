import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import os from 'os';
import cluster from 'cluster';
import appConfig from './config.js';
import { args } from './config.js';
import { routerProducts, products } from './routes/products.js';
import { routerRoot } from './routes/root.js';
import { routerLogout } from './routes/logout.js';
import { routerInfo } from './routes/info.js';
import { routerRandom } from './routes/random.js';
import { sendLogin } from './handlers/routes/login.js';
import chatMsgsWsHandler from './handlers/sockets/chat_msgs.js';
import userWsHandler from './handlers/sockets/user.js';
import session from './handlers/session/mongo_store.js';
import { name } from './handlers/auth/auth.js';
import { passportLocal } from './handlers/passport/passport_local.js';

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const serverPort = appConfig.PORT;
const mode = args.mode;
const msgs = [];
const cpus = os.cpus().length;

io.on('connection', async (socket) => {
  console.log('User connected');
  io.sockets.emit('renderProducts', products.getProducts().content);
  chatMsgsWsHandler(socket, io.sockets, msgs);
  userWsHandler('login', io.sockets, name);
});
app.io = io;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './html');
app.use(session);
app.use(passportLocal.initialize());
app.use(passportLocal.session());

app.use('/', routerRoot);
app.use('/logout', routerLogout);
app.use('/api', routerProducts);
app.use('/api/randoms', routerRandom);
app.use('/info', routerInfo);

app.get('/login', sendLogin);
app.post(
  '/login',
  passportLocal.authenticate('login', {
    failureRedirect: '/failLogin',
    failureMessage: true,
    successRedirect: '/',
  })
);

app.get('/failLogin', (req, res) => {
  res.status(400).render('errors.ejs', {
    error: req.session.messages[0],
    redirect: '/login',
  });
});

app.post(
  '/register',
  passportLocal.authenticate('register', {
    failureRedirect: '/failRegister',
    failureMessage: true,
    successRedirect: '/registerOk',
  })
);
app.get('/failRegister', (req, res) => {
  res.status(400).render('errors.ejs', {
    error: req.session.messages[0],
    redirect: '/register.html',
  });
});

app.get('/registerOk', (req, res) => {
  res.status(200).render('success.ejs', {
    message: 'Se ha creado el usuario. Ya puede ingresar',
    redirect: '/login',
  });
});

if (mode === 'CLUSTER') {
  if (cluster.isPrimary) {
    console.log(
      `Servidor iniciando en modo cluster\nPID de proceso padre: ${process.pid}\nCantidad de CPU's: ${cpus}`
    );
    for (let i = 0; i < cpus; i++) {
      cluster.fork();
    }
    cluster.on('exit', () => {
      cluster.fork();
    });
  } else {
    console.log(`PID proceso hijo: ${process.pid}`);
    httpServer
      .listen(serverPort, () => {
        console.log(`Servidor activo y escuchando en puerto ${serverPort}`);
      })
      .on('error', (error) => console.log(error.message));
  }
} else {
  console.log(
    `Servidor iniciando en modo fork\nPID de proceso: ${process.pid}`
  );
  httpServer
    .listen(serverPort, () => {
      console.log(`Servidor activo y escuchando en puerto ${serverPort}`);
    })
    .on('error', (error) => console.log(error.message));
}
