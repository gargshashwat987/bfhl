module.exports = (req, res) => {
  if (req.method === "GET") {
    res.status(200).json({ operation_code: 1 });
  } else if (req.method === "POST") {
    const data = req.body.data || [];
    const numbers = [];
    const alphabets = [];
    let highest_alphabet = "";

    for (const item of data) {
      if (!isNaN(item)) {
        numbers.push(item);
      } else if (item.length === 1 && isNaN(item)) {
        alphabets.push(item);
        if (
          !highest_alphabet ||
          item.toUpperCase() > highest_alphabet.toUpperCase()
        ) {
          highest_alphabet = item;
        }
      }
    }

    res.json({
      is_success: true,
      user_id: "shashwat_garg_21112003",
      email: "shashwat.garg2021@vitstudent.ac.in",
      roll_number: "21BCE3590",
      numbers: numbers,
      alphabets: alphabets,
      highest_alphabet: highest_alphabet ? [highest_alphabet] : [],
    });
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
