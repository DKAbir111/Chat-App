import { createSlice } from "@reduxjs/toolkit";

export const refreshSidebar = createSlice({
  name: "refreshSidebar",
  initialState: true, // This is fine if you only need a boolean state.
  reducers: {
    refreshSidebarFun: (state) => {
      console.log("Refreshing sidebar from Redux");
      // Directly mutate the state
      return !state; // Simply return the toggled value
    },
  },
});

export const { refreshSidebarFun } = refreshSidebar.actions;
export default refreshSidebar.reducer;
