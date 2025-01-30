"use client"
import React from 'react'
import useDashboardOptions from "app/Hooks/useDashboardOptions";

const defaultOptions = [
  { id: "hasStock", label: "Has Stock", category: "general" },
  { id: "hasVariants", label: "Has Variants", category: "specific" },
  { id: "hasSizes", label: "Has Sizes", category: "specific" },
  { id: "hasBrands", label: "Has Brands", category: "general" },
  { id: "SimpleStock", label: "Simple Stock", category: "general" },
];
const OptionsClient = () => {
    const {
        optionsState,
        toggleOption,
        generalOptions,
        specificOptions,
        resetOptions,
      } = useDashboardOptions(defaultOptions);
    
      return (
        <div className="p-6 space-y-6 bg-gray-50 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard Options</h1>
    
          <section>
            <h2 className="text-lg font-medium text-gray-600 mb-4">General Options</h2>
            <div className="space-y-4">
              {generalOptions.map((option) => (
                <div key={option.id} className="flex items-center justify-between">
                  <span className="text-gray-700">{option.label}</span>
                  <button
                    onClick={() => toggleOption(option.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      optionsState[option.id]
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {optionsState[option.id] ? "Enabled" : "Disabled"}
                  </button>
                </div>
              ))}
            </div>
          </section>
    
          <section>
            <h2 className="text-lg font-medium text-gray-600 mb-4">Specific Options</h2>
            <div className="space-y-4">
              {specificOptions.map((option) => (
                <div key={option.id} className="flex items-center justify-between">
                  <span className="text-gray-700">{option.label}</span>
                  <button
                    onClick={() => toggleOption(option.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      optionsState[option.id]
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {optionsState[option.id] ? "Enabled" : "Disabled"}
                  </button>
                </div>
              ))}
            </div>
          </section>
    
          <section>
            <h2 className="text-lg font-medium text-gray-600 mb-4">Output</h2>
            <pre className="p-4 bg-gray-200 rounded text-sm">{JSON.stringify(optionsState, null, 2)}</pre>
          </section>
    
          <button
            onClick={resetOptions}
            className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
          >
            Reset Options
          </button>
        </div>
      );
}

export default OptionsClient