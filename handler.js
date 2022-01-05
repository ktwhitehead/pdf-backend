'use strict';
const chrome = require("chrome-aws-lambda");

const getBrowser = async (chromium) => {
    const browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true
    })

  return browser;
}



module.exports.hello = async (event) => {
  const browser = await getBrowser(chrome);

  console.log("KEATON", browser)

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v2.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};
