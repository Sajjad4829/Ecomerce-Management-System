const http = require('http');

const data = JSON.stringify({
  content: { layout: [] },
  settings: {}
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/cms/library/configurations/SECTION_BUILDER',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
