import type { PhraseLocal } from "../../types/types"

interface PhrasesAllProps {
  data: PhraseLocal;
  isInPercent: "true" | "false";
}

const PhrasesAllRow = ({ data, isInPercent }: PhrasesAllProps) => {
  const displayInPercent = isInPercent === "true" ? true : false
  const correctCount: number = data.correct_count
  const wrongCount: number = data.practiced_count - data.correct_count
  const totalCount: number = data.practiced_count
  let correctCountPercent!: number
  let wrongCountPercent!: number

  if (displayInPercent) {
    correctCountPercent = Math.round(correctCount * 100 / totalCount)
    wrongCountPercent = 100 - correctCountPercent
  }

  return (
    <tr key={data.id} role="row">
      <td role="cell">{data.russian}</td>
      <td role="cell" translate='no' lang="sr-RS" >{data.serbian}</td>
      <td role="cell">{displayInPercent ? `${correctCountPercent}%` : correctCount}</td>
      <td role="cell">{displayInPercent ? `${wrongCountPercent}%` : wrongCount}</td>
      <td role="cell">{totalCount}</td>
    </tr>
  )
}

export default PhrasesAllRow