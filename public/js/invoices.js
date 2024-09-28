function handleError(error) {
  // Log the error to the console or send it to a logging service
  console.error('An error occurred:', error);
  
  // If revdebug is available, use it to report the error
  if (typeof revdebug !== 'undefined') {
      revdebug.exception(error);
  }
  
  // Return a user-friendly error message
  return 'An error occurred while processing your request. Please try again later.';
}

document.getElementById('calculateBtn').addEventListener('click', calculate);
document.getElementById('sendBtn').addEventListener('click', send);

function calculate() {
  try {
      const multiplier = parseFloat(document.getElementById('multiplier').value);
      const selectedInvoiceType = document.getElementById('invoiceType').value;
      let result = complexCalculation(multiplier, selectedInvoiceType);
      let finalResult = finalCalculation(result, selectedInvoiceType);

      document.getElementById('statusMessage').innerText = `Calculations completed successfully! Result: ${finalResult}`;
      document.getElementById('statusMessage').style.color = 'green';
  } catch (error) {
      const errorMessage = handleError(error); // Use ErrorHandler
      document.getElementById('statusMessage').innerText = errorMessage;
      document.getElementById('statusMessage').style.color = 'red';
  }
}

function complexCalculation(multiplier, invoiceType) {
  if (isNaN(multiplier) || multiplier <= 0) {
      throw new Error('Multiplier must be a positive number!');
  }

  let adjustedMultiplier = multiplier;
  if (invoiceType === 'proforma') {
      adjustedMultiplier *= 10;
  } else if (invoiceType === 'recurring') {
      throw new Error('Cannot process recurring invoices!');
  }

  const intermediateValue = Math.sqrt(adjustedMultiplier) * Math.PI;
  if (intermediateValue > 10) {
      throw new Error('Intermediate value exceeded expected range!');
  }

  return intermediateValue;
} 

function finalCalculation(value, invoiceType) {
  const divisor = invoiceType === 'recurring' ? 0 : 10;
  if (divisor === 0) {
      throw new Error('Division by zero error!');
  }
  return value / divisor;
}

async function send() {
  try {
      const multiplier = parseFloat(document.getElementById('multiplier').value);
      const selectedInvoiceType = document.getElementById('invoiceType').value;

      let url;
      if (selectedInvoiceType === 'standard') {
          url = '/error'; // Replace with actual URL for standard invoices
          // url = '/error'; // Replace with actual URL for standard invoices
      } else {
          url = '/api/data'; // Replace with actual URL for other invoice types
      }

      // Call the new getFetch function with POST method
      await getFetch(url, { multiplier, invoiceType: selectedInvoiceType });
  } catch (error) {
     
      document.getElementById('statusMessage').innerText = "Fetch Error";
      document.getElementById('statusMessage').style.color = 'red';
  }
}

function getFetch(uri, data) {
  return fetch(uri, {
    method: 'POST', // Change to POST
    headers: {
        'Content-Type': 'application/json', // Set the content type
    },
    body: JSON.stringify(data) // Convert the data to JSON string
})
.then((response) => {
    console.log('fetch resp:', response);
    return response.text().then((text) => {
        console.log(text);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return text; // Return the text if needed
    });
}) 
.then((text) => {
      console.log('Response:', text);
      document.getElementById('statusMessage').innerText = 'Sent successfully!';
      document.getElementById('statusMessage').style.color = 'green';
      return text; // Return the text if needed
  })
  .catch((error) => {
      // Handle fetch errors using handleError and update statusMessage
      document.getElementById('statusMessage').innerText ="Fetch Error";
      document.getElementById('statusMessage').style.color = 'red';
  });
  console.log('This is done after, should not be part of error recording for above.');
}
