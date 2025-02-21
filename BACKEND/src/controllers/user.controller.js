const userIdUpload = async (req, res) => {
  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res
        .status(400)
        .json({ error: 'Invalid input. "data" must be an array.' });
    }

    // Separate numbers and alphabets
    const numbers = [];
    const alphabets = [];

    data.forEach((item) => {
      if (/^\d+$/.test(item)) {
        numbers.push(item); // Collect numbers
      } else if (/^[A-Za-z]+$/.test(item)) {
        alphabets.push(item.toUpperCase()); // Convert to uppercase for consistency
      }
    });

    // Find the highest alphabet based on the first character of each string
    let highest_alphabet = "";
    if (alphabets.length > 0) {
      highest_alphabet = alphabets.reduce((a, b) =>
        a[0].charCodeAt(0) > b[0].charCodeAt(0) ? a : b
      )[0]; // Return only the first letter
    }

    // Prepare the response
    const response = {
      is_success: true,
      user_id: "YASH_DHIMAN",
      email: "22BCS15737@cuchd.in",
      roll_number: "22BCS15737",
      numbers,
      alphabets,
      highest_alphabet,
    };

    // Send the response
    res.json({ data: response, success: true });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { userIdUpload };
