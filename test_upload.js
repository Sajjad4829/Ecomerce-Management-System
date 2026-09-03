const fs = require('fs');
const http = require('http');
const path = require('path');

// Create a dummy image file
const dummyPath = path.join(__dirname, 'dummy.png');
fs.writeFileSync(dummyPath, 'fake image data');

const FormData = require('form-data'); // Form-data should be installed or we can just mock a multipart request, wait form-data is usually not globally available if not in package.json. Let's check package.json for form-data.
