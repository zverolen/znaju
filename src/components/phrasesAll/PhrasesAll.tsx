import { useAppSelector } from "../../app/hooks";

import { selectAllPhrases } from "../../features/phrases/phrasesSlice"
import PhrasesAllRow from "./PhrasesAllRow"

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
  const allPhrases = useAppSelector(selectAllPhrases)
  // console.log(allPhrases)
  return(
    <>
    <h3>Статистика за всё время.</h3>
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