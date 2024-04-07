import {createSlice} from '@reduxjs/toolkit'

const initialState={
    user_data:{}
}

export const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        addUserData:(state,action)=>{
            const data=action.payload
            state.user_data=data
        },
        removeUserData:(state,action)=>{
            state.user_data={}
        }
    }
})

export const {addUserData,removeUserData}=userSlice.actions
export default userSlice.reducer