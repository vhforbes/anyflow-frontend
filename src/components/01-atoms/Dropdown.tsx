import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Dropdown = ({
  items,
  handleChange,
  disabled = false,
}: {
  items: {
    id: string;
    value: string;
  }[];
  handleChange: (id: string) => void;
  disabled?: boolean;
}) => {
  return (
    <Select onValueChange={(value) => handleChange(value)}>
      <SelectTrigger className="w-full border-[1px] border-blue-6 bg-blue-0">
        <SelectValue placeholder={items[0].value} />
      </SelectTrigger>
      <SelectContent className="bg-blue-0">
        {items.map((item) => (
          <SelectItem className="cursor-pointer" key={item.id} value={item.id}>
            {item.value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
