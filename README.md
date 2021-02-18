## REVDEBUG NODE AND SIMPLE WEB TUTORIAL

Simple test to show errors working for several different environments covered:

* Node main thread.
* Node worker thread.
* Browser main thead.
* Browser WebWorker with injected revdebug.
* Browser WebWorker with local import revdebug.

Configure RevDeBug repository:

    npm config set @revdebug:registry https://nexus.revdebug.com/repository/npm/

Install dependancies (including RevDeBug):

    npm install

\* Note: Before instrumenting you may need to change the "host" (and maybe "port" / "webPort") fields in "revdebug.json" or specify different values on the command line if you are not running the record server locally.

Normal instrument:

    npx revd

Or instrument passing different host:

    npx revd --host your_record_server.com

And off we go...

    npm start

Then navigate with the browser to probably "http://localhost:3000/". After this you can test the various errors by clicking their respective buttons. Keep in mind that the server is running and serving pages so when you try a server error you will see a traceback with server init as well as any pages served up to that point. Same idea for the browser main thread, you will see the individual scripts loaded as well as any previous errors tested. The thread recordings don't do this since they are started from scratch for each error. Also make sure to hit the browser back button after each server error test or you will be requesting another one any time you refresh the page.
