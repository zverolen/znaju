import { useRef, useState } from 'react'
// import { useDispatch, useSelector } from "react-redux"
import { useAppSelector, useAppDispatch } from '../../app/hooks'

import { 
  setPhraseSessionStatus,
  selectCurrentPhrase,
  setOrderForPhrasesInPractice,
  updatePhraseCount,
  updateCountForCorrect,
  updateCountForWrong
} from '../../features/phrases/phrasesSlice'

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
  
      phraseContent = <><span>Знаю: </span><span lang='sr-RS'>{currentPhrase.serbian} </span><span>{`(${currentPhrase.russian})`}</span></>
      buttons = <div>
                  <button onClick={() => handlePhraseChange('correct')}>Закончить</button>
                  <button onClick={() => handlePhraseChange('new')}>Повторить</button>
                </div>
  
    } else if (phraseProgress === 'wrong') {
  
      phraseContent = <><span>Учу: </span><span lang='sr-RS'>{currentPhrase.serbian} </span><span>{`(${currentPhrase.russian})`}</span></>
      buttons = <div>
                  <button onClick={() => handlePhraseChange('wrong')}>Закончить</button>
                  <button onClick={() => handlePhraseChange('new')}>Попробовать снова</button>
                </div>
  
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

    if (practiceStatus === 'correct' || practiceStatus === 'wrong') {
      dispatch(updatePhraseCount({id: currentPhrase.id, practiceStatus: practiceStatus}))
    }

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
      <h2>{phraseProgress === 'correct' || phraseProgress === 'wrong' ? 'Результат' : 'Как сказать по-сербски?'}</h2>
      <div>
        <div>
          <p tabIndex={0} ref={practiceRef}  data-testid="practice-phrase">
            {currentPhrase ? phraseContent : note}
          </p>
        </div>
        <div>
          {currentPhrase && buttons}
        </div>
      </div>
    </div>
  ) 
}