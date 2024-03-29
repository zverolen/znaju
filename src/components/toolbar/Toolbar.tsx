import { useState } from 'react';
import style from './Toolbar.module.css'
import ToolbarMenu from "./ToolbarMenu"

interface ToolbarProps {
  onStatusSortChange: (phraseStatus: 'correct' | 'wrong' | 'withoutAnswer') => void;
  onInputChange: (checkbox: 'display' | 'frequency') => void;
  isInPercent: boolean;
  isRareFirst: boolean;
}

const Toolbar = ({ onStatusSortChange, onInputChange, isInPercent, isRareFirst }: ToolbarProps) => {

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const checkbox = event.currentTarget.id
    if (checkbox === "display" || checkbox === "frequency") {
      onInputChange(checkbox)
    }
   
  }

  return (
    <div role="toolbar" aria-controls="table" className={style.toolbar}>
      <div>
        <label htmlFor="display">В процентах</label>
        <input 
          onChange={handleChange} 
          id="display" 
          type="checkbox" 
          tabIndex={-1} 
          checked={isInPercent} 
        />
      </div>
      <div>
        <label htmlFor="frequency">Сначала редкие</label>
        <input 
          onChange={handleChange} 
          id="frequency" 
          type="checkbox" 
          tabIndex={-1}
          checked={isRareFirst}
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