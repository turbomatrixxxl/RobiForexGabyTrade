import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import clsx from "clsx";
import styles from "./ParametersForm.module.css";

export default function ParametersForm({ theme }) {
  const [robots, setRobots] = useState([]);
  const [isSelectedId, setIsSelectedId] = useState(null);

  const [instrument, setInstrument] = useState("XAUUSD");
  const [volume, setVolume] = useState(0.01);
  const [factor, setFactor] = useState(9);
  const [cBot, setCBot] = useState("Choose cBot");

  // Citește și parsează JSON din localStorage
  function getLocalJSON(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  // Sincronizare din localStorage
  const syncFromLocalStorage = useCallback(() => {
    const storedBots = getLocalJSON("cBots") || [];
    setRobots(storedBots);

    const storedSelected = getLocalJSON("cBotSelected");
    if (storedSelected) {
      setIsSelectedId(storedSelected.id || null);
      setInstrument(storedSelected.instrument || "XAUUSD");
      setVolume(storedSelected.volume ?? 0.01);
      setFactor(storedSelected.factor ?? 9);
      setCBot(storedSelected.cBotName || "Choose cBot");
    } else {
      setIsSelectedId(null);
      setInstrument("XAUUSD");
      setVolume(0.01);
      setFactor(9);
      setCBot("Choose cBot");
    }
  }, []);

  // La montare
  useEffect(() => {
    syncFromLocalStorage();
  }, [syncFromLocalStorage]);

  // Ascultă modificările locale din alt tab / component
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "cBots" || e.key === "cBotSelected") {
        syncFromLocalStorage();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [syncFromLocalStorage]);

  // Salvare modificări
  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedCBot = robots.find((r) => r.id === isSelectedId);
    if (!selectedCBot) return;

    const modifiedCBot = {
      ...selectedCBot,
      volume,
      instrument,
      factor,
    };

    localStorage.setItem("cBotSelected", JSON.stringify(modifiedCBot));

    const index = robots.findIndex((r) => r.id === modifiedCBot.id);
    if (index !== -1) {
      const updatedRobots = [...robots];
      updatedRobots.splice(index, 1, modifiedCBot);
      localStorage.setItem("cBots", JSON.stringify(updatedRobots));
      setRobots(updatedRobots);
      toast.success("Parameters saved successfully!");
    }
  };

  // Când selectezi alt cBot din dropdown
  const handleCBotChange = (e) => {
    const selectedName = e.target.value;
    const selectedRobot = robots.find((r) => r.cBotName === selectedName);
    if (!selectedRobot) return;

    setIsSelectedId(selectedRobot.id);
    setCBot(selectedRobot.cBotName);
    setInstrument(selectedRobot.instrument || "XAUUSD");
    setVolume(selectedRobot.volume ?? 0.01);
    setFactor(selectedRobot.factor ?? 9);

    localStorage.setItem("cBotSelected", JSON.stringify(selectedRobot));
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
            styles.cBotSelect,
            theme === "violet" && styles.selectViolet
          )}
          id="instrument"
          value={instrument}
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
          value={volume}
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
          value={factor}
          min="1"
          max="50"
          onChange={(e) => setFactor(parseInt(e.target.value))}
        />

        <label
          className={clsx(
            styles.parametersLabel,
            theme === "light" && styles.labelLight
          )}
          htmlFor="cBot">
          cBot
        </label>
        <select
          className={clsx(
            styles.parametersSelect,
            styles.cBotSelect,
            theme === "violet" && styles.selectViolet
          )}
          id="cBot"
          value={cBot}
          onChange={handleCBotChange}>
          {robots.map((r) => (
            <option key={r.id}>{r.cBotName}</option>
          ))}
        </select>

        <button type="submit" className={styles.startBtn}>
          Apply
        </button>
      </form>
    </div>
  );
}

ParametersForm.propTypes = {
  theme: PropTypes.string.isRequired,
};
