const app = require('./app');
const https = require('https');
const fs = require('fs');
const path = require('path');

const port = 3000;

const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, 'ssl/private.key')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl/certificate.crt'))
};

https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`HTTPS Server is running on https://localhost:${port}`);
});