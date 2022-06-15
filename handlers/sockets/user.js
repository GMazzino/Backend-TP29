export default async function userWsHandler(msg, sockets, user) {
  sockets.emit(msg, user);
}
