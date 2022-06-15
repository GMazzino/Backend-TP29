import bcrypt from 'bcrypt';
import appConfig from '../config.js';

const bcryptSalts = appConfig.BCRYPT_SALT_ROUNDS || 12;

export async function hashDehash(
  params = { pwd: pwd, pwdHash: pwdHash, op: op }
) {
  if (params?.op) {
    switch (params.op) {
      case 'hash':
        if (!params?.pwd) {
          throw new Error('Se requiere una contraseña');
        } else {
          const pwdHash = await bcrypt.hash(params.pwd, bcryptSalts);
          if (!pwdHash) {
            throw new Error(`No se pudo cifrar la contraseña\n${err}`);
          } else {
            return pwdHash;
          }
        }
        break;

      case 'dehash':
        if (params?.pwd && params?.pwdHash) {
          return await bcrypt.compare(params.pwd, params.pwdHash);
        } else {
          throw new Error('Se requiere una contraseña');
        }
        break;

      default:
        throw new Error('Operacion no implementada');
    }
  }
}
