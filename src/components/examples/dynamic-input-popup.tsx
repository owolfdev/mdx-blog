"use client";

import React, { useState } from "react";

export default function DynamicInputPopup() {
  const [inputValue, setInputValue] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    if (inputValue) {
      setShowPopup(true);
    }
  };

  return (
    <div className="pb-4">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type something..."
        className="border p-2 rounded-md"
      />
      <button
        type="button"
        onClick={handleButtonClick}
        className="ml-2 bg-blue-500 p-2 rounded-md"
      >
        Show Popup
      </button>
      {showPopup && (
        <div className="flex flex-col gap-4 mt-4 p-4 border rounded-md">
          <p>{inputValue}</p>
          <button
            type="button"
            onClick={() => setShowPopup(false)}
            className="bg-red-500 text-white p-2 rounded-md"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
