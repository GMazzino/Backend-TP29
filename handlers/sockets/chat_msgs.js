import { Contenedor as File } from '../../modules/contenedor.js';
import { normaliceChatMsgs } from '../../models/normalizr/chat_msgs.js';

export default async function chatMsgsWsHandler(socket, sockets, msgs) {
  socket.on('chatMsg', async (msg) => {
    const d = new Date();
    const logMsgs = new File('./logmsgs.txt');
    let normalizedChatMsgs;
    msg = JSON.parse(msg);
    msg.time = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
    await logMsgs.save(msg);
    msgs.push(msg);
    normalizedChatMsgs = normaliceChatMsgs(msgs);
    sockets.emit('newChatMsg', JSON.stringify(normalizedChatMsgs));
  });
}
