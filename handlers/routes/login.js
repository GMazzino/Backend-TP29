import { cwd as nodePath } from 'node:process';
import { sep } from 'node:path';

async function sendLogin(req, res) {
  await res.sendFile(`${nodePath()}${sep}html${sep}login.html`);
}

export { sendLogin };
