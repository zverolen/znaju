interface PhraseLocal {
  id: string;
  created_at: string;
  practiced_count: number;
  correct_count: number;
  russian: string;
  serbian: string;
  phraseSessionStatus: 'new' | 'skipped' | 'correct' | 'wrong';
}

interface PhrasesAllProps {
  data: PhraseLocal
}

 const PhrasesAllRow = ({ data }: PhrasesAllProps) => {
  return (
    <tr key={data.id} role="row">
      <td role="cell">{data.russian}</td>
      <td role="cell" translate='no' lang="sr-RS" >{data.serbian}</td>
      <td role="cell">{data.correct_count}</td>
      <td role="cell">{data.practiced_count - data.correct_count}</td>
      <td role="cell">{data.practiced_count}</td>
    </tr>
  )
}

export default PhrasesAllRow