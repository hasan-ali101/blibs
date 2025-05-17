import { Rnd } from "react-rnd";
// import MyApp from "./MyApp";

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen">
      <Rnd
        className="w-fit  h-fit inline-block bg-blue-200"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "solid 1px #ddd",
          background: "#f0f0f0",
          pointerEvents: "auto",
        }}
        default={{
          x: window.innerWidth - 175,
          y: window.innerHeight - 175,
          width: "auto",
          height: "auto",
        }}
        enableResizing={false}
        bounds="parent"
      >
        {children}
      </Rnd>
    </div>
  );
}

export default Container;
