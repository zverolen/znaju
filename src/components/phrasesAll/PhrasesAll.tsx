import { useAppSelector } from "../../app/hooks";

import type { StatusSort, PhraseLocal } from "../../types/types";

import { selectAllPhrases } from "../../features/phrases/phrasesSlice"
import PhrasesAllRow from "./PhrasesAllRow"
import Toolbar from "../toolbar/Toolbar";
import { useState } from "react";

function sortByWrong(phrase1: PhraseLocal, phrase2: PhraseLocal): number {
  const wrong1 = phrase1.practiced_count - phrase1.correct_count
  const wrong2 = phrase2.practiced_count - phrase2.correct_count
  return wrong2 - wrong1
}

export default function PhrasesAll() {
  const [ isRareFirst, setIsRareFirst ] = useState<boolean>(false)
  const [isInPersent, setIsInPercent ] = useState<boolean>(false)
  const [phraseStatusSort, setStatusSort ] = useState<StatusSort>('withoutAnswer')
  const allPhrases = useAppSelector(selectAllPhrases)
  const correctSortOrder = allPhrases.slice().sort((ph1, ph2) => ph2.correct_count - ph1.correct_count)
  const wrongSortOrder = allPhrases.slice().sort(sortByWrong)
  const withoutAnswerSortOrder = allPhrases.slice().sort((a, b) => a.practiced_count - b.practiced_count)

  let phrasesContent!: JSX.Element[];

  function handleStatusSortChange(sort: StatusSort) {
    setStatusSort(sort)
  }

  if (phraseStatusSort === 'withoutAnswer') {
    phrasesContent = withoutAnswerSortOrder.map((phrase: PhraseLocal) => <PhrasesAllRow key={phrase.id} data={phrase} isInPercent={isInPersent}/>)
  } else if (phraseStatusSort === 'correct') {
    if (isRareFirst) {
      // ideal default
      const reversedOrder = correctSortOrder.reverse()
      phrasesContent = reversedOrder.map((phrase: PhraseLocal) => <PhrasesAllRow key={phrase.id} data={phrase} isInPercent={isInPersent}/>)
    } else {
      // temp default
      phrasesContent = correctSortOrder.map((phrase: PhraseLocal) => <PhrasesAllRow key={phrase.id} data={phrase} isInPercent={isInPersent}/>)
    }
  } else {
    if (isRareFirst) {
      // ideal default
      const reversedOrder = wrongSortOrder.reverse()
      phrasesContent = reversedOrder.map((phrase: PhraseLocal) => <PhrasesAllRow key={phrase.id} data={phrase} isInPercent={isInPersent}/>)
    } else {
      // temp default
      phrasesContent = wrongSortOrder.map((phrase: PhraseLocal) => <PhrasesAllRow key={phrase.id} data={phrase} isInPercent={isInPersent}/>)
    }
  }

  function handleInputChange(checkbox: 'display' | 'frequency') {
    if (checkbox === 'display') {
      setIsInPercent(!isInPersent)
    } else {
      setIsRareFirst(!isRareFirst)
    }
  }
  
  return(
    <>
      <h3>Статистика за всё время.</h3>
      <Toolbar 
        onStatusSortChange={handleStatusSortChange}
        onInputChange={handleInputChange}
        isInPercent={isInPersent}
        isRareFirst={isRareFirst}
      />
      <table role="table">
        <tbody role="rowgroup">
          <tr>
            <th scope="col">Фраза на русском</th>
            <th scope="col">Фраза на сербском</th>
            <th scope="col">Знаю!</th>
            <th scope="col">Учу!</th>
            <th scope="col">Всего</th>
          </tr>
          {phrasesContent}
        </tbody>
      </table>
    </>
  )
}