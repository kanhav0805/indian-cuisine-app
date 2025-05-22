import { useState, useCallback } from "react";
import { AutoComplete } from "antd";
import type { AutoCompleteProps } from "antd";

type AutoCompleteInputProps = {
  placeholder?: string;
  fetchOptions?: (input: string) => Promise<AutoCompleteProps["options"]>;
  debounceDelay?: number;
  style?: React.CSSProperties;
  staticOptionsList?: { value: string }[];
  onSelect?: (data: string) => void;
  clearParams?: () => void;
};

const AutoCompleteInput = ({
  placeholder = "Start typing...",
  fetchOptions,
  debounceDelay = 300,
  style,
  staticOptionsList = [],
  onSelect = () => {},
  clearParams = () => {},
}: AutoCompleteInputProps) => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);

  // Debounce function
  const debounce = (func: (...args: string[]) => void, delay: number) => {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: string[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadOptions = useCallback(
    debounce(async (input: string) => {
      if (fetchOptions) {
        const fetched = await fetchOptions(input);
        setOptions(fetched);
      } else {
        // fallback dummy options
        const dummyOptions = staticOptionsList?.filter((opt) =>
          opt.value.toLowerCase().includes(input.toLowerCase())
        );
        setOptions(dummyOptions);
      }
    }, debounceDelay),
    [fetchOptions, debounceDelay]
  );

  const onChange = (data: string) => {
    if (!data) {
      //to remove search params when search box is cleared
      clearParams();
    }
    setValue(data);
    loadOptions(data);
  };

  return (
    <AutoComplete
      value={value}
      options={options}
      style={{ width: 200, ...style }}
      onSelect={onSelect}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default AutoCompleteInput;
