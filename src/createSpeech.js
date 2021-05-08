const fs = require("fs");
const path = require("path");
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

require("dotenv").config();

const apikey = process.env.API_KEY;
const serviceUrl = process.env.SERVICE_URL;

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey,
  }),
  serviceUrl
});

function createAudioFile(text, id) {
  const synthesizeParams = {
    text,
    accept: "audio/mp3",
    voice: "pt-BR_IsabelaV3Voice",
  }

  return new Promise(async (resolve, reject) => {
    const response = await textToSpeech.synthesize(synthesizeParams);
    const buffer = response.result;

    const filePath = path.resolve(__dirname, "..", "temp", `comment-${id}.mp3`);

    const stream = fs.createWriteStream(filePath);

    buffer.pipe(stream);

    buffer.on("end", () => {
      resolve(filePath);
    });

    buffer.on("error", (error) => {
      reject(error);
    });
  });
}

module.exports = {
  createAudioFile
};