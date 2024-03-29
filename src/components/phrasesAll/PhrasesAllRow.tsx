import type { PhraseLocal } from "../../types/types"

interface PhrasesAllProps {
  data: PhraseLocal;
  isInPercent: boolean;
}

const PhrasesAllRow = ({ data, isInPercent }: PhrasesAllProps) => {
  const correctCount: number = data.correct_count
  const wrongCount: number = data.practiced_count - data.correct_count
  const totalCount: number = data.practiced_count
  let correctCountPercent!: number
  let wrongCountPercent!: number

  if (isInPercent) {
    if (totalCount !== 0) {
      correctCountPercent = Math.round(correctCount * 100 / totalCount)
      wrongCountPercent = 100 - correctCountPercent
    } else {
      correctCountPercent = 0
      wrongCountPercent = 0
    }
  }

  return (
    <tr key={data.id} role="row">
      <td role="cell">{data.russian}</td>
      <td role="cell" translate='no' lang="sr-RS" >{data.serbian}</td>
      <td role="cell">{isInPercent ? `${correctCountPercent}%` : correctCount}</td>
      <td role="cell">{isInPercent ? `${wrongCountPercent}%` : wrongCount}</td>
      <td role="cell">{totalCount}</td>
    </tr>
  )
}

export default PhrasesAllRow