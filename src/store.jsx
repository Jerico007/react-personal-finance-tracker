// redux library
import { configureStore,combineSlices } from "@reduxjs/toolkit"

// Reducer
import userTransaction from "./Slice/userTransaction"

const rootReducer = combineSlices({
    userTransaction : userTransaction
});

const store = configureStore({
    reducer : rootReducer,
});

export default store;