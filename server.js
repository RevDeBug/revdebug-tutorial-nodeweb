// const path     = require('path');
const {Worker} = require('worker_threads');
const express  = require('express');
const app      = express();
const port     = 3000;
const root     = `${__dirname}/public/`;

app.get('/', (req, res) => {
    res.sendFile('index.html', {root});
})

app.get('/server_thread_error', (req, res) => {
    let w = new Worker('./worker.js');

    res.sendFile('index.html', {root});
})

app.get('/server_error', (req, res) => {
    throw new Error('Server Error');
})

app.get('/:name', (req, res) => {
    res.sendFile(req.params.name, {root});
})

app.use(function (err, req, res, next) {
    revdebug.unhandled(err);
    next(err);
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

// require('child_process').exec(
//     (process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open') +
//     ` http://localhost:${port}/`);
