import React, { useState } from "react";
import axios from "axios";

function App() {
  const [inputJson, setInputJson] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState();
  const [loading, setLoading] = useState(false);

  const options = [
    { label: "Alphabets", value: "alphabets" },
    { label: "Numbers", value: "numbers" },
    { label: "Highest Alphabet", value: "highest_alphabet" },
  ];

  const handleInputChange = (e) => {
    setInputJson(e.target.value);
    setError("");
  };

  const validateJson = (jsonString) => {
    try {
    console.log("Original Input:", jsonString); // Debugging: Log original input

    // Replace curly quotes with straight quotes
    const correctedJsonString = jsonString.replace(/[“”]/g, '"');
    console.log("Corrected Input:", correctedJsonString); // Debugging: Log corrected input

    // Remove any hidden characters (e.g., zero-width spaces, non-breaking spaces)
    const cleanedJsonString = correctedJsonString.replace(/[\u200B-\u200D\uFEFF]/g, '');
    console.log("Cleaned Input:", cleanedJsonString); // Debugging: Log cleaned input

    // Parse the JSON
    const parsedJson = JSON.parse(cleanedJsonString);
    console.log("Parsed JSON:", parsedJson); // Debugging: Log parsed JSON

    // Validate the JSON structure
    if (!parsedJson.data || !Array.isArray(parsedJson.data)) {
      throw new Error('Invalid JSON format. Expected { "data": [...] }');
    }

    return parsedJson;
  } catch (error) {
    console.error("Validation Error:", error.message); // Debugging: Log the exact error
    throw new Error("Invalid JSON format");
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const parsedJson = validateJson(inputJson);
      const apiResponse = await axios.post(
        "https://bajajrba.vercel.app/process",
        parsedJson
      );
      console.log("apiRes", apiResponse.data.data);
      setResponse(apiResponse.data.data);
      setError("");
      setShowDropdown({
        alphabets: !!apiResponse.data.alphabets,
        numbers: !!apiResponse.data.numbers,
        highestAlphabet: !!apiResponse.data.highest_alphabet,
      });
    } catch (error) {
      setError(error.message);
      setResponse(null);
      setShowDropdown({
        alphabets: false,
        numbers: false,
        highestAlphabet: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = (value) => {
    console.log("sele", selectedOptions);

    setSelectedOptions((prev) =>
      prev.includes(value)
        ? prev.filter((option) => option !== value)
        : [...prev, value]
    );
  };

  const renderResponse = () => {
    if (!response) return null;
    return (
      <>
        <h1 className="text-lg md:text-xl font-semibold mb-1 mt-2">
          Filtered Response
        </h1>
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          {selectedOptions.includes("alphabets") && response.alphabets && (
            <div className="mb-2">
              <h3 className="font-semibold text-base md:text-lg">Alphabets</h3>
              <p className="text-gray-700">{response.alphabets.join(", ")}</p>
            </div>
          )}
          {selectedOptions.includes("numbers") && response.numbers && (
            <div className="mb-2">
              <h3 className="font-semibold text-base md:text-lg">Numbers</h3>
              <p className="text-gray-700">{response.numbers.join(", ")}</p>
            </div>
          )}
          {selectedOptions.includes("highest_alphabet") &&
            response.highest_alphabet && (
              <div>
                <h3 className="font-semibold text-base md:text-lg">
                  Highest Alphabet
                </h3>
                <p className="text-gray-700">
                  {response.highest_alphabet.join(", ")}
                </p>
              </div>
            )}
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 sm:p-6">
      <h1 className="text-lg sm:text-3xl font-bold mb-4 sm:mb-6">
        YASH_DHIMAN_22BCS15737
      </h1>
      <div className="w-full max-w-md sm:max-w-lg bg-white shadow-md rounded-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">
          Enter JSON Input
        </h2>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
          rows="5"
          value={inputJson}
          onChange={handleInputChange}
          placeholder='Example: { "data": ["A", "C", "z"] }'
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          className="w-full mt-4 bg-red-900 text-white font-semibold py-2 rounded-md hover:bg-red-700 flex items-center justify-center"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <span className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></span>
          ) : (
            "Submit"
          )}
        </button>
      </div>
      {showDropdown && response && (
        <div className="w-full max-w-md sm:max-w-lg bg-white shadow-md rounded-lg p-4 sm:p-6 mt-4">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">MULTIFILTER</h2>
          <div className="flex flex-wrap gap-2">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleButtonClick(option.value)}
                className={`px-3 sm:px-4 py-1 sm:py-2 rounded-md font-medium transition-colors ${
                  selectedOptions.includes(option.value)
                    ? "bg-red-900 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
                disabled={!response}
              >
                {option.label}
              </button>
            ))}
          </div>
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
