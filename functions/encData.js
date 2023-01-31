const openpgp = require("openpgp");

const encData = async (publicKeyArmored, plainText) => {
  try {
    const publicKey = await openpgp.readKey({
      armoredKey: publicKeyArmored,
    });
    const encryptedData = await openpgp.encrypt({
      message: await openpgp.createMessage({ text: plainText }),
      encryptionKeys: publicKey,
    });
    return { message: encryptedData, status: true };
  } catch (error) {
    return { message: error.message, status: false };
  }
};

module.exports = encData;
