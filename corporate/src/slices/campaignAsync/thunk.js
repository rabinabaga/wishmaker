import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getCampaignsPageAsync = createAsyncThunk(
  "CampaignPageAsyncSlice/getCampaignsPageAsync",
  async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWVkMDg0ZDVhM2Y4NTQ5MDlkMDIzNSIsImlhdCI6MTcyMDQwNTM2OSwiZXhwIjoxNzIyOTk3MzY5fQ.PoBnUH_M5MflKBD3QwOEF55pvQMt3LWGw5SBbwcWLn4`,
          "Content-Type": "application/json",
        },
      };

      const {result} = await axios.get("/campaign", config);
    return result;
    } catch (err) {
      console.log("failed to upload photos", err);
    }
    
  }
);
