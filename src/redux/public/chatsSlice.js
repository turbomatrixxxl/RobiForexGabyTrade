import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "./operationsChats";

const initialState = {
  activeChats: 0,
  chats: [],
  visitedChatIds: [],
  loading: false,
  error: null,
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },

    updateChat: (state, action) => {
      const { chatId, newMessages } = action.payload;
      const chat = state.chats.find((chat) => chat.id === chatId);
      if (chat) {
        chat.messages.push(...newMessages);
      }
    },

    resetChats: (state) => {
      state.chats = [];
      state.activeChats = 0;
      state.visitedChatIds = [];
    },

    accessChat: (state, action) => {
      const { chatId } = action.payload;

      if (!state.visitedChatIds.includes(chatId)) {
        state.visitedChatIds.push(chatId);
        state.activeChats += 1;
      }
    },

    markChatAsRead: (state, action) => {
      const { chatId } = action.payload;
      state.chats = state.chats.map((chat) => {
        if (chat.id !== chatId) return chat;
        return {
          ...chat,
          messages: chat.messages.map((msg) =>
            msg.isInbox && !msg.isRead ? { ...msg, isRead: true } : msg
          ),
        };
      });
    },

    toggleBlockUser: (state, action) => {
      const { chatId } = action.payload;
      const user = state.chats.find((u) => u.id === chatId);

      if (user) {
        user.user.isBlocked = !user.user.isBlocked;
      }
    },

    deleteUser: (state, action) => {
      const { chatId } = action.payload;
      state.chats = state.chats.filter((chat) => chat.id !== chatId);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch data";
      });
  },
});

export const {
  setChats,
  updateChat,
  resetChats,
  accessChat,
  toggleBlockUser,
  markChatAsRead,
  deleteUser,
} = chatsSlice.actions;

export default chatsSlice.reducer;
