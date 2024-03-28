import { useState } from "react";

interface InputCheckboxGroup {
  value: string;
  onValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputCheckboxGroup = ({ value, onValueChange }: InputCheckboxGroup) => {
  const [ isChecked, setIsChecked ] = useState<boolean>(value === "true")
  return (
    <div>
      <label htmlFor="display">В процентах</label>
      <input value={value} onChange={onValueChange} id="display" type="checkbox" tabIndex={-1} checked={isChecked}/>
    </div>
  )
}

export default InputCheckboxGroup