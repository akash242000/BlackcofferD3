import { configureStore } from '@reduxjs/toolkit'
import countrySlice from './slices/countrySlice'

const store= configureStore({
    reducer:{
        countryData:countrySlice
    }
})

export default store;