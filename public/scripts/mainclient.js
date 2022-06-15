export const socket = io();

const denormaliceChatMsgs = (chatMsgs) => {
  const user = new normalizr.schema.Entity('user');
  const msg = new normalizr.schema.Entity('msg', { author: user });
  const chat = new normalizr.schema.Array(msg);
  return normalizr.denormalize(chatMsgs.result, chat, chatMsgs.entities);
};
try {
  document
    .querySelector('#frmNewProduct')
    .addEventListener('submit', async (e) => {
      if (e.cancelable) {
        e.preventDefault();
        await fetch('./api/productos-test', {
          method: 'POST',
          body: JSON.stringify({
            newProducts: document.querySelector(
              '#frmNewProduct input[name=newProducts]'
            ).value,
          }),

          headers: { 'Content-Type': 'application/json' },
        });
      }
    });
} catch (err) {}

socket.on('renderProducts', async (products) => {
  renderProducts(products);
});

socket.on('login', async (name) => {
  await renderUsernameLogin(name);
});

async function renderProducts(products) {
  const hbsTpl = await (
    await fetch('../hbs/templates/productsgrid.hbs')
  ).text();
  const hbsTplProductsGrid = Handlebars.compile(hbsTpl);
  try {
    document.querySelector('#productsGrid').innerHTML = hbsTplProductsGrid({
      products: products,
    });
  } catch (err) {}
}

async function renderUsernameLogin(userName) {
  const hbsTpl = await (await fetch('../hbs/templates/userName.hbs')).text();
  const hbsTplUser = Handlebars.compile(hbsTpl);
  try {
    document.querySelector('#userName').innerHTML = hbsTplUser({
      userName,
    });
  } catch (err) {}
}

try {
  document.querySelector('#frmChat').addEventListener('submit', (e) => {
    if (e.cancelable) {
      e.preventDefault();
      if (document.querySelector("#frmChat input[name='email'").value != '') {
        const chatMsg = {
          id: '',
          text: document.querySelector("#frmChat input[name='msg'").value,
          time: '',
          author: {
            id: document.querySelector("#frmChat input[name='email'").value,
            fname: document.querySelector("#frmChat input[name='fname'").value,
            lname: document.querySelector("#frmChat input[name='lname'").value,
            age: document.querySelector("#frmChat input[name='age'").value,
            alias: document.querySelector("#frmChat input[name='alias'").value,
            avatar: document.querySelector("#frmChat input[name='avatar'")
              .value,
          },
        };
        document.querySelector("#frmChat input[name='msg'").value = '';
        socket.emit('chatMsg', JSON.stringify(chatMsg));
      }
    }
  });
} catch (err) {}

socket.on('newChatMsg', async (chatMsgs) => {
  const denormalizedChatMsgs = denormaliceChatMsgs(JSON.parse(chatMsgs));
  document.querySelector('#tc').innerHTML =
    (
      (parseInt(chatMsgs.length) /
        parseInt(JSON.stringify(denormalizedChatMsgs).length) -
        1) *
      100
    ).toFixed(2) + '%';
  console.log(
    `norm: ${chatMsgs.length}\ndenorm:${
      JSON.stringify(denormalizedChatMsgs).length
    }`
  );
  await renderChatMsg(denormalizedChatMsgs);
});

async function renderChatMsg(chatMsgs) {
  const hbsTpl = await (await fetch('../hbs/templates/chatmsg.hbs')).text();
  const hbsTplChatMsg = Handlebars.compile(hbsTpl);
  document.querySelector('#chatMsgs').innerHTML = hbsTplChatMsg({
    chatMsgs: chatMsgs,
  });
}
