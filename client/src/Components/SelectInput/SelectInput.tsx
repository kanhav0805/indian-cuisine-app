import { Select } from "antd";

export type SelectOption = {
  label: string;
  value: string;
};

interface SelectInputProps {
  options: SelectOption[];
  placeholder?: string;
  handleChange: (values: string[]) => void;
  value: string[];
}

const SelectInput = ({
  options,
  placeholder,
  handleChange,
  value,
}: SelectInputProps) => {
  return (
    <Select
      mode="tags"
      style={{ width: "50%" }}
      placeholder={placeholder ?? "Please Select Appropriate Input"}
      onChange={handleChange}
      options={options}
      value={value}
    />
  );
};

export default SelectInput;
