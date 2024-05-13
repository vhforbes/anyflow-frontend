import { useState } from "react";
import GlobeIcon from "../icons/GlobeIcon";
import DropdownArrow from "../icons/ArrowDropdown";

export const LanguageSelector = () => {
  const [currentLanguage, setCurrentLanguage] = useState("EN-US");
  const [isOpen, setIsOpen] = useState(false);
  const languageList = ["EN-US"];

  return (
    <div className="flex items-center justify-around w-28">
      <GlobeIcon />
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center cursor-pointer"
      >
        <p className="mr-5">{currentLanguage}</p>
        <DropdownArrow />
      </div>

      {isOpen ? (
        <div className="flex flex-col absolute right-18 mr-2 z-20 top-14">
          {languageList.map((language) => (
            <button onClick={() => setIsOpen(false)}>{language}</button>
          ))}
        </div>
      ) : null}
    </div>
  );
};
