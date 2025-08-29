const express = require('express');
const app = express();

app.use(express.json());

app.post('/bfhl', (req, res) => {
  try {
    const data = req.body.data || [];
    
    // REPLACE WITH YOUR DETAILS
    const full_name = "moksh";
    const dob = "01012000";
    const email = "moksh@example.com";
    const roll_number = "VIT123";
    
    const evenNumbers = [];
    const oddNumbers = [];
    const alphabets = [];
    const specialChars = [];
    let sum = 0;
    let alphaChars = [];
    
    data.forEach(item => {
      const str = String(item);
      
      if (!isNaN(str) && str.trim() !== '') {
        const num = Number(str);
        sum += num;
        
        if (num % 2 === 0) {
          evenNumbers.push(str);
        } else {
          oddNumbers.push(str);
        }
      } else if (/^[a-zA-Z]+$/.test(str)) {
        alphabets.push(str.toUpperCase());
        alphaChars.unshift(...str.split(''));
      } else {
        specialChars.push(str);
      }
    });
    
    let concatString = "";
    for (let i = 0; i < alphaChars.length; i++) {
      if (i % 2 === 0) {
        concatString += alphaChars[i].toUpperCase();
      } else {
        concatString += alphaChars[i].toLowerCase();
      }
    }
    
    const response = {
      is_success: true,
      user_id: `${full_name}_${dob}`,
      email: email,
      roll_number: roll_number,
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialChars,
      sum: String(sum),
      concat_string: concatString
    };
    
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      is_success: false,
      error: "An error occurred while processing the request"
    });
  }
});

// ADD THIS FOR GET REQUESTS
app.get('/bfhl', (req, res) => {
  res.json({ 
    operation_code: 1,
    message: "API is working! Use POST method with JSON data." 
  });
});

module.exports = app;
