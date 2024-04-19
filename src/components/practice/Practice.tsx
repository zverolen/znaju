import { useRef, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'

import { 
  setPhraseSessionStatus,
  selectCurrentPhrase,
  setOrderForPhrasesInPractice,
  updateCountForCorrect,
  updateCountForWrong
} from '../../features/phrases/phrasesSlice'

import Instruction from '../instruction/Instruction'

import style from "./Practice.module.css"

type CheckStatus = 'revealed' | 'correct' | 'wrong'
type PracticeStatus = 'new' | 'skipped' | 'correct' | 'wrong'

interface PhraseLocal {
  id: string;
  created_at: string;
  practiced_count: number;
  correct_count: number;
  russian: string;
  serbian: string;
  phraseSessionStatus: 'new' | 'skipped' | 'correct' | 'wrong';
}

export default function Practice() {
  const [phraseProgress, setPhraseProgress] = useState('new')

  const dispatch = useAppDispatch()

  const currentPhrase: PhraseLocal = useAppSelector(selectCurrentPhrase)

  const practiceRef = useRef<HTMLParagraphElement>(null)

  let phraseContent
  let buttons
  let statusClassname
  const note = <span>Фразы закончились! Начните сессию снова или поработайте с отдельными фразами.</span>

  if (currentPhrase) {
    if (phraseProgress === 'new') {
      // console.log(currentPhrase)
      phraseContent = <span>{currentPhrase.russian}</span>
      buttons = <div>
                  <button onClick={() => handlePhraseCheck('revealed')}>Проверить</button>
                  <button onClick={() => handlePhraseChange('skipped')}>Пропустить</button>
                </div>
  
    } else if (phraseProgress === 'revealed') {
  
      phraseContent = <span lang='sr-RS'>{currentPhrase.serbian}</span>
      buttons = <div>
                  <button onClick={() => handlePhraseCheck('correct')}>Знаю!</button>
                  <button onClick={() => handlePhraseCheck('wrong')}>Учу!</button>
                </div>
  
    } else if (phraseProgress === 'correct') {
  
      phraseContent = <><span className={style.practice__phrase_subheading}>Знаю: </span><span lang='sr-RS'>{currentPhrase.serbian} </span><span>{`(${currentPhrase.russian})`}</span></>
      buttons = <div>
                  <button onClick={() => handlePhraseChange('correct')}>Закончить</button>
                  <button onClick={() => handlePhraseChange('new')}>Ещё раз</button>
                </div>
      statusClassname = style.correct
  
    } else if (phraseProgress === 'wrong') {
  
      phraseContent = <><span className={style.practice__phrase_subheading}>Учу: </span><span lang='sr-RS'>{currentPhrase.serbian} </span><span>{`(${currentPhrase.russian})`}</span></>
      buttons = <div>
                  <button onClick={() => handlePhraseChange('wrong')}>Закончить</button>
                  <button onClick={() => handlePhraseChange('new')}>Ещё раз</button>
                </div>
      statusClassname = style.wrong
  
    }
  } 

  function handlePhraseCheck(checkStatus: CheckStatus) {
    setPhraseProgress(checkStatus)
    if (practiceRef.current !== null) {
      practiceRef.current.focus()
    }
  }

  function handlePhraseChange(practiceStatus: PracticeStatus) {

    dispatch(setOrderForPhrasesInPractice({id: currentPhrase.id, phraseSessionStatus: practiceStatus}))
    dispatch(setPhraseSessionStatus({id: currentPhrase.id, phraseSessionStatus: practiceStatus}))

    if (practiceStatus === 'correct') {
      dispatch(updateCountForCorrect(currentPhrase.id))
    } else if (practiceStatus ==='wrong') {
      dispatch(updateCountForWrong(currentPhrase.id))
    }
    
    setPhraseProgress('new')

    if (practiceRef.current !== null) {
      practiceRef.current.focus()
    }    
  }

  return(
    <div id="practice" className={style.practice} >
      <Instruction />
      <div>
        <h2>{phraseProgress === 'correct' || phraseProgress === 'wrong' ? 'Результат' : 'Как сказать по-сербски?'}</h2>
        <div className={`${style.practice__phrase} ${statusClassname}`}>
          <div>
            <p tabIndex={0} ref={practiceRef} data-testid="practice-phrase">
              {currentPhrase ? phraseContent : note}
            </p>
          </div>
          <div>
            {currentPhrase && buttons}
          </div>
        </div>
      </div>
    </div>
  ) 
}