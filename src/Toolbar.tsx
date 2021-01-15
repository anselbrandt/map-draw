import React from "react";

interface Props {
  handleSwitchMode: (event: any) => void;
  MODES: any;
}

export const Toolbar: React.FC<Props> = ({ handleSwitchMode, MODES }) => {
  return (
    <div style={{ position: "absolute", top: 0, right: 0, maxWidth: "320px" }}>
      <select onChange={handleSwitchMode}>
        <option value="">--Please choose a draw mode--</option>
        {MODES.map((mode: any) => (
          <option key={mode.id} value={mode.id}>
            {mode.text}
          </option>
        ))}
      </select>
    </div>
  );
};
