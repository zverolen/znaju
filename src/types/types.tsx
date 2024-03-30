export type PhraseSessionStatus = 'new' | 'skipped' | 'correct' | 'wrong'

export type CountSort = 'rare' | 'frequent'
export type StatusSort = 'correct' | 'wrong' | 'withoutAnswer'

export interface Phrase {
  id: string;
  created_at: string;
  practiced_count: number;
  correct_count: number;
  russian: string;
  serbian: string;
}

export interface PhraseLocal extends Phrase {
  phraseSessionStatus: PhraseSessionStatus;
}