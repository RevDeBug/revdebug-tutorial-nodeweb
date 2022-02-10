

function errorFunction() {
    throw new Error('Web Error');
}

function noErrorFunction() {
    console.log('Nothing to see here, move along...');
}

function startSreenRecord() {
    console.log('Start screen recording...');
    revdebug.setScreenRec(true);
}

function stopSreenRecord() {
    console.log('Stop screen recording!');
    revdebug.setScreenRec(false);
}

console.log('html.js loaded');
