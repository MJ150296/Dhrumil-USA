import { Outlet } from "react-router-dom";
import "./App.css";
import { createContext, useEffect, useState } from "react";
import Intro from "./components/Intro";
import "animate.css";
export const WeatherContext = createContext(null);
export const SearchTermContext = createContext(null);
export const SuggestionContext = createContext(null);
export const BackButtonContext = createContext(null);

function App() {
  const [position, setPosition] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showsuggestion, setShowSuggestion] = useState(false);
  const [isBackButtonClicked, setIsBackButtonClicked] = useState(false);
  const [isIntro, setIsIntro] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsIntro(false);
    }, 8000);
  }, []);
  return (
    <>
      <BackButtonContext.Provider
        value={[isBackButtonClicked, setIsBackButtonClicked]}
      >
        <WeatherContext.Provider value={[position, setPosition]}>
          <SearchTermContext.Provider value={[searchTerm, setSearchTerm]}>
            <SuggestionContext.Provider
              value={[showsuggestion, setShowSuggestion]}
            >
              <div className="w-full h-screen">
                {isIntro ? <Intro /> : <Outlet />}
              </div>
            </SuggestionContext.Provider>
          </SearchTermContext.Provider>
        </WeatherContext.Provider>
      </BackButtonContext.Provider>
    </>
  );
}

export default App;
