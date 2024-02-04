const http = require('http');
const fs = require('fs');
const multer = require('multer');

// Multer Function
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '..', 'uploads');

        // Check if the directory exists, create if not
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

const server = http.createServer((req, res) => {
    // Check the requested URL
    if (req.url === '/') {

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('This is Home Page\n');

    } else if (req.url === '/about') {

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('This is About Page\n');

    } else if (req.url === '/contact') {

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('This is Contact Page\n');

    } else if (req.url === '/file-write') {

        fs.writeFile('demo.txt', 'hello world', function (err) {
            if (err) {
                res.writeHead(200, { 'content-Type': 'text/html' });
                res.write('File Not Save');
                res.end();
            } else {
                res.writeHead(200, { 'content-Type': 'text/html' });
                res.write('File is Save');
                res.end();
            }
        });

    } else if (req.method === 'POST' && req.url === '/multerfileuploads') {

        // Handle file upload
        upload.single('file')(req, res, (err) => {
            if (err) {
                console.error('Error during file upload:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error during file upload: ' + err.message);
            } else {
                console.log('File uploaded successfully:', req.file);
                // Send a JSON response after successful file upload
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: true,
                    message: 'File uploaded successfully.',
                    file: req.file,
                }));
            }
        });

    } else {

        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found\n');
        
    }
});

module.exports = server;
