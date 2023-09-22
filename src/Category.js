import React, { useState } from "react";

import axios from "axios";

const LabeledInput = ({ setCategory }) => {
  const [input, setinput] = useState("");
  const [selectedOption, setSelectedOption] = useState(""); //for know if he click "other" operation
  const [message, setMessage] = useState(""); // for error handler
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    setinput(e.target.value);
    // Reset the otherValue when a different option is selected
    if (e.target.value === "other") {
      setinput("");
    }
  };
  const CreateFolder = () => {
    setCategory(input);
    if (input) {
      axios
        .post("http://localhost:3001/create-folder", { input }) // send name of input to create folder in backend
        .then((response) => {
          alert(response.data.message);
        })
        .catch((error) => {
          setMessage("Folder creation failed.");
        });
    } else {
      setMessage("Please enter a category.");
    }
  };
  return (
    <div className="mb-4">
      <h1 className="text-5xl font-bold text-blue-600 mb-4 py-8 alig text-center">
        Welcome
      </h1>
      <label className="block text-gray-700 text-sm font-bold mb-2 pb-2">
        Categorization your image
      </label>

      <select
        id="choices"
        value={selectedOption}
        onChange={handleSelectChange}
        className="block mx-auto my-3 bg-white border border-gray-300 rounded-md py-2 px-4 text-gray-700
         leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="">Select an option</option>
        <option value="Clothes">Clothes</option>
        <option value="Animal">Animal</option>
        <option value="Food">Food</option>
        <option value="person">person</option>
        <option value="other">Other</option>
      </select>
      {selectedOption === "other" && (
        <>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
             focus:outline-none focus:shadow-outline my-3"
            type="text"
            placeholder={"Category or name"}
            onChange={(e) => setinput(e.target.value)}
            value={input}
          />
        </>
      )}

      <p className="text-red-700 text-sm py-3">{message}</p>

      <button
        className={`mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded `}
        onClick={CreateFolder}
      >
        Let's Edit
      </button>
    </div>
  );
};

export default LabeledInput;
