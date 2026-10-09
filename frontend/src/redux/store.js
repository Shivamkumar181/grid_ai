import { configureStore } from '@reduxjs/toolkit'
import userSlice from './user.slice.js'
import conversationSlice from './conversation.slice.js'
import messageSlice from './message.slice.js'

export const store = configureStore({
  reducer: {
    user:userSlice,
    conversation:conversationSlice,
    message:messageSlice
  },
})