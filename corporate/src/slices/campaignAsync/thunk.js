import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getCampaignsPageAsync = createAsyncThunk(
  "CampaignPageAsyncSlice/getCampaignsPageAsync",
  async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWVkMDg0ZDVhM2Y4NTQ5MDlkMDIzNSIsImlhdCI6MTcyMDE1NTUyNiwiZXhwIjoxNzIwMjQxOTI2fQ.Unr1EguofUxThB4y1FL-C24YIqQPwc9Hm1o3vNu5nPo`,
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
