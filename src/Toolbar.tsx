import React, { useState } from "react";

import { MODES } from "./constants";

const ICON_MAP = [
  { id: MODES.EDITING, text: "Edit Feature", icon: "icon-select.svg" },
  { id: MODES.DRAW_POINT, text: "Draw Point", icon: "icon-point.svg" },
  { id: MODES.DRAW_PATH, text: "Draw Polyline", icon: "icon-path.svg" },
  { id: MODES.DRAW_POLYGON, text: "Draw Polygon", icon: "icon-polygon.svg" },
  {
    id: MODES.DRAW_RECTANGLE,
    text: "Draw Rectangle",
    icon: "icon-rectangle.svg",
  },
];

interface Props {
  handleSwitchMode: (event: any) => void;
  selected: any;
  hovered: any;
}

export const Toolbar: React.FC<Props> = ({
  handleSwitchMode,
  selected,
  hovered,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  const handleHover = (event: any) => {
    const id = event.target.id;
    setHoveredId(id);
  };
  return (
    <div
      style={{
        position: "absolute",
        width: "48px",
        left: "24px",
        top: "24px",
        background: "#fff",
        boxShadow: "0 0 4px rgba(0, 0, 0, 0.15)",
        outline: "none",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {ICON_MAP.map((m: any, i: any) => {
        return (
          <div
            key={i}
            style={{
              height: "34px",
              padding: "7px",
              display: "flex",
              justifyContent: "left",
              color: `${selected} ?  '#ffffff' : 'inherit'`,
              background: `${selected} ? '#0071bc' : ${hovered} ? '#e6e6e6' : 'inherit'`,
            }}
          >
            <img
              style={{
                width: "inherit",
                height: "inherit",
              }}
              id={m.id}
              onMouseOver={handleHover}
              onMouseOut={() => setHoveredId(null)}
              src={m.icon}
            />
            {hoveredId === m.id && (
              <div
                style={{
                  position: "absolute",
                  left: "52px",
                  padding: "4px",
                  background: "rgba(0, 0, 0, 0.8)",
                  color: "#fff",
                  minWidth: "100px",
                  maxWidth: "300px",
                  height: "24px",
                  fontSize: "12px",
                  zIndex: 9,
                  pointerEvents: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {m.text}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// export const Toolbar: React.FC<Props> = ({ handleSwitchMode, MODES }) => {
//   return (
//     <div style={{ position: "absolute", top: 0, right: 0, maxWidth: "320px" }}>
//       <select onChange={handleSwitchMode}>
//         <option value="">--Please choose a draw mode--</option>
//         {MODES.map((mode: any) => (
//           <option key={mode.id} value={mode.id}>
//             {mode.text}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };
