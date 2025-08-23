import { createSlice, current } from "@reduxjs/toolkit";
import { fetchData } from "./operationsChats";

const user = localStorage.getItem("user");

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
      const filteredChats = state.chats.filter((ch) => ch.id !== "global");
      const globalChats = state.chats.filter((ch) => ch.id === "global");

      state.chats = [
        ...globalChats,
        ...filteredChats.map((chat) => {
          if (chat.id !== chatId) return chat;
          return {
            ...chat,
            messages: chat.messages.map((msg) =>
              msg.isInbox && !msg.isRead ? { ...msg, isRead: true } : msg
            ),
          };
        }),
      ];
    },

    markGlobalChatAsRead: (state, action) => {
      const { chatId } = action.payload;

      // dacă nu e global, nu facem nimic
      if (chatId !== "global") return;

      state.chats = state.chats.map((chat) => {
        if (chat.id === "global") {
          return {
            ...chat,
            users: chat.users.map((user) => ({
              ...user,
              messages: user.messages.map((msg) =>
                msg.isInbox && !msg.isRead ? { ...msg, isRead: true } : msg
              ),
            })),
          };
        }
        return chat;
      });
    },

    toggleBlockUser: (state, action) => {
      const { chatId } = action.payload;
      const chat = state.chats.find((u) => u.id === chatId);

      if (chat?.user) {
        chat.user.isBlocked = !chat.user.isBlocked;
      }
    },

    addUser: (state, action) => {
      const { chatId } = action.payload;
      const isUser = state.chats.filter((chat) => chat.id === chatId);

      if (isUser.length > 0) {
        return;
      }

      const globalChats = state.chats.find((chat) => chat.id === "global");

      if (!globalChats) return; // safety

      const newUser = globalChats.users.find((user) => user.id === chatId);

      if (!newUser) {
        console.warn("User not found in globalChats.users:", chatId);
        return;
      }

      console.log("newUser:", current(newUser));

      const nume = user.username;
      console.log("nume", nume);

      // ia doar mesajele trimise către mine (dacă există)
      const sentToMeMsgs =
        newUser.messages?.filter((msg) => msg?.sentTo === "Radu&Lavi") || [];

      // dacă nu are niciun mesaj, creează unul default
      const newUserMessagesInbox =
        sentToMeMsgs.length > 0
          ? sentToMeMsgs
          : [
              {
                content: "Hy there ! Let's chat !",
                id: `message-${Date.now()}`,
                isInbox: true,
                isRead: true,
                sentAt: new Date().toISOString(),
              },
            ];

      // creează un nou obiect user cu messages inițializate
      const updatedNewUser = {
        ...newUser,
        messages: [...newUserMessagesInbox],
      };

      state.chats.push(updatedNewUser);
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
  markGlobalChatAsRead,
  addUser,
  deleteUser,
} = chatsSlice.actions;

export default chatsSlice.reducer;
