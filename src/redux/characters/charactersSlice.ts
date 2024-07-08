// features/charactersSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ApiResponse {
    characters: Character[];
    loading: boolean;
    error: string | null;
}

const initialState: ApiResponse = {
    characters: [],
    loading: false,
    error: ''
  };

//   export const fetchCharacters = createAsyncThunk<
//   Character[],
//   number, // Accepts page number
//   { state: RootState }
// >('characters/fetchCharacters', async (page: number ) => {
//   try {
//     const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
//     const data = await response.json();
//     return data.results;
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });

export const fetchCharacters = createAsyncThunk<
  Character[],
  number // Accepts page number
>(
  'characters/fetchCharacters',
  async (page: number) => {
    console.log(`https://rickandmortyapi.com/api/character?page=${page}`)
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
    const data = await response.json();
    return data.results;
  }
);

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    clearCharacters(state) {
      state.characters = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // state.characters = [...state.characters, ...action.payload.characters];
        // state.characters = [...state.characters, ...action.payload]; // Use action.payload directly
        state.characters = [...state.characters, ...action.payload]; // Append new characters

      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});



// You can export actions if needed
export const {clearCharacters } = charactersSlice.actions;
export default charactersSlice.reducer;
