"use client";

import { useState, useEffect } from "react";

interface DashboardOption {
  id: string;
  label: string;
  category: "general" | "specific" | string;
}

interface UseDashboardOptionsReturn {
  optionsState: Record<string, boolean>;
  toggleOption: (id: string) => void;
  generalOptions: DashboardOption[];
  specificOptions: DashboardOption[];
  resetOptions: () => void;
}

const useDashboardOptions = (
  defaultOptions: DashboardOption[]
): UseDashboardOptionsReturn => {
  const [optionsState, setOptionsState] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const savedOptions = localStorage.getItem("Options");
      if (savedOptions) {
        setOptionsState(JSON.parse(savedOptions));
      } else {
        const initialState = defaultOptions.reduce((acc, option) => {
          acc[option.id] = false;
          return acc;
        }, {} as Record<string, boolean>);
        setOptionsState(initialState);
      }
    } catch (error) {
      console.error("Failed to load options from localStorage:", error);
    }
  }, [defaultOptions]);

  useEffect(() => {
    try {
      localStorage.setItem("Options", JSON.stringify(optionsState));
    } catch (error) {
      console.error("Failed to save options to localStorage:", error);
    }
  }, [optionsState]);

  const toggleOption = (id: string) => {
    setOptionsState((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const resetOptions = () => {
    const initialState = defaultOptions.reduce((acc, option) => {
      acc[option.id] = false;
      return acc;
    }, {} as Record<string, boolean>);
    setOptionsState(initialState);
  };

  const generalOptions = defaultOptions.filter((option) => option.category === "general");
  const specificOptions = defaultOptions.filter((option) => option.category === "specific");

  return {
    optionsState,
    toggleOption,
    generalOptions,
    specificOptions,
    resetOptions,
  };
};

export default useDashboardOptions;
