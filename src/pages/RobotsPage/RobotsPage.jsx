// import React, { useState } from "react";

// import clsx from "clsx";

// import RobotCard from "../../components/commonComponents/RobotCard";

// import styles from "./RobotsPage.module.css";

// export default function RobotsPage() {
//   const [isSelectedIndex, setIsSelectedIndex] = useState(null);

//   const theme = localStorage.getItem("theme") || "dark";

//   const robots = localStorage.getItem("cBots")
//     ? JSON.parse(localStorage.getItem("cBots"))
//     : [];
//   // console.log("robots", robots);

//   function handleSelectRobot(index) {
//     setIsSelectedIndex(index);
//     console.log(`Robot ${robots[index].cBotName} selected !`);
//   }

//   return (
//     <div
//       className={clsx(
//         styles.cont,
//         theme === "light"
//           ? styles.lightCont
//           : theme === "violet"
//           ? styles.violetCont
//           : styles.darkCont
//       )}>
//       {robots.map((robot, i) => (
//         <div key={`robot${i}`}>
//           <RobotCard
//             position={i + 1}
//             name={robot.cBotName}
//             handleClick={() => handleSelectRobot(i)}
//             isSelected={isSelectedIndex === i}
//           />
//         </div>
//       ))}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import RobotCard from "../../components/commonComponents/RobotCard";
import styles from "./RobotsPage.module.css";

function ensureIds(list) {
  const makeId =
    crypto && crypto.randomUUID
      ? () => crypto.randomUUID()
      : () => `rid_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  return list.map((r) => ({
    ...r,
    id: r.id ?? makeId(),
  }));
}

export default function RobotsPage() {
  const [isSelectedIndex, setIsSelectedIndex] = useState(null);
  const theme = localStorage.getItem("theme") || "dark";

  const [robots, setRobots] = useState(() => {
    const raw = localStorage.getItem("cBots");
    const parsed = raw ? JSON.parse(raw) : [];
    return ensureIds(parsed);
  });

  useEffect(() => {
    localStorage.setItem("cBots", JSON.stringify(robots));
  }, [robots]);

  function handleSelectRobot(index) {
    setIsSelectedIndex(index);
    console.log(`Robot ${robots[index].cBotName} selected !`);
  }

  function handleDragEnd(result) {
    if (!result.destination) return;

    const reordered = Array.from(robots);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    setRobots(reordered);
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
                      position={i + 1}
                      name={robot.cBotName}
                      handleClick={() => handleSelectRobot(i)}
                      isSelected={isSelectedIndex === i}
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
