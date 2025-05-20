import React from "react";
import Scene from "./components/Scene";

type App = {
  isMinimised?: boolean;
  selectedRobot?: string;
};

const App = ({ isMinimised = false }: App) => {
  const selectedRobot = "samurai";

  return <Scene isMinimised={isMinimised} selectedRobot={selectedRobot} />;
};
export default App;
