// import { configureStore } from '@reduxjs/toolkit';
// import authSlice from './auth/authSlice';
// // import productSlice from './product/productSlice';

// const store = configureStore({
//     reducer:{
//         auth: authSlice,
//         // product: productSlice,
//     }
// })

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch

// export default store;

import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/authSlice';
import charactersSlice from './characters/charactersSlice';
// import productSlice from './product/productSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    characters: charactersSlice,
    //         // product: productSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch