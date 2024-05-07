import { Repository } from "@/interfaces/github";
import { useEffect, useRef, useState } from "react";

interface Props {
  data: Repository[];
  setterCallback: (id: number) => void;
}

const DynamicSearchBar: React.FC<Props> = ({
  data: repositories,
  setterCallback,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

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

  /* 
    Some todos
    [] implement keyabord functionality (arrow up, down and enter)
    */

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpened, setIsOpened] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = repositories.filter((repository: Repository) =>
    repository.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelection = (repository: Repository) => {
    setterCallback(repository.id);
    setSearchTerm(repository.name);
  };

  return (
    <div ref={elementRef}>
      <input
        className="input input-bordered w-full max-w-xs"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
        onClick={() => setIsOpened(true)}
      />
      {filteredData.length > 1 && isOpened ? (
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
