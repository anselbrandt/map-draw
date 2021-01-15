import { useState } from "react";
import MapGL from "react-map-gl";
import {
  Editor,
  EditingMode,
  DrawLineStringMode,
  DrawPolygonMode,
} from "react-map-gl-draw";
import mapboxgl from "mapbox-gl";
import { Toolbar } from "./Toolbar";

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const MAP_STYLE = "mapbox://styles/mapbox/light-v10";
const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;

const MODES = [
  { id: "drawPolyline", text: "Draw Polyline", handler: DrawLineStringMode },
  { id: "drawPolygon", text: "Draw Polygon", handler: DrawPolygonMode },
  { id: "editing", text: "Edit Feature", handler: EditingMode },
];

const INITIAL_VIEWSTATE = {
  width: 800,
  height: 600,
  longitude: -122.45,
  latitude: 37.78,
  zoom: 12,
};

function App() {
  const [viewState, setViewState] = useState(INITIAL_VIEWSTATE);
  const handleUpdateViewState = (viewState: any) => setViewState(viewState);

  const [selected, setSelected] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const [modeId, setModeId] = useState<any>(null);
  const [modeHandler, setModeHandler] = useState<any>(null);

  const handleSwitchMode = (event: any) => {
    const id = event.target.value === modeId ? null : event.target.value;
    const mode = MODES.find((m) => m.id === modeId);
    const handler = mode ? new mode.handler() : null;
    setModeId(id);
    setModeHandler(handler);
  };

  return (
    <MapGL
      viewState={viewState}
      width="100vw"
      height="100vh"
      mapStyle={MAP_STYLE}
      onViewportChange={(viewState) => handleUpdateViewState(viewState)}
      mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
    >
      <Editor
        // to make the lines/vertices easier to interact with
        clickRadius={12}
        mode={modeHandler}
        onSelect={() => {}}
      />
      <Toolbar
        handleSwitchMode={handleSwitchMode}
        selected={selected}
        hovered={isHovered}
      />
    </MapGL>
  );
}

export default App;
