const express = require('express');
const path = require('path');
const ErrorHandler = require('./ErrorHandler'); // Import the ErrorHandler class

const app = express();

// Middleware for JSON parsing (optional if using POST requests)
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Render the main page
app.get('/', (req, res) => {
  res.render('home');  // Render dynamic home.ejs
});

// Middleware for serving static files (after rendering routes)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint that returns data as JSON
app.post('/api/data', (req, res, next ) => {
    const { num1, num2 } = req.body; 
    res.json({ message: 'Hello from the server!' });
});

// Render the about page
app.get('/about', (req, res) => {
    res.render('about');
});

// Route for rendering the invoices page
app.get('/invoices', (req, res) => {
    res.render('invoices'); // Render the invoices.ejs file
});

// Error endpoint to perform calculations using POST
app.post('/error', (req, res, next) => {
    const { num1, num2 } = req.body; // Get parameters from the body of the request

    try {
        const number1 = parseFloat(num1);
        const number2 = parseFloat(num2);

        // Check for invalid numbers
        if (isNaN(number1) || isNaN(number2)) {
            throw new Error('Invalid numbers provided');
        }

        // Perform a calculation
        if (number2 === 0) {
            throw new Error('Division by zero is not allowed');
        }

        const result = number1 / number2; // Example calculation
        res.json({ result }); // Return the result as JSON
    } catch (error) {
        // Pass the error to the next middleware (error handler)
        next(error);
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    ErrorHandler.handleError(err, req, res);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
