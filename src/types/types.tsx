export type PhraseSessionStatus = 'new' | 'skipped' | 'correct' | 'wrong'

export type CountSort = 'rare' | 'frequent'
export type StatusSort = 'correct' | 'wrong' | 'withoutAnswer'

//     {
//       "id": "d81cd6fe-404a-4c90-a46c-8c8f9e83ceee",
//       "created_at": "2024-03-18T08:43:17.260173+00:00",
//       "serbian": "Šta je tvoja sestra?",
//       "russian": "Кем работает твоя сестра?",
//       "practiced_count": 15,
//       "correct_count": 2
//   }

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

export interface User {
  userName: string;
  email: string;
  isLoggedIn: boolean;
  password: string;
  status: string;
}

export interface FormEditFields {
  userName?: string;
  email?: string;
  password?: string;
}