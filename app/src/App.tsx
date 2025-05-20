import { useState } from "react";

import Scene from "./components/Scene";
import Collection from "./collection";

type App = {
  isMinimised?: boolean;
  selectedRobot?: string;
};

const App = ({ isMinimised = false }: App) => {
  const [selectedRobot, setSelecteedRobtot] = useState("");

  return (
    <>
      {selectedRobot && (
        <Scene isMinimised={isMinimised} selectedRobot={selectedRobot} />
      )}
      <Collection />
    </>
  );
};
export default App;
