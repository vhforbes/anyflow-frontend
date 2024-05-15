import { Repository } from "@/interfaces/RepositoriesInterface";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { SelectContent, SelectItem } from "../ui/select";

interface Props {
  items?: {
    id: any;
    value: string;
  }[];
  placeholder: string;
  className?: string;
  disabled?: boolean;
  setOnClick?: (id: any) => void;
  setOnChange?: (name: string) => void;
}

const DynamicSearchBar: React.FC<Props> = ({
  items = [],
  placeholder,
  className,
  setOnClick,
  setOnChange,
  disabled = false,
}) => {
  /* 
    Some todos
    [] implement keyabord functionality (arrow up, down and enter)
  */

  const elementRef = useRef<HTMLDivElement>(null);
  const TIME_ELAPSED = 1000;
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpened, setIsOpened] = useState(false);

  // Maybe create a reusable hook of the click outside for other use cases?
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        elementRef.current &&
        !elementRef.current.contains(event.target as Node)
      ) {
        setIsOpened(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setOnChange?.(searchTerm);
    }, TIME_ELAPSED);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, setOnChange]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = items.filter((item) =>
    item.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelection = (item: any) => {
    // !!!! NNED TO CLOSE WHEN CLICKING !!!!
    setOnClick?.(item.id);
    setSearchTerm(item.value);
  };

  return (
    <div className="w-full relative" ref={elementRef}>
      <Input
        className={`input input-bordered w-full bg-blue-0 ${className}`}
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        onClick={() => setIsOpened(true)}
        disabled={disabled}
      />

      {filteredData.length > 0 && isOpened ? (
        <ul className="p-2 absolute shadow z-[1] bg-blue-0 border-2 border-blue-8 rounded-md mt-2 text-base w-full max-h-96 overflow-auto">
          {filteredData.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelection(item)}
              className="hover:bg-primary p-2 cursor-pointer"
            >
              {item.value}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default DynamicSearchBar;
