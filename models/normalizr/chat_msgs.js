import { normalize, schema } from "normalizr";

export function normaliceChatMsgs(data) {
  const user = new schema.Entity("user");
  const msg = new schema.Entity("msg", { author: user });
  const chatMsgs = new schema.Array(msg);
  return normalize(data, chatMsgs);
}
