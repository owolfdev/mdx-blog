"use client";

import { useTheme } from "next-themes";
import Select, { type StylesConfig, type MultiValue } from "react-select";
// import categoryData from "@/settings/categories.json";

// const categories: string[] = categoryData.categories;

interface OptionType {
  value: string;
  label: string;
}

type StylesType = StylesConfig<OptionType, true>;

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

  const customStyles: StylesType = {
    option: (defaultStyles, { isFocused }) => ({
      ...defaultStyles,
      backgroundColor: isFocused ? "hsl(var(--muted))" : "transparent",
      color:
        theme === "dark" ? "hsl(var(--foreground))" : "hsl(var(--foreground))",
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
          : "rgba(209, 213, 219, 0.7)",
      borderRadius: "0.35rem",
      color: "rgba(0, 0, 0, 0.7)",
      fontSize: "14px",
    }),
    control: (defaultStyles, { isFocused }) => ({
      ...defaultStyles,
      borderRadius: "0.35rem",
      backgroundColor: "hsl(var(--background))",
      borderColor:
        theme === "dark"
          ? isFocused
            ? "rgba(255, 255, 255, 0.7)"
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
    clearIndicator: (provided) => ({
      ...provided,
      color:
        theme === "dark"
          ? "rgba(255, 255, 255, 0.7)"
          : "rgba(107, 114, 128, 0.7)",
      "&:hover": {
        color:
          theme === "dark"
            ? "rgba(255, 255, 255, 1)"
            : "rgba(107, 114, 128, 1)",
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color:
        theme === "dark"
          ? "rgba(255, 255, 255, 0.7)"
          : "rgba(107, 114, 128, 0.7)",
      "&:hover": {
        color:
          theme === "dark"
            ? "rgba(255, 255, 255, 1)"
            : "rgba(107, 114, 128, 1)",
      },
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor:
        theme === "dark"
          ? "rgba(255, 255, 255, 0.3)"
          : "rgba(107, 114, 128, 0.7)",
    }),
  };

  return (
    <div>
      <Select<OptionType, true>
        styles={customStyles}
        className="text-lg sm:text-sm focus:ring-0 focus:outline-none"
        value={selectedCategories?.map((category) => ({
          value: category,
          label: category,
        }))}
        onChange={(selectedOptions: MultiValue<OptionType>) => {
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
