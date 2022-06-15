import { fork } from 'child_process';

export function randomNums(req, res) {
  let quantity;
  if (!isNaN(req.query?.cant)) {
    quantity = parseInt(req.query.cant);
  } else {
    quantity = 100000000;
  }
  const rndNums = fork(`./forks/random_child.js`);
  rndNums.on('message', (msg) => {
    if (msg == 'child_ready') {
      rndNums.send(quantity);
    } else {
      msg.process = process.pid;
      res.status(200).json(msg);
    }
  });
}
