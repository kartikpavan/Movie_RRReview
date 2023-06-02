const crypto = require("crypto");

const generateRandomBytes = () => {
   return new Promise((resolve, reject) => {
      crypto.randomBytes(30, (err, buff) => {
         if (err) return reject(err);
         const bufferString = buff.toString("hex");
         resolve(bufferString);
      });
   });
};

module.exports = { generateRandomBytes };
