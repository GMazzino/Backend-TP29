import 'dotenv/config';
import parseArgs from 'minimist';

const options = {
  alias: {
    p: 'port',
    m: 'mode',
  },
  default: {
    port: 8080,
    mode: 'FORK',
  },
};
export const args = parseArgs(process.argv.slice(2), options);

export default {
  PORT: args.port || 8080,
  BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS) || 12,
  mongoRemote: {
    client: 'mongodb',
    url: process.env.MONGO_URL,
    advancedOptions: { useNewUrlParser: true, useUnifiedTopology: true },
  },
  sessionSecret: process.env.BCRYPT_SECRET || 'BCryPt_S3cR3t.',
};
