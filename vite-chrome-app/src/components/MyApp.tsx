import { useEffect, useState } from "react";
import { Switch } from "../components/ui/switch";
import Timer from "../components/Timer";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { HiOutlineSpeakerXMark } from "react-icons/hi2";

export default function MyApp() {
  const [darkMode, setDarkMode] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [startTime, setStartTime] = useState(25);
  const [minutes, setMinutes] = useState(startTime);
  const [seconds, setSeconds] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [onHold, setOnHold] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const bell = new Audio("/bell.mp3");
    bell.volume = !muted ? 1 : 0;

    if (!minutes && seconds === 2) {
      bell.play();
    }

    if (!seconds && !minutes) {
      setIsBreak((prevState) => !prevState);
    }
  }, [seconds, minutes, muted]);

  useEffect(() => {
    if (!seconds && !minutes) {
      window.alert(
        `Hey, ${
          !isBreak
            ? "your break is up, back to work!"
            : "it's time for a break!"
        }`
      );
    }
    if (isBreak) {
      setStartTime(5);
    } else {
      setStartTime(25);
    }
  }, [isBreak]);

  useEffect(() => {
    let intervalId1: NodeJS.Timeout | null = null;
    let intervalId2: NodeJS.Timeout | null = null;

    if (isBreak && timerActive) {
      setOnHold(true);
      intervalId1 = setInterval(() => {
        setOnHold(true);
        if (intervalId2) {
          clearInterval(intervalId2);
        }
        intervalId2 = setInterval(() => {
          setExpanded((state) => !state);
          setOnHold((s) => !s);
        }, 4000);
      }, 8000);

      intervalId2 = setInterval(() => {
        setExpanded((state) => !state);
        setOnHold((s) => !s);
      }, 4000);
    } else {
      setExpanded(false);

      if (intervalId2) {
        clearInterval(intervalId2);
      }
      if (intervalId1) {
        clearInterval(intervalId1);
      }
    }

    return () => {
      setExpanded(false);
      if (intervalId2) {
        clearInterval(intervalId2);
      }
      if (intervalId1) {
        clearInterval(intervalId1);
      }
    };
  }, [isBreak, timerActive]);

  useEffect(() => {
    const soundA = new Audio("/A2.mp3");
    const soundB = new Audio("/B2.mp3");

    soundA.volume = !muted ? 0.75 : 0;
    soundB.volume = !muted ? 0.75 : 0;

    if (isBreak && timerActive) {
      if (expanded) {
        soundA.play();
      } else if (!expanded) {
        soundB.play();
      }
    } else {
      soundB.pause();
      soundA.pause();
      soundA.volume = 0;
      soundB.volume = 0;
    }

    return () => {
      if (soundA) {
        soundA.pause;
        soundA.volume = 0;
      }
      if (soundB) {
        soundB.pause();
        soundB.volume = 0;
      }
      soundB.pause();
    };
  }, [expanded, muted, timerActive, isBreak]);

  return (
    <main
      className={`${
        darkMode && "dark"
      } flex flex-col items-start bg:slate-500 `}
    >
      <div
        id="header"
        className={`transition-colors ease-out dark:text-white text-slate-800 px-12 lg:px-20 py-6 flex dark:bg-slate-900 bg-slate-50 justify-between items-center h-full `}
      >
        <h1 className="text-4xl lg:text-5xl dark:text-sky-200 ">PomoDojo</h1>
        <div className="flex flex-col items-center">
          <Switch
            className="border-2 py-3 mb-2 border-white"
            onCheckedChange={() => setDarkMode((state) => !state)}
          />
          <p className="">{darkMode ? "Dark" : "Light"}</p>
        </div>
      </div>
      <div className="w-full h-full transition-colors ease-out flex flex-col bg-slate-100 dark:bg-slate-800">
        <div className="flex flex-col">
          <div>
            <Timer
              minutes={minutes}
              setMinutes={setMinutes}
              active={timerActive}
              setActive={setTimerActive}
              seconds={seconds}
              setSeconds={setSeconds}
            />
          </div>
          {isBreak && (
            <div className="flex flex-col  items-center justify-center">
              {/* <Image
                className="absolute z-0 dark:opacity-35"
                src="/lotus2.png"
                width={400}
                height={400}
                alt="lotus"
              /> */}
              <div
                className={`rounded-full w-64 h-64 z-10 transition-all flex items-center justify-center border-8  ${
                  expanded ? "border-sky-200" : "border-indigo-200"
                }`}
              >
                <div
                  // onClick={() => {
                  //   timerActive && !animationActive && setAnimationActive(true);
                  // }}
                  className={`flex justify-center ease-out text-white dark:text-slate-800 text-xs font-bold items-center opacity-80 cursor-pointer transform  rounded-full transition-all duration-4000
                   ${
                     expanded
                       ? "bg-sky-200 w-56 h-56"
                       : "bg-indigo-200 w-14 h-14"
                   }
                  `}
                >
                  {/* {timerActive && !animationActive && "CLICK"} */}
                </div>
              </div>
            </div>
          )}
          {isBreak && timerActive && (
            <div className="flex mt-6 justify-center items-center  w-full text-xl dark:text-white">
              <span
                className={`flex justify-center transition-all items-center border-4  p-6 w-20 h-20 rounded-full text-center ${
                  !expanded ? "border-sky-200" : "border-indigo-200"
                } `}
              >
                {onHold ? "Hold" : expanded ? "In" : "Out"}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row py-6 justify-center items-center dark:bg-slate-800 bg-slate-100 ">
          <button
            onClick={() => {
              if (minutes || seconds) {
                setTimerActive((active) => !active);
              } else {
                setMinutes(startTime);
                setTimerActive(true);
              }
            }}
            className="border-2 border-black dark:border-white px-4 py-1 text-white sm:mb-0 mb-3 sm:mr-2 bg-black hover:opacity-70  rounded-md dark:bg-white dark:hover:opacity-80  dark:text-slate-800"
          >
            {timerActive ? "Pause " : "Start "}
            {isBreak ? "Break" : "Focus"}
          </button>

          {/* {seconds || minutes ? (
            <button
              onClick={() => {
                setMinutes(startTime);
                setTimerActive(false);
                setSeconds(0);
              }}
              className="px-4 py-1 text-black border-2 border-black hover:bg-slate-200 text-sm rounded-md dark:text-white dark:border-white dark:hover:bg-slate-800"
            >
              Reset
            </button>
          ) : ( */}
          <button
            onClick={() => {
              setIsBreak((state) => !state);
              setTimerActive(false);
              setSeconds(0);
              if (isBreak) {
                setMinutes(25);
              } else {
                setMinutes(5);
                setExpanded(false);
              }
            }}
            className="px-4 py-1 text-black border-2 border-black hover:bg-slate-200 rounded-md dark:text-white dark:border-white dark:hover:bg-slate-600"
          >
            {isBreak ? "Skip this Break?" : "Skip to a break?"}
          </button>
        </div>
        {
          <div className="flex justify-center">
            <button
              onClick={() => {
                setMuted((s) => {
                  return !s;
                });
              }}
              className=" border-2 w-10 border-sky-200 p-2 rounded-full bg-slate-50"
            >
              {muted ? (
                <HiOutlineSpeakerXMark size={20} />
              ) : (
                <HiOutlineSpeakerWave size={20} />
              )}
            </button>
          </div>
        }
      </div>
    </main>
  );
}
