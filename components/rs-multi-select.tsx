"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Select from "react-select";
import categoryData from "@/settings/categories.json";

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
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  menu: (provided: any) => any;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  clearIndicator: (provided: any, state: any) => any;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  dropdownIndicator: (provided: any, state: any) => any;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  indicatorSeparator: (provided: any, state: any) => any;
}

interface MultiSelectProps {
  categories: string[];
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}

export function MultiSelect({
  categories,
  selectedCategories = [],
  setSelectedCategories,
}: MultiSelectProps) {
  const { theme } = useTheme();

  const customStyles: CustomStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      backgroundColor: state.isFocused
        ? theme === "dark"
          ? "hsl(var(--muted))"
          : "hsl(var(--muted))"
        : "transparent",
      color: state.isFocused
        ? theme === "dark"
          ? "hsl(var(--foreground))"
          : "hsl(var(--foreground))"
        : theme === "dark"
          ? "hsl(var(--foreground))"
          : "hsl(var(--foreground))",
    }),
    placeholder: (provided) => ({
      ...provided,
      color:
        theme === "dark"
          ? "hsl(var(--muted-foreground))"
          : "hsl(var(--muted-foreground))",
      fontSize: "14px",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor:
        theme === "dark"
          ? "rgba(255, 255, 255, 0.7)"
          : "rgba(209, 213, 219, 0.7)", // Light gray for dark mode, original muted for light mode
      borderRadius: "0.35rem",
      color: "rgba(0, 0, 0, 0.7)",
      fontSize: "14px",
    }),
    control: (defaultStyles, state) => ({
      ...defaultStyles,
      borderRadius: "0.35rem",
      backgroundColor: "hsl(var(--background))",
      borderColor:
        theme === "dark"
          ? state.isFocused
            ? "rgba(255, 255, 255, 0.7)" // Tailwind white with 70% opacity
            : "rgba(255, 255, 255, 0.7)"
          : "hsl(var(--border))",
      boxShadow: "none",
      "&:hover": {
        borderColor:
          theme === "dark" ? "rgba(255, 255, 255)" : "hsl(var(--border))",
      },
    }),
    input: (styles) => ({
      ...styles,
      color:
        theme === "dark" ? "hsl(var(--foreground))" : "hsl(var(--foreground))",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor:
        theme === "dark" ? "hsl(var(--background))" : "hsl(var(--background))",
      color: "hsl(var(--foreground))",
    }),
    clearIndicator: (provided, state) => ({
      ...provided,
      color:
        theme === "dark"
          ? "rgba(255, 255, 255, 0.7)" // White with 70% opacity in dark mode
          : "rgba(107, 114, 128, 0.7)", // Tailwind's gray-500 with 70% opacity in light mode
      "&:hover": {
        color:
          theme === "dark"
            ? "rgba(255, 255, 255, 1)" // Fully white on hover in dark mode
            : "rgba(107, 114, 128, 1)", // Fully gray on hover in light mode
      },
    }),

    dropdownIndicator: (provided, state) => ({
      ...provided,
      color:
        theme === "dark"
          ? "rgba(255, 255, 255, 0.7)" // White with 70% opacity in dark mode
          : "rgba(107, 114, 128, 0.7)", // Tailwind's gray-500 with 70% opacity in light mode
      "&:hover": {
        color:
          theme === "dark"
            ? "rgba(255, 255, 255, 1)" // Fully white on hover in dark mode
            : "rgba(107, 114, 128, 1)", // Fully gray on hover in light mode
      },
    }),

    indicatorSeparator: (provided, state) => ({
      ...provided,
      backgroundColor:
        theme === "dark"
          ? "rgba(255, 255, 255, 0.3)" // Light separator in dark mode
          : "rgba(107, 114, 128, 0.7)", // Tailwind's gray-500 with 70% opacity in light mode
    }),
  };

  return (
    <div>
      <Select
        styles={customStyles}
        className="text-lg sm:text-sm focus:ring-0 focus:outline-none"
        value={selectedCategories?.map((category) => ({
          value: category,
          label: category,
        }))}
        onChange={(selectedOptions) => {
          const selectedValues = selectedOptions.map((option) => option.value);
          setSelectedCategories(selectedValues);
        }}
        options={categories.map((category) => ({
          value: category,
          label: category,
        }))}
        isMulti
      />
    </div>
  );
}
