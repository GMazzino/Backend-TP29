import { socket } from "./mainclient.js";

socket.on("logout", async (name) => {
  await renderUsernameLogout(name);
});

async function renderUsernameLogout(userName) {
  const hbsTpl = await (await fetch("../hbs/templates/userName.hbs")).text();
  const hbsTplUser = Handlebars.compile(hbsTpl);
  document.querySelector("#userName").innerHTML = hbsTplUser({
    userName,
  });
}
