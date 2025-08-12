import React, { useState, useEffect, useRef } from "react";
// import { useDispatch } from "react-redux";
// import { updateTheme } from "../../redux/private/operationsPrivate"; // Adjust the import path for your Redux slice
// import { useAuth } from "../../hooks/useAuth"; // Adjust the import path for your custom hook
// import { refreshUser } from "../../redux/auth/operationsAuth";

import clsx from "clsx";

import { HiChevronDown, HiChevronUp } from "react-icons/hi";

import styles from "./LanguageSelector.module.css";

export default function LanguageSelector({ theme, lang }) {
  // const dispatch = useDispatch();
  // const { user } = useAuth(); // Get user info

  const [langA, setLang] = useState(lang || "english");
  const [isOpen, setIsOpen] = useState(false); // Controls dropdown open/close

  const dropdownRef = useRef(null); // Ref for dropdown to detect clicks outside

  const handleSelect = (selectedLang) => {
    setLang(selectedLang);
    // dispatch(updateTheme(selectedTheme)); // Dispatch action with selected theme
    console.log();

    localStorage.setItem("lang", selectedLang); // Save theme to localStorage
    // Timeout to delay `refreshUser` to give backend time to update
    // setTimeout(() => {
    //   dispatch(refreshUser());
    // }, 500); // Adjust timeout duration as necessary

    setIsOpen(false); // Close the dropdown
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close dropdown if click is outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.selector} ref={dropdownRef}>
      {/* Display "Theme" when dropdown is closed */}
      <button
        className={styles.button}
        onClick={() => setIsOpen((prev) => !prev)}>
        <span
          className={clsx(
            styles.span,
            theme === "dark" || theme === "violet"
              ? styles.spanDark
              : styles.span
          )}>
          Lang
        </span>
        {!isOpen ? (
          <HiChevronDown
            className={clsx(
              styles.svg,
              theme === "dark" || theme === "violet"
                ? styles.svgDark
                : styles.svg
            )}
          />
        ) : (
          <HiChevronUp
            className={clsx(
              styles.svg,
              theme === "dark" || theme === "violet"
                ? styles.svgDark
                : styles.svg
            )}
          />
        )}
      </button>

      {/* Dropdown options */}
      {isOpen && (
        <ul
          className={clsx(
            styles.options,
            theme === "dark" ? styles.optionsDark : styles.options,
            theme === "violet" ? styles.optionsViolet : styles.options
          )}>
          {["romanian", "english"].map((option) => (
            <li
              key={option}
              className={clsx(
                styles.option,
                theme === "dark" ? styles.optionDark : styles.option,
                option === langA &&
                  (theme === "violet"
                    ? styles.activeOptionViolet
                    : styles.activeOption)
              )}
              onClick={() => handleSelect(option)}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
