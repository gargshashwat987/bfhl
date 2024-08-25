import React, { useState } from "react";
import "./App.css";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleJsonInput = (e) => {
    setJsonInput(e.target.value);
  };

  const validateJson = () => {
    try {
      JSON.parse(jsonInput);
      setError("");
      return true;
    } catch (e) {
      setError("Invalid JSON format");
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateJson()) return;

    // Call the backend API
    try {
      const response = await fetch(
        "https://bfhl-ol73jaubv-shashwat-gargs-projects-2f65123e.vercel.app/api/bfhl",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: jsonInput,
        }
      );
      const data = await response.json();
      setResponseData(data);
      // Show dropdown if data is received
      setDropdownOptions([
        "Alphabets",
        "Numbers",
        "Highest lowercase alphabet",
      ]);
    } catch (error) {
      setError("Error processing the request");
    }
  };

  const handleDropdownChange = (e) => {
    const { value, checked } = e.target;
    setSelectedOptions((prev) =>
      checked ? [...prev, value] : prev.filter((opt) => opt !== value)
    );
  };

  const renderResponse = () => {
    if (!responseData || selectedOptions.length === 0) return null;

    // Filter the response based on selected dropdown options
    let filteredData = {};
    if (selectedOptions.includes("Alphabets")) {
      filteredData.alphabets = responseData.alphabets;
    }
    if (selectedOptions.includes("Numbers")) {
      filteredData.numbers = responseData.numbers;
    }
    if (selectedOptions.includes("Highest lowercase alphabet")) {
      filteredData.highestLowercase = responseData.highestLowercase;
    }
    return (
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Filtered Response</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(filteredData, null, 2)}
        </pre>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">API Input</h1>
        <textarea
          value={jsonInput}
          onChange={handleJsonInput}
          placeholder='{"data":["M","1","334","4","B"]}'
          rows="3"
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded mt-2 hover:bg-blue-700"
        >
          Submit
        </button>

        {dropdownOptions.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Multi Filter</h2>
            <div className="flex flex-wrap gap-2">
              {dropdownOptions.map((option, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={option}
                    onChange={handleDropdownChange}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {renderResponse()}
      </div>
    </div>
  );
}

export default App;
