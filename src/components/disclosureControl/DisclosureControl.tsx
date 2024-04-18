
/// Check list
// aria-expanded
// aria-controls, optional
import style from './DisclosureControl.module.css'

interface DisclosureControlProps {
  captionWhenCollapsed: string;
  captionWhenExpanded: string;
  isExpanded: boolean;
  controlClass: string;
  handleClick: () => void;
}

const DisclosureControl = ({ 
    captionWhenCollapsed, 
    captionWhenExpanded,
    isExpanded,
    controlClass,
    handleClick
  }: DisclosureControlProps) => {
  // aria-label={isExpanded ? buttonLabelWhenExpanded : buttonLabelWhenCollapsed}
  return (
    <>
    {/* TODO Same name for the hidden heading or not or which and what if it's the same as button */}
      <h2 className='visually-hidden'>{`Раздел ${captionWhenExpanded}`}</h2> 
      <button aria-label="Содержимое раздела" onClick={handleClick} aria-expanded={isExpanded} className={`${controlClass} ${style.disclosure__control}`}>
        <span>{`${isExpanded ? captionWhenExpanded : captionWhenCollapsed}`}</span>
        <span aria-hidden="true">{isExpanded ? ' -' : ' +'}</span>
      </button>
      {/* In VoiceOver the following is not announced as a button */}
       {/* <h2>
        <button onClick={handleClick} aria-expanded={isExpanded} className={`${controlClass} ${style.disclosure__control}`}>
        <span>{isExpanded ? captionWhenExpanded : captionWhenCollapsed}</span>
        <span aria-hidden="true">{isExpanded ? ' -' : ' +'}</span>
      </button>  
      </h2>  */}
      
    </>
  )
}

export default DisclosureControl