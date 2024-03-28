import { useState } from 'react';
import style from './Toolbar.module.css'
import ToolbarMenu from "./ToolbarMenu"

interface ToolbarProps {
  onDisplayChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCountSortChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onStatusSortChange: (phraseStatus: 'correct' | 'wrong' | 'withoutAnswer') => void;
  isInPercent: string;
  isRareFirst: string;
}

interface ToolbarState {
  displayCheckbox: boolean;
  frequencyCheckbox: boolean;
}

const Toolbar = ({ onDisplayChange, onCountSortChange, onStatusSortChange, isInPercent, isRareFirst }: ToolbarProps) => {
  const [ checkedCheckboxes, setCheckedCheckboxes ] = useState<ToolbarState>({
    displayCheckbox: isInPercent === "true",
    frequencyCheckbox: isRareFirst === "true"
  })

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    const checkbox = event.target.id
    if (checkbox === 'display') {
      const newCheckboxValue: boolean = !checkedCheckboxes.displayCheckbox
      setCheckedCheckboxes({ ...checkedCheckboxes, displayCheckbox: newCheckboxValue})
      
    } else {
      const newCheckboxValue: boolean = !checkedCheckboxes.frequencyCheckbox
      setCheckedCheckboxes({ ...checkedCheckboxes, frequencyCheckbox: newCheckboxValue})
    }
  }

  return (
    <div role="toolbar" aria-controls="table" className={style.toolbar}>
      <div>
        <label htmlFor="display">В процентах</label>
        <input 
          value={isInPercent} 
          onChange={handleCheckboxChange} 
          id="display" 
          type="checkbox" 
          tabIndex={-1} 
          checked={checkedCheckboxes.displayCheckbox} 
        />
      </div>
      <div>
        <label htmlFor="frequency">Сначала редкие</label>
        <input 
          value={isRareFirst} 
          onChange={onCountSortChange} 
          id="frequency" 
          type="checkbox" 
          tabIndex={-1}
          checked={checkedCheckboxes.frequencyCheckbox}
        />
      </div>
      <ToolbarMenu menuName="без ответа" menuId="result">
        <>
          <li>
            <button onClick={()=>{onStatusSortChange('withoutAnswer')}}>Сначала без ответа</button>
          </li>
          <li>
            <button onClick={()=>{onStatusSortChange('wrong')}}>Сначала Учу!</button>
          </li>
          <li>
            <button onClick={()=>{onStatusSortChange('correct')}}>Сначала Знаю!</button>
          </li>
        </>
      </ToolbarMenu>
    </div>
  )
}

export default Toolbar