import { useAppSelector } from "../../app/hooks"

import { selectPracticedPhrases } from "../../features/phrases/phrasesSlice"

import SessionOverviewRow from "../sessionOverviewRow/SessionOverviewRow"
import style from "./SessionOverview.module.css"

interface PhraseLocal {
  id: string;
  created_at: string;
  practiced_count: number;
  correct_count: number;
  russian: string;
  serbian: string;
  phraseSessionStatus: 'new' | 'skipped' | 'correct' | 'wrong';
}

export default function SessionOverview() {
  const practicedPhrases = useAppSelector(selectPracticedPhrases)

  return(
    <div className={style.sessionOverview} id="sessionOverview">
      <h3 id="sessionPhrasesSubheading">Фразы в этой сессии:</h3>
      {practicedPhrases.length > 0 && 
        <table role="table" aria-labelledby="sessionPhrasesSubheading">
        <tbody role="rowgroup">
          {practicedPhrases.map((phrase: PhraseLocal) => <SessionOverviewRow key={phrase.id} data={phrase} phraseStatus={phrase.phraseSessionStatus} />)}
        </tbody>
        </table>
      }
      {!practicedPhrases.length && <p>Здесь появятся фразы, с которыми вы поработали</p>}
    </div>
  )
}