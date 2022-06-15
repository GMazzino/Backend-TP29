import { mongoose, userModel } from '../../models/db/mongodb_schemas.js';
import appConfig from '../../config.js';

class User {
  async #dbConnection() {
    try {
      await mongoose.connect(appConfig.mongoRemote.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      mongoose.connection.on('error', (err) => {
        throw Error(err.message);
      });
      return mongoose.connection;
    } catch (err) {
      throw Error(err.message);
    }
  }

  //---------------------------------------------------------------------------
  // findUserByName: Verifies if user exists in db.
  // Param user: username to be searched
  // Returns foundUser: user object in case it exists in db or null otherwise
  //---------------------------------------------------------------------------
  async findUserByName(userName) {
    if (userName) {
      const db = await this.#dbConnection();
      try {
        const foundUser = await userModel.findOne({ user: userName });
        db.close();
        return foundUser;
      } catch (err) {
        throw Error(err.message);
      }
    } else {
      throw new Error('Error en la petición. Se requiere usuario');
    }
  }

  //---------------------------------------------------------------------------
  // addUser: Adds a new user to db.
  // Params user: username
  //        pwdHash: password hash
  //---------------------------------------------------------------------------
  async addUser(userName, pwdHash) {
    if (userName && pwdHash) {
      try {
        let newUser = await this.findUserByName(userName);
        if (!newUser) {
          const db = await this.#dbConnection();
          newUser = await userModel.create({
            user: userName,
            pwdHash: pwdHash,
          });
          db.close();
          return newUser;
        } else {
          throw new Error('El usuario ingresado ya existe');
        }
      } catch (err) {
        throw Error(err.message);
      }
    } else {
      throw new Error('Error en la petición. Se requiere usuario y contraseña');
    }
  }
}

export const user = new User();
