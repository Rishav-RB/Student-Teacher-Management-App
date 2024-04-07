import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../features/todo/userSilce'
export const store=configureStore({
    reducer:userReducer  
})
