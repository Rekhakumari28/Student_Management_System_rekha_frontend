import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async () => {
    const response = await axios.get(
      "https://student-managment-system-rekha.vercel.app/teachers"
    );
    const data = response.data;
    return data;
  }
);

export const addTeacherAsync = createAsyncThunk(
  "add/addTeacherAsync",
  async (newTeacher) => {
    const response = await axios.post(
      "https://student-managment-system-rekha.vercel.app/teachers",
      newTeacher
    );
    const data = response.data;
    return data;
  }
);

export const updateTeacherAsync = createAsyncThunk(
  "update/updateTeacherAsync",
  async ({ teacherId, updateTeacher }) => {
    const response = await axios.put(
      `https://student-managment-system-rekha.vercel.app/teachers/${teacherId}`,
      updateTeacher
    );
    const data = response.data;
    return data;
  }
);

export const deleteTeacherAsync = createAsyncThunk(
  "delete/deleteTeacherAsync",
  async (teacherId) => {
    const response = await axios.delete(
      `https://student-managment-system-rekha.vercel.app/teachers/${teacherId}`
    );
    const data = response.data;
    return data;
  }
);

export const teacherSlice = createSlice({
  name: "Teachers",
  initialState: {
    teachers: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //fetch Teacher
    builder.addCase(fetchTeachers.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(fetchTeachers.fulfilled, (state, action) => {
      state.status = "Success";
      state.teachers = action.payload;
    });
    builder.addCase(fetchTeachers.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.message;
    });

    //add Teacher
    builder.addCase(addTeacherAsync.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(addTeacherAsync.fulfilled, (state, action) => {
      state.status = "Teacher Data Added";
      const addedTeacher = action.payload;
      console.log(addedTeacher, "added Teacher");
    });
    builder.addCase(addTeacherAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.message;
    });

    //update Teacher
    builder.addCase(updateTeacherAsync.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(updateTeacherAsync.fulfilled, (state, action) => {
      state.status = "Teacher Data Updated Successfully.";
      const updatedTeacher = action.payload;
      console.log(updatedTeacher, "updatedTeacher");
    });
    builder.addCase(updateTeacherAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    //delete Teacher
    builder.addCase(deleteTeacherAsync.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(deleteTeacherAsync.fulfilled, (state, action) => {
      state.status = "Teacher Data Deleted.";
      const deletedTeacher = action.payload;
      console.log(deletedTeacher, "Deleted Teacher");
    });
    builder.addCase(deleteTeacherAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});
export default teacherSlice.reducer;