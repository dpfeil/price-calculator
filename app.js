/**
 * Price Calculator
 * ----------------
 * Calculates and prints the total cost of all the items listed by the user
 */

const prompt = require("prompt");
const PriceTable = require("./PriceTable");


// Set prompt schema
var schema = {
  properties: {
    items: {
	    description: 'Please enter all the items purchased separated by a comma',
    	type: 'string', 
      pattern: /^[a-zA-Z\s\,]+$/,
      message: 'Entries must be only letters, spaces, or commas',
      required: true,
    },
  }
};


// Start the prompt
prompt.start();


// Get list of items from the user
prompt.get(schema, (err, result) => {

  // 1. Parse list of items
  // 2. Get count of items
  // 3. Calculate costs
  // 4. Print receipt
  console.log(result);
});