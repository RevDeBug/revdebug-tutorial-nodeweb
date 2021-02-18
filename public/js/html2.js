// Secondary website script.

function webWorkerInject() {
    let w = new Worker("/js/webworkerinject.js", {type: 'module'});
}

function webWorkerLocal() {
    let w = new Worker("/js/webworkerlocal.js", {type: 'module'});
}

console.log('html2.js loaded');
