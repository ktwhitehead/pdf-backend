'use strict';
const chrome = require("chrome-aws-lambda");

const getBrowser = async (chromium) => {
    const browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
      ignoreHTTPSErrors: true
    })

  return browser;
}

module.exports.pdf = async (event) => {
  const browser = await getBrowser(chrome);
  const page = await browser.newPage()

  const body = JSON.parse(event.body)
  const { css, html } = body

  await page.setContent(html, { waitUntil: 'networkidle0' })
  await page.addStyleTag({ content: css })

  const pdf = await page.pdf({ format: 'A4' })

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/pdf' },
    body: pdf.toString('base64'),
    isBase64Encoded: true
  };
};
