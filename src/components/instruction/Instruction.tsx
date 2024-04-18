import Disclosure from "../disclosure/Disclosure"
import { copy } from "../../data/copy"

import style from './Instruction.module.css'

const instructionCopy = copy.instruction

const Instruction = () => {
  return (
    <div className={style.instruction}>
      <Disclosure
                captionWhenCollapsed={instructionCopy.heading}
                captionWhenExpanded={instructionCopy.heading}
                controlClass=""
                >
        <ol role="list">
          <li>{instructionCopy[1]}</li>
          <li>{instructionCopy[2]}</li>
          <li>{instructionCopy[3]}</li>
          <li>{instructionCopy[4]}</li>
          <li>{instructionCopy[5]}</li>
          <li>{instructionCopy[6]}</li>
        </ol>            
      </Disclosure>
    </div>
  )
}

export default Instruction