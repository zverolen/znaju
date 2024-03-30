import { createSelector, createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../app/store"
import { phrases } from "../../data/data"
import { supabase } from "../../supabaseClient"

type PhraseSessionStatus = 'new' | 'skipped' | 'correct' | 'wrong'

interface SetOrderPayload {
  id: string; 
  phraseSessionStatus: PhraseSessionStatus;
}

interface Phrase {
  id: string;
  created_at: string;
  practiced_count: number;
  correct_count: number;
  russian: string;
  serbian: string;
}

interface PhraseLocal extends Phrase {
  phraseSessionStatus: PhraseSessionStatus;
}

export interface PhrasesState {
  phrases: PhraseLocal[];
  phrasesInPractice: string[];
  currentPhraseId: string;
  status: string;
  error: null | string | undefined;
}

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
        if (repeatedId) {
          state.phrasesInPractice.push(repeatedId)
        }
      } else {
        state.phrasesInPractice.shift()
      }
    },
    setPhraseSessionStatus: (state, action: PayloadAction<SetOrderPayload>) => {
      // const { id, phraseSessionStatus} = action.payload
      const id: string = action.payload.id
      const phraseSessionStatus: PhraseSessionStatus = action.payload.phraseSessionStatus
      const updatedPhrase = state.phrases.find(phrase => phrase.id === id)
      if (updatedPhrase) {
        updatedPhrase.phraseSessionStatus = phraseSessionStatus
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPhrases.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPhrases.fulfilled, (state, action) => {
        // Updates state in two places :(
        if (action.payload) {
          state.status = 'success'
          state.phrases = action.payload.map(phrase => {
            return {...phrase, phraseSessionStatus: 'new'}
          })
          state.phrasesInPractice = action.payload.map(phrase => phrase.id)
        }
      })
      .addCase(fetchPhrases.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      // .addCase(updatePhraseCount.fulfilled, (state, action) => {
      //   if (action.payload) {
      //     const { id, correct_count, practiced_count } = action.payload[0]
      //     const practicedPhrase = state.phrases.find(phrase => phrase.id === id)

      //     if (practicedPhrase) {
      //       practicedPhrase.correct_count = correct_count
      //       practicedPhrase.practiced_count = practiced_count
      //     } 
      //   }
      // })
      .addCase(updateCountForCorrect.fulfilled, (state, action) => {
        if (action.payload) {
          const { id, correct_count, practiced_count } = action.payload[0]
          const practicedPhrase = state.phrases.find(phrase => phrase.id === id)

          if (practicedPhrase) {
            practicedPhrase.correct_count = correct_count
            practicedPhrase.practiced_count = practiced_count
          } 
        }
      })
      .addCase(updateCountForWrong.fulfilled, (state, action) => {
        if (action.payload) {
          const { id, practiced_count } = action.payload[0]
          const practicedPhrase = state.phrases.find(phrase => phrase.id === id)

          if (practicedPhrase) {
            practicedPhrase.practiced_count = practiced_count
          } 
        }
      })
  }
})

export const { 
  setPhraseSessionStatus, 
  setCurrentPhraseId, 
  setOrderForPhrasesInPractice
} = phrasesSlice.actions

export const selectAllPhrases = (state: RootState) => state.phrases.phrases

const selectPracticeIds = (state: RootState) => {
  return state.phrases.phrasesInPractice
}

export const selectPhrasesStatus = (state: RootState)=> state.phrases.status

export const selectPracticedPhrases = createSelector([selectAllPhrases], phrases => phrases.filter((phrase: PhraseLocal) => phrase.phraseSessionStatus !== 'new'))
export const selectNewPhrases = createSelector([selectAllPhrases], phrases => 
  phrases.filter((phrase: PhraseLocal) => phrase.phraseSessionStatus === 'new'))
export const selectCorrectPhrases = createSelector([selectAllPhrases], phrases => phrases.filter((phrase: PhraseLocal) => phrase.phraseSessionStatus === 'correct'))
export const selectWrongPhrases = createSelector([selectAllPhrases], phrases => phrases.filter((phrase: PhraseLocal) => phrase.phraseSessionStatus === 'wrong'))

// in research
export const selectTotalNumberOfPhrases = createSelector([selectAllPhrases], phrases => phrases.length)
export const selectNumberOfNewPhrases = createSelector([selectNewPhrases], phrases => phrases.length)
export const selectNumberOfCorrectPhrases = createSelector([selectCorrectPhrases], phrases => phrases.length)
export const selectNumberOfWrongPhrases = createSelector([selectWrongPhrases], phrases => phrases.length)

export const selectCurrentPhrase = createSelector([selectAllPhrases, selectPracticeIds], (phrases, ids) => {
  return phrases.find((phrase: PhraseLocal) => {
    return phrase.id === ids[0]
  }) as PhraseLocal
})

export const fetchPhrases = createAsyncThunk('phrases/fetchPhrases', async () => {  
  const { data } = await supabase.from("phrases").select('*')
  return data
})

// export const updatePhraseCount = createAsyncThunk(
//   'phrases/updatePhraseCount', 
//   async ({ id, practiceStatus }) => 
//   {
//     const countData = await supabase.from("phrases").select('practiced_count, correct_count').eq('id', id)
    
//     let practicedCount: number;
//     let correctCount: number;
    
//     if (countData.data) {
//       practicedCount = countData.data[0].practiced_count + 1
//       correctCount = practiceStatus === 'correct' ? countData.data[0].correct_count + 1 : countData.data[0].correct_count

//       const updates = {
//         practiced_count: practicedCount,
//         correct_count: correctCount
//       }
  
//       const { data, error } = await supabase.from("phrases").update(updates).eq('id', id).select()
  
//       if (error) { console.log(error) }
  
//       return data
//     }
// })

export const updateCountForCorrect = createAsyncThunk(
  'phrases/updateCountForCorrect', 
  async (id: string) => 
  {
    const countData = await supabase.from("phrases").select('practiced_count, correct_count').eq('id', id)
    
    let practicedCount: number
    let correctCount: number
    
    if (countData.data) {
      practicedCount = countData.data[0].practiced_count + 1
      correctCount = countData.data[0].correct_count

      const updates = {
        practiced_count: practicedCount,
        correct_count: correctCount
      }
  
      const { data, error } = await supabase.from("phrases").update(updates).eq('id', id).select()
  
      if (error) { console.log(error) }
  
      return data
    }
})

export const updateCountForWrong = createAsyncThunk(
  'phrases/updateCountForWrong', 
  async (id: string) => 
  {
    const countData = await supabase.from("phrases").select('practiced_count').eq('id', id)
    
    let practicedCount: number
    
    if (countData.data) {
      practicedCount = countData.data[0].practiced_count + 1

      const updates = {
        practiced_count: practicedCount,
      }
  
      const { data, error } = await supabase.from("phrases").update(updates).eq('id', id).select()
  
      if (error) { console.log(error) }
  
      return data
    }
})

export default phrasesSlice.reducer