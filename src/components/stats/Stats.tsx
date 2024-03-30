import { useAppSelector } from "../../app/hooks"

import StatsItem from "../statsItem/StatsItem"

import style from "./Stats.module.css"

import { NavLink } from "react-router-dom"

import { 
  selectTotalNumberOfPhrases,
  selectNumberOfNewPhrases,
  selectNumberOfCorrectPhrases,
  selectNumberOfWrongPhrases,
} from '../../features/phrases/phrasesSlice'

export default function Stats() {
  // in research
  const allPhrasesNum: number = useAppSelector(selectTotalNumberOfPhrases)

  const newPhrasesNum: number = useAppSelector(selectNumberOfNewPhrases)
  const newPhrasesPercent: number = newPhrasesNum * 100 / allPhrasesNum
  
  const correctPhrasesNum: number = useAppSelector(selectNumberOfCorrectPhrases)
  const correctPhrasesPercent: number = correctPhrasesNum * 100 / allPhrasesNum

  const wrongPhrasesNum: number = useAppSelector(selectNumberOfWrongPhrases)
  const wrongPhrasesPercent: number = wrongPhrasesNum * 100 / allPhrasesNum

  return(
    <div id="stats" className={style.stats}>
      <h2>Эта сессия:</h2>
      <nav>
        <StatsItem route="/remaining" id="remaining" name="Осталось" statNum={newPhrasesNum} statPercent={newPhrasesPercent} />
        <StatsItem route="/know" id="correct" name="Знаю!" statNum={correctPhrasesNum} statPercent={correctPhrasesPercent} />
        <StatsItem route="/learn" id="wrong" name="Учу!" statNum={wrongPhrasesNum} statPercent={wrongPhrasesPercent} />
        <NavLink data-testid="all" to="/all">Вся статистика</NavLink>
        <NavLink data-testid="account" to="/account">Аккаунт</NavLink>
      </nav>
    </div>
  )
}