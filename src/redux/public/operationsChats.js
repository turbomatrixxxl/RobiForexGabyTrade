import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import mockData from "../../data/mock-chats.json";
axios.defaults.baseURL = "https://dummyjson.com";

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/c/5c9a-2b01-4cee-b469");
      console.log("succes :", response.data);
      console.log("mockData :", mockData);

      return mockData;
    } catch (error) {
      console.warn("API failed, using mock data:", error.message);
      // console.log("mockData error :", mockData);

      return mockData;
    }
  }
);
