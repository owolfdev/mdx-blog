"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Select from "react-select";
import categoryData from "@/data/settings/categories.json";

const categories: string[] = categoryData.categories;

interface CustomStyles {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  option: (defaultStyles: any, state: any) => any;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  placeholder: (provided: any, state: any) => any;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  multiValue: (provided: any, state: any) => any;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  control: (defaultStyles: any, state: any) => any;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  input: (styles: any) => any;
}

interface MultiSelectProps {
  categories: string[]; // Array of categories
  selectedCategories: string[]; // Ensure this is always an array
  setSelectedCategories: (categories: string[]) => void;
}

export function MultiSelect({
  categories,
  selectedCategories = [], // Default to an empty array if undefined
  setSelectedCategories,
}: MultiSelectProps) {
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    selectedCategories?.length > 0 &&
      console.log("selectedCategories", selectedCategories);
  }, [selectedCategories]);

  const initialCustomStyles: CustomStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: "#6B7280",
      fontSize: "14px",
    }),
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: "#e2e8f0",
      borderRadius: "0.35rem",
      color: "#6B7280",
      fontSize: "14px",
    }),
    control: (defaultStyles, state) => ({
      ...defaultStyles,
      borderRadius: "0.35rem",
      backgroundColor: "transparent",
      borderColor: "gray-300",
    }),
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    input: (styles: any) => ({
      ...styles,
      color: "black",
    }),
  };

  const [customStyles, setCustomStyles] =
    useState<CustomStyles>(initialCustomStyles);

  useEffect(() => {
    //console.log("theme", theme)
    setCustomStyles({
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      option: (defaultStyles: any, { isFocused }) => ({
        ...defaultStyles,
        backgroundColor: isFocused
          ? theme === "dark" || theme === "system"
            ? "#e2e8f0"
            : "#e2e8f0"
          : "transparent",
        color: isFocused
          ? theme === "dark" || theme === "system"
            ? "black"
            : "#6B728"
          : theme === "dark" || theme === "system"
          ? "black"
          : "#6B728",
        ":active": {
          ...defaultStyles[":active"],
          backgroundColor: isFocused
            ? theme === "dark" || theme === "system"
              ? "#e2e8f0"
              : "#e2e8f0"
            : "transparent",
          color: isFocused
            ? theme === "dark" || theme === "system"
              ? "black"
              : "#6B728"
            : theme === "dark" || theme === "system"
            ? "black"
            : "#6B728",
        },
      }),
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      placeholder: (provided: any, state: any) => ({
        // Styles for the placeholder text
        ...provided,
        color: "#6B7280",
        fontSize: "14px",
      }),

      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      multiValue: (provided: any, state: any) => ({
        // Styles for the placeholder text
        ...provided,
        backgroundColor: "#e2e8f0",
        borderRadius: "0.35rem",
        color: "#6B7280",
        fontSize: "14px",
      }),

      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      control: (defaultStyles: any, state: any) => ({
        ...defaultStyles,
        borderRadius: "0.35rem",
        backgroundColor: "transparent",
        borderColor: "--border",
        boxShadow: state.isFocused
          ? theme === "dark"
            ? "0 0 0 2px black, 0 0 0 4px hsl(216, 34%, 17%)"
            : "0 0 0 2px white, 0 0 0 4px hsl(215, 20.2%, 65.1%)"
          : "none",
        "&:hover": {
          borderColor: "--border",
        },
      }),
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      input: (styles: any) => ({
        ...styles,
        color: theme === "dark" ? "#e2e8f0" : "black",
      }),
    });
  }, [theme]);

  return (
    <div>
      <div>
        <Select
          styles={customStyles}
          className=""
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          value={selectedCategories?.map((category: any) => ({
            value: category,
            label: category,
          }))}
          onChange={(selectedOptions) => {
            const selectedValues = selectedOptions.map(
              (option) => option.value
            );
            setSelectedCategories(selectedValues);
          }}
          options={categories.map((category) => ({
            value: category,
            label: category,
          }))}
          isMulti
        />
      </div>
    </div>
  );
}
