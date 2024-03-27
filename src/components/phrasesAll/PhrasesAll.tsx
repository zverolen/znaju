import { useAppSelector } from "../../app/hooks";

import type { CountSort, StatusSort } from "../../types/types";

import { selectAllPhrases } from "../../features/phrases/phrasesSlice"
import PhrasesAllRow from "./PhrasesAllRow"
import Toolbar from "../toolbar/Toolbar";
import { useState } from "react";

interface PhraseLocal {
  id: string;
  created_at: string;
  practiced_count: number;
  correct_count: number;
  russian: string;
  serbian: string;
  phraseSessionStatus: 'new' | 'skipped' | 'correct' | 'wrong';
}

export default function PhrasesAll() {
  const [isInPersent, setIsInPercent ] = useState("false")
  const [countSort, setCountSort ] = useState<CountSort>('rare')
  const [phraseStatusSort, setPhraseStatusSort ] = useState<StatusSort>('withoutAnswer')
  const allPhrases = useAppSelector(selectAllPhrases)
  // console.log(allPhrases)

  function handleDisplayChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.currentTarget.value
    if (value === "false") {
      setIsInPercent("true")
    } else {
      setIsInPercent("false")
    }
    console.log(isInPersent)
  }

  function handleCountSortChange(sort: CountSort) {
    // console.log(event)
  }

  function handleStatusSortChange(sort: StatusSort) {
    // console.log(phraseStatusSort)
  }

  return(
    <>
      <h3>Статистика за всё время.</h3>
      <Toolbar 
        onDisplayChange={handleDisplayChange}
        onCountSortChange={handleCountSortChange}
        onStatusSortChange={handleStatusSortChange}
        isInPercent={isInPersent}
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
          {allPhrases.map((phrase: PhraseLocal) => <PhrasesAllRow key={phrase.id} data={phrase} />)}
        </tbody>
      </table>
    </>
  )
}