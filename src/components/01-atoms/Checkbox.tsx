export const Checkbox = ({
  clickHandler,
  checked = false,
}: {
  clickHandler: (checkedState: boolean) => void;
  checked: boolean;
}) => {
  return (
    <div className="flex">
      <input
        type="checkbox"
        className="
              appearance-none w-6 h-6 border-2 border-primary rounded-md cursor-pointer"
        onClick={() => clickHandler(!checked)}
      />
      {checked ? (
        <svg
          className="absolute mt-1 ml-1 w-4 h-4 pointer-events-none cursor-pointer"
          viewBox="0 0 10 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 1L3.5 6.5L1 4"
            stroke="#E83664"
            stroke-width="1.6666"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ) : null}
    </div>
  );
};
