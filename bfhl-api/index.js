const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const FULL_NAME = "guravana_chakradhar_naidu";      
const DOB_DDMMYYYY = "22062005";          
const EMAIL = "chakradharguravana25@gmail.com";   
const ROLL_NUMBER = "22BCE9849";     

const isDigitsOnly = (s) => /^[0-9]+$/.test(s);
const isLettersOnly = (s) => /^[a-zA-Z]+$/.test(s);

function alternatingCapsReverse(chars) {
  const out = [];
  const rev = chars.slice().reverse();
  for (let i = 0; i < rev.length; i++) {
    out.push(i % 2 === 0 ? rev[i].toUpperCase() : rev[i].toLowerCase());
  }
  return out.join("");
}

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body && Array.isArray(req.body.data) ? req.body.data : null;

    const base = {
      user_id: `${FULL_NAME}_${DOB_DDMMYYYY}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER
    };

    if (!data) {
      return res.status(200).json({
        is_success: false,
        ...base,
        odd_numbers: [],
        even_numbers: [],
        alphabets: [],
        special_characters: [],
        sum: "0",
        concat_string: ""
      });
    }

    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;
    const allLetters = [];

    for (const item of data) {
      const str = String(item);

      
      for (const ch of str) {
        if (/[a-zA-Z]/.test(ch)) allLetters.push(ch);
      }

      if (isDigitsOnly(str)) {
        const n = parseInt(str, 10);
        (n % 2 === 0 ? even_numbers : odd_numbers).push(str); 
        sum += n;
      } else if (isLettersOnly(str)) {
        alphabets.push(str.toUpperCase()); 
      } else {
        special_characters.push(str);
      }
    }

    const concat_string = alternatingCapsReverse(allLetters);

    return res.status(200).json({
      is_success: true,
      ...base,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum), 
      concat_string
    });
  } catch (err) {
    return res.status(200).json({
      is_success: false,
      user_id: `${FULL_NAME}_${DOB_DDMMYYYY}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers: [],
      even_numbers: [],
      alphabets: [],
      special_characters: [],
      sum: "0",
      concat_string: ""
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`BFHL API running on port ${PORT}`));

