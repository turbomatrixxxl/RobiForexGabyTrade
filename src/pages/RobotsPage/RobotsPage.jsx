import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import RobotCard from "../../components/commonComponents/RobotCard";
import styles from "./RobotsPage.module.css";

export default function RobotsPage() {
  const [isSelectedId, setIsSelectedId] = useState(null);
  const theme = localStorage.getItem("theme") || "dark";
  const user = JSON.parse(localStorage.getItem("user"));

  const [robots, setRobots] = useState(() => {
    const raw = localStorage.getItem("cBots");
    const parsed = raw ? JSON.parse(raw) : [];

    const makeId = () => {
      if (crypto && crypto.randomUUID) return crypto.randomUUID();
      return `rid_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    };

    const withIds = parsed.map((r) => ({
      ...r,
      id: r.id ?? makeId(),
    }));

    // salvăm ID-urile generate în localStorage
    localStorage.setItem("cBots", JSON.stringify(withIds));
    return withIds;
  });

  // Funcție comună pentru recitire date
  const syncFromLocalStorage = () => {
    const rawBots = localStorage.getItem("cBots");
    const parsedBots = rawBots ? JSON.parse(rawBots) : [];
    setRobots(parsedBots);

    const rawSelected = localStorage.getItem("cBotSelected");
    if (rawSelected) {
      try {
        const parsedSelected = JSON.parse(rawSelected);
        setIsSelectedId(parsedSelected.id || null);
      } catch (e) {
        console.error("Eroare parsare cBotSelected:", e);
      }
    }
  };

  useEffect(() => {
    syncFromLocalStorage();
  }, []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "cBots" || e.key === "cBotSelected") {
        syncFromLocalStorage();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    localStorage.setItem("cBots", JSON.stringify(robots));
  }, [robots]);

  function handleSelectRobot(id) {
    setIsSelectedId(id);
    const selectedRobot = robots.find((r) => r.id === id);
    if (selectedRobot) {
      localStorage.setItem("cBotSelected", JSON.stringify(selectedRobot));
    }
  }

  function handleDragEnd(result) {
    if (!result.destination) return;

    const reordered = Array.from(robots);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    setRobots(reordered);
    localStorage.setItem("cBots", JSON.stringify(reordered));
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="robotsDroppable">
        {(provided) => (
          <div
            className={clsx(
              styles.cont,
              theme === "light"
                ? styles.lightCont
                : theme === "violet"
                ? styles.violetCont
                : styles.darkCont
            )}
            {...provided.droppableProps}
            ref={provided.innerRef}>
            {robots.map((robot, i) => (
              <Draggable key={robot.id} draggableId={robot.id} index={i}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <RobotCard
                      user={user || null}
                      position={i + 1}
                      name={robot.cBotName}
                      handleClick={() => handleSelectRobot(robot.id)}
                      isSelected={isSelectedId === robot.id}
                      theme={theme}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
