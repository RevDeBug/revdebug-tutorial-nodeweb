// ErrorHandler.js

class ErrorHandler {
  static handleError(error, req, res) {
      // Log the error to the console or send it to a logging service
      console.error('An error occurred:', error);
      
      // If revdebug is available, use it to report the error
      if (typeof revdebug !== 'undefined') {
          revdebug.exception(error);
      }
      
      // Send a generic error response
      res.status(500).json({ message: 'An error occurred, please try again later.' });
  }
}

module.exports = ErrorHandler;
