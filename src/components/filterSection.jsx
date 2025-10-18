"use client";
import { useState } from "react";

export default function FilterSection({ uniqBrands, categoryList }) {
  // Active filter section (default)
  const [activeFilter, setActiveFilter] = useState("Thickness");

  // Selected values for filters
  const [selectedValues, setSelectedValues] = useState({});

  // Filter options
  const filters = {
    Brand: uniqBrands,
    Category: categoryList,
    Price: ["1 Year", "2 Years", "5 Years"],
    Rating: ["All ratings", "4 & Up", "3 & Up", "2 & Up", "1 & Up"],
    Sort: ["Price: Low to High", "Price: High to Low", "Newest"]
  };

  // Handle selection (single choice)
  const handleSelect = (filterName, value) => {
    setSelectedValues((prev) => ({ ...prev, [filterName]: value }));
  };

  // Clear all selections
  const handleClearAll = () => {
    setSelectedValues({});
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 ">
      <div className="w-full md:w-[800px] mx-auto border border-gray-300 rounded-2xl bg-white shadow-sm flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="text-gray-800 font-semibold text-lg tracking-wide">FILTERS</h3>
          <button
            onClick={handleClearAll}
            className="text-pink-600 text-sm font-semibold hover:text-pink-700"
          >
            CLEAR ALL
          </button>
        </div>

        {/* Main Filter Area */}
        <div className="flex flex-col md:flex-row h-[400px]">
          
          {/* Left Section - Filter Categories */}
          <div className="w-full md:w-1/3 border-r p-4 flex flex-col gap-3">
            {Object.keys(filters).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-left text-sm font-medium px-3 py-2 rounded-lg transition ${
                  activeFilter === filter
                    ? "bg-pink-50 text-pink-600 border-l-4 border-pink-500"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Right Section - Filter Options */}
          <div className="flex-1 p-4">
            <h4 className="text-gray-800 font-semibold mb-3">{activeFilter}</h4>
            <div className="grid grid-cols-3 gap-2 text-sm text-gray-700">
              {filters[activeFilter]?.length ? (
                filters[activeFilter].map((option, index) => (
                  <label key={index} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={activeFilter}
                      value={option}
                      checked={selectedValues[activeFilter] === option}
                      onChange={() => handleSelect(activeFilter, option)}
                      className="accent-pink-500"
                    />
                    {option}
                  </label>
                ))
              ) : (
                <p className="text-gray-400 text-sm italic">No options available</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4 flex justify-center">
          <button className="border border-pink-600 text-pink-600 rounded-lg py-2 px-8 font-medium hover:bg-pink-50">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
