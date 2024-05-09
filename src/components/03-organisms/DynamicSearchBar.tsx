import { Repository } from "@/interfaces/RepositoriesInterface";
import { useEffect, useRef, useState } from "react";

interface Props {
  data: {
    id: any;
    name: string;
  }[];
  placeholder: string;
  className?: string;
  disabled?: boolean;
  setOnClick?: (id: any) => void;
  setOnChange?: (name: string) => void;
}

const DynamicSearchBar: React.FC<Props> = ({
  data,
  placeholder,
  className,
  setOnClick,
  setOnChange,
  disabled = false,
}) => {
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

  /* 
    Some todos
    [] implement keyabord functionality (arrow up, down and enter)
    */

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((data) =>
    data.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelection = (data: any) => {
    // !!!! CLOSE WHEN CLICKING !!!!
    setOnClick?.(data.id);
    setSearchTerm(data.name);
  };

  return (
    <div ref={elementRef}>
      <input
        className={`input input-bordered w-full max-w-xs ${className}`}
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        onClick={() => setIsOpened(true)}
        disabled={disabled}
      />
      {filteredData.length > 0 && isOpened ? (
        <ul className="p-2 absolute shadow menu dropdown-content z-[1] bg-base-100 rounded-md mt-2 max-w-xs text-base">
          {filteredData.slice(0, 5).map((repository: Repository) => (
            <li
              key={repository.id}
              onClick={() => handleSelection(repository)}
              className="hover:bg-base-200 p-2 cursor-pointer"
            >
              {repository.name}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default DynamicSearchBar;
