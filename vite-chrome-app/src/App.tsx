import { Rnd } from "react-rnd";
import MyApp from "./components/MyApp";

function App() {
  return (
    <Rnd
      className="w-fit overflow-clip"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "solid 1px #ddd",
        background: "#f0f0f0",
        pointerEvents: "auto",
      }}
      default={{
        x: 300,
        y: 300,
        width: 350,
        height: 300,
      }}
    >
      <MyApp />
    </Rnd>
  );
}

export default App;
