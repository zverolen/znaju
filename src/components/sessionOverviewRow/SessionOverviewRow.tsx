import style from './SessionOverviewRow.module.css'

interface PhraseLocal {
  id: string;
  created_at: string;
  practiced_count: number;
  correct_count: number;
  russian: string;
  serbian: string;
  phraseSessionStatus: 'new' | 'skipped' | 'correct' | 'wrong';
}

type PhraseStatus = 'new' | 'skipped' | 'correct' | 'wrong'

interface SessionOverviewRowProps {
  data: PhraseLocal;
  phraseStatus: PhraseStatus;
}

const  SessionOverviewRow = ({ data, phraseStatus }: SessionOverviewRowProps) => {

  let phraseSessionStatus
  let phraseIcon

  if (phraseStatus === 'correct') {
    phraseSessionStatus = 'Знаю!'
    phraseIcon = '🧐'
  } else if (phraseStatus === 'wrong')  {
    phraseSessionStatus = 'Учу!'
    phraseIcon = '🤔'
  } else if (phraseStatus === 'skipped')  {
    phraseSessionStatus = 'Пропущено'
    phraseIcon = null
  }

  // console.log(data)
  return(
    <tr className={style.sessionOverviewRow} key={data.serbian} role="row">
      <td role="cell">{data.russian}</td>
      <td role="cell" translate='no' lang="sr-RS" >{data.serbian}</td>
      <td role="cell">
      {phraseIcon && <span>{phraseIcon}</span>}
        <span>{phraseSessionStatus}</span>
      </td>
    </tr>
  )
}

export default SessionOverviewRow;