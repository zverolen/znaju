import { createSelector, createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { Action, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from "@reduxjs/toolkit/query"
import { phrases } from "../../data/data"
import { supabase } from "../../supabaseClient"

interface SetOrderPayload {
  id: string; 
  phraseSessionStatus: string;
}

interface Phrase {
  id: string;
  created_at: string;
  practiced_count: number;
  correct_count: number;
  russian: string;
  serbian: string;
}

interface PhrasesState {
  phrases: Phrase[];
  phrasesInPractice: Phrase[];
  currentPhraseId: string;
  status: string;
  error: null;
}

type Phrases = Phrase[]

const initialState: PhrasesState = {
  phrases: [],
  phrasesInPractice: [],
  currentPhraseId: phrases[0].id,
  status: 'idle',
  error: null
}

export const phrasesSlice = createSlice({
  name: 'phrases',
  initialState,
  reducers: {
    setCurrentPhraseId: (state, action: PayloadAction<string>) => {
      state.currentPhraseId = action.payload
    },
    setOrderForPhrasesInPractice: (state, action: PayloadAction<SetOrderPayload>) => {
      const { phraseSessionStatus} = action.payload
      if (phraseSessionStatus === 'new') {
        const repeatedId = state.phrasesInPractice.shift()
        state.phrasesInPractice.push(repeatedId)
      } else {
        state.phrasesInPractice.shift()
      }
    },
    setPhraseSessionStatus: (state, action) => {
      const { id, phraseSessionStatus} = action.payload
      const updatedPhrase = state.phrases.find(phrase => phrase.id === id)
        updatedPhrase.phraseSessionStatus = phraseSessionStatus
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPhrases.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPhrases.fulfilled, (state, action) => {
        // Updates state in two places :(
        state.status = 'success'
        state.phrases = action.payload.map(phrase => {
          return {...phrase, phraseSessionStatus: 'new'}
        })
        state.phrasesInPractice = action.payload.map(phrase => phrase.id)
      })
      .addCase(fetchPhrases.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(updatePhraseCount.fulfilled, (state, action) => {
        const { id, correct_count, practiced_count } = action.payload[0]
        let practicedPhrase = state.phrases.find(phrase => phrase.id === id)
        practicedPhrase.correct_count = correct_count
        practicedPhrase.practiced_count = practiced_count
      })
  }
})

export const { 
  setPhraseSessionStatus, 
  setCurrentPhraseId, 
  setOrderForPhrasesInPractice
} = phrasesSlice.actions

export const selectAllPhrases = (state) => state.phrases.phrases

const selectPracticeIds = (state) => {
  return state.phrases.phrasesInPractice
}

export const selectPhrasesStatus = state => state.phrases.status

export const selectPracticedPhrases = createSelector([selectAllPhrases], phrases => phrases.filter(phrase => phrase.phraseSessionStatus !== 'new'))
export const selectNewPhrases = createSelector([selectAllPhrases], phrases => 
  phrases.filter(phrase => phrase.phraseSessionStatus === 'new'))
export const selectCorrectPhrases = createSelector([selectAllPhrases], phrases => phrases.filter(phrase => phrase.phraseSessionStatus === 'correct'))
export const selectWrongPhrases = createSelector([selectAllPhrases], phrases => phrases.filter(phrase => phrase.phraseSessionStatus === 'wrong'))

// in research
export const selectTotalNumberOfPhrases = createSelector([selectAllPhrases], phrases => phrases.length)
export const selectNumberOfNewPhrases = createSelector([selectNewPhrases], phrases => phrases.length)
export const selectNumberOfCorrectPhrases = createSelector([selectCorrectPhrases], phrases => phrases.length)
export const selectNumberOfWrongPhrases = createSelector([selectWrongPhrases], phrases => phrases.length)

export const selectCurrentPhrase = createSelector([selectAllPhrases, selectPracticeIds], (phrases, ids) => {
  return phrases.find(phrase => phrase.id === ids[0])
})

export const fetchPhrases = createAsyncThunk('phrases/fetchPhrases', async () => {  
  const { data } = await supabase.from("phrases").select('*')
  return data
})

export const updatePhraseCount = createAsyncThunk(
  'phrases/updatePhraseCount', 
  async ({ id, practiceStatus }) => 
  {
    const countData = await supabase.from("phrases").select('practiced_count, correct_count').eq('id', id)
    const practicedCount = countData.data[0].practiced_count + 1
    const correctCount = practiceStatus === 'correct' ? countData.data[0].correct_count + 1 : countData.data[0].correct_count
    
    const updates = {
      practiced_count: practicedCount,
      correct_count: correctCount
    }

    const { data, error } = await supabase.from("phrases").update(updates).eq('id', id).select()

    if (error) { console.log(error) }
    // return data
//     return [
//     {
//       "id": "d81cd6fe-404a-4c90-a46c-8c8f9e83ceee",
//       "created_at": "2024-03-18T08:43:17.260173+00:00",
//       "serbian": "Šta je tvoja sestra?",
//       "russian": "Кем работает твоя сестра?",
//       "practiced_count": 15,
//       "correct_count": 2
//   }
// ]
})

export default phrasesSlice.reducer