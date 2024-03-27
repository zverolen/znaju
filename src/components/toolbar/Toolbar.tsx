import style from './Toolbar.module.css'
import ToolbarMenu from "./ToolbarMenu"

interface ToolbarProps {
  onDisplayChange: () => void;
  onCountSortChange: (order: 'rare' | 'frequent') => void;
  onStatusSortChange: (phraseStatus: 'correct' | 'wrong' | 'withoutAnswer') => void;
  isInPercent: string;
}

const Toolbar = ({ onDisplayChange, onCountSortChange, onStatusSortChange, isInPercent }: ToolbarProps) => {
  return (
    <div role="toolbar" aria-controls="table" className={style.toolbar}>
      <div>
        <label htmlFor="display">В процентах</label>
        <input value={isInPercent} onChange={onDisplayChange} id="display" type="checkbox" tabIndex={-1}/>
      </div>
      <ToolbarMenu menuName="редкие" menuId="practiceCount">
        <>
          <li>
            <button onClick={onCountSortChange('rare')}>Сначала редкие</button>
          </li>
          <li>
            <button>Сначала частые</button>
          </li>
        </>
      </ToolbarMenu>
      <ToolbarMenu menuName="без ответа" menuId="result">
        <>
          <li>
            <button>Сначала без ответа</button>
          </li>
          <li>
            <button>Сначала Знаю!</button>
          </li>
          <li>
            <button>Сначала Учу!</button>
          </li>
        </>
      </ToolbarMenu>
    </div>
  )
}

export default Toolbar