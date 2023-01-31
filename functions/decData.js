const openpgp = require("openpgp");

const decData = async (privateKeyArmored, passphrase, encryptedData) => {
  try {
    const privateKey = await openpgp.decryptKey({
      privateKey: await openpgp.readPrivateKey({
        armoredKey: privateKeyArmored,
      }),
      passphrase,
    });
    const message = await openpgp.readMessage({
      armoredMessage: encryptedData,
    });
    const { data: plainText } = await openpgp.decrypt({
      message,
      decryptionKeys: privateKey,
    });
    return plainText;
  } catch (error) {
    return error.message;
  }
};

module.exports = decData;
