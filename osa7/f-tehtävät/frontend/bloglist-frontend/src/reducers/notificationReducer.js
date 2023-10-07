import { createSlice } from "@reduxjs/toolkit"
const initialState = null
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setContent(state, action){
            return action.payload
        },
        clearContent(state, action){
            return null
        }
    }
})

export const {setContent, clearContent} = notificationSlice.actions
export const setNotification = (content, time) => {
    return async dispatch => {
        dispatch(setContent(content))
        setTimeout(() => {
            dispatch(clearContent())
          }, time * 1000)
    }
}
export default notificationSlice.reducer