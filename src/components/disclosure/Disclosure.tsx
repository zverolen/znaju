import { useState } from 'react'
import DisclosureControl from '../disclosureControl/DisclosureControl'

import style from './Disclosure.module.css'

interface DisclosureProps {
  children: React.ReactElement;
  captionWhenCollapsed: string;
  captionWhenExpanded: string;
  controlClass: string;
}

const Disclosure = ({ children, captionWhenCollapsed, captionWhenExpanded, controlClass }: DisclosureProps) => {
  const [ isExpanded, setIsExpanded ] = useState(false);

  function handleExpand() {
    setIsExpanded(!isExpanded);
  }

  return (
    <div className={style.disclosure} data-testid="disclosure" aria-live="polite">
        <DisclosureControl 
          captionWhenCollapsed={captionWhenCollapsed} 
          captionWhenExpanded={captionWhenExpanded} 
          isExpanded={isExpanded} 
          handleClick={handleExpand}
          controlClass={controlClass} />
        {isExpanded && children}
    </div>
  )
}

export default Disclosure