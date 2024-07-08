import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getCampaignsPageAsync = createAsyncThunk(
  "CampaignPageAsyncSlice/getCampaignsPageAsync",
  async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWVkMDg0ZDVhM2Y4NTQ5MDlkMDIzNSIsImlhdCI6MTcyMDQxODA0OCwiZXhwIjoxNzIzMDEwMDQ4fQ.uDBop9w3yZ0yeO6KYCCtAvRkRJCANfZTen8-VhyViYE`,
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
