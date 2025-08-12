import React, { useState } from "react";
import PropTypes from "prop-types";

import { toast } from "react-toastify";

import styles from "./ParametersForm.module.css";
import clsx from "clsx";

export default function ParametersForm({ theme, params }) {
  const [instrument, setInstrument] = useState(params?.instrument || "XAUUSD");
  const [volume, setVolume] = useState(params?.volume || 0.01);
  const [factor, setFactor] = useState(params?.factor || 9);

  const handleSubmit = (e) => {
    e.preventDefault();

    const parameters = {
      instrument: instrument,
      volume: volume,
      factor: factor,
    };

    localStorage.setItem("parameters", JSON.stringify(parameters));
    toast.success("Parameters saved successfully!");
  };

  return (
    <div className={styles.cont}>
      <form className={styles.panelParameters} onSubmit={handleSubmit}>
        <div className={styles.parametersTitle}>Parameters</div>

        <label
          className={clsx(
            styles.parametersLabel,
            theme === "light" && styles.labelLight
          )}
          htmlFor="instrument">
          Instrument
        </label>
        <select
          className={clsx(
            styles.parametersSelect,
            theme === "violet" && styles.selectViolet
          )}
          id="instrument"
          value={params?.instrument || instrument}
          onChange={(e) => setInstrument(e.target.value)}>
          <option>XAUUSD</option>
          <option>US30</option>
          <option>BTCUSD</option>
          <option>EURUSD</option>
        </select>

        <label
          className={clsx(
            styles.parametersLabel,
            theme === "light" && styles.labelLight
          )}
          htmlFor="volume">
          Minimum Volume
        </label>
        <input
          className={clsx(
            styles.parametersInput,
            theme === "violet" && styles.inputViolet
          )}
          type="number"
          id="volume"
          value={params?.volume || volume}
          step="0.01"
          min="0.01"
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />

        <label
          className={clsx(
            styles.parametersLabel,
            theme === "light" && styles.labelLight
          )}
          htmlFor="factor">
          Boost Factor
        </label>
        <input
          className={clsx(
            styles.parametersInput,
            theme === "violet" && styles.inputViolet
          )}
          type="number"
          id="factor"
          value={params?.factor || factor}
          min="1"
          max="50"
          onChange={(e) => setFactor(parseInt(e.target.value))}
        />

        <button type="submit" className={styles.startBtn}>
          Apply
        </button>
      </form>
    </div>
  );
}

ParametersForm.propTypes = {
  theme: PropTypes.string.isRequired,
  params: PropTypes.shape({
    instrument: PropTypes.string,
    volume: PropTypes.number,
    factor: PropTypes.number,
  }),
};
