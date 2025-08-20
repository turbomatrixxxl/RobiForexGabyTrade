import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./ChatInput.module.css";

export default function ChatInput({
  type,
  placeholder,
  required,
  className,
  name,
  handleChange,
  width,
  value,
  paddingLeft,
  autoComplete,
  handleBlur,
  children,
  textarea = false,
}) {
  const commonProps = {
    autoComplete: autoComplete || "off",
    style: { paddingLeft: paddingLeft || "0px" },
    onChange: handleChange,
    name: name || "",
    className: clsx(styles.input, className),
    placeholder: placeholder || "",
    required: required || false,
    value: value || "",
    onBlur: handleBlur,
  };

  return (
    <div style={{ width: width || "auto" }} className={styles.inputContainer}>
      {textarea ? (
        <textarea
          {...commonProps}
          rows="1"
          //   onInput={(e) => {
          //     handleChange && handleChange(e);
          //   }}
          className={clsx(styles.input, className)} // adaugi o clasă
        />
      ) : (
        <input
          className={clsx(styles.input, className)}
          {...commonProps}
          type={type || "text"}
        />
      )}
      {children}
    </div>
  );
}

ChatInput.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  paddingLeft: PropTypes.string,
  autoComplete: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  name: PropTypes.string,
  type: PropTypes.string,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  textarea: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  placeholder: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  children: PropTypes.node,
};
