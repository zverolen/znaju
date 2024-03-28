import { useAppSelector } from "../../app/hooks";

import type { StatusSort, IsInPercent, PhraseLocal, IsRareFirst } from "../../types/types";

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
  const [ isRareFirst, setIsRareFirst ] = useState<IsRareFirst>("false")
  const [isInPersent, setIsInPercent ] = useState<IsInPercent>("false")
  const [phraseStatusSort, setStatusSort ] = useState<StatusSort>('withoutAnswer')
  const allPhrases = useAppSelector(selectAllPhrases)
  const correctSortOrder = allPhrases.slice().sort((ph1, ph2) => ph2.correct_count - ph1.correct_count)
  const wrongSortOrder = allPhrases.slice().sort(sortByWrong)
  const withoutAnswerSortOrder = allPhrases.slice().sort((a, b) => a.practiced_count - b.practiced_count)

  let phrasesContent!: JSX.Element[];

  if (phraseStatusSort === 'withoutAnswer') {
    phrasesContent = withoutAnswerSortOrder.map((phrase: PhraseLocal) => <PhrasesAllRow key={phrase.id} data={phrase} isInPercent={isInPersent}/>)
  } else if (phraseStatusSort === 'correct') {
    if (isRareFirst === "true") {
      // ideal default
      const reversedOrder = correctSortOrder.reverse()
      phrasesContent = reversedOrder.map((phrase: PhraseLocal) => <PhrasesAllRow key={phrase.id} data={phrase} isInPercent={isInPersent}/>)
    } else {
      // temp default
      phrasesContent = correctSortOrder.map((phrase: PhraseLocal) => <PhrasesAllRow key={phrase.id} data={phrase} isInPercent={isInPersent}/>)
    }
  } else {
    if (isRareFirst === "true") {
      // ideal default
      const reversedOrder = wrongSortOrder.reverse()
      phrasesContent = reversedOrder.map((phrase: PhraseLocal) => <PhrasesAllRow key={phrase.id} data={phrase} isInPercent={isInPersent}/>)
    } else {
      // temp default
      phrasesContent = wrongSortOrder.map((phrase: PhraseLocal) => <PhrasesAllRow key={phrase.id} data={phrase} isInPercent={isInPersent}/>)
    }
  }


  function handleDisplayChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.currentTarget.value
    if (value === "false") {
      setIsInPercent("true")
    } else {
      setIsInPercent("false")
    }
  }

  function handleCountSortChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.currentTarget.value
    if (value === "false") {
      setIsRareFirst("true")
    } else {
      setIsRareFirst("false")
    }
  }

  function handleStatusSortChange(sort: StatusSort) {
    setStatusSort(sort)
  }

  return(
    <>
      <h3>Статистика за всё время.</h3>
      <Toolbar 
        onDisplayChange={handleDisplayChange}
        onCountSortChange={handleCountSortChange}
        onStatusSortChange={handleStatusSortChange}
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