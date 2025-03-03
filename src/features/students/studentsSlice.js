import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudent",
  async () => {
    const response = await axios.get(
      "https://student-managment-system-rekha.vercel.app/students"
    );
    const data = response.data;
    return data;
  }
);
export const addStudentAsync = createAsyncThunk(
  "add/addStudentAsync",
  async (newStudent) => {
    const response = await axios.post(
      "https://student-managment-system-rekha.vercel.app/students",
      newStudent
    );
    const data = response.data;
    return data;
  }
);
export const updateStudentAsync = createAsyncThunk(
  "update/updateStudentAsync",
  async ({ studentId, updateStudent }) => {
    const response = await axios.put(
      `https://student-managment-system-rekha.vercel.app/students/${studentId}`,
      updateStudent
    );
    const data = response.data;
    return data;
  }
);

export const deleteStudentAsync = createAsyncThunk(
  "delete/deleteStudentAsync",
  async (studentId) => {
    const response = await axios.delete(
      `https://student-managment-system-rekha.vercel.app/students/${studentId}`
    );
    const data = response.data;
    return data;
  }
);

export const studentsSlice = createSlice({
  name: "Students",
  initialState: {
    students: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //fetch student
    builder.addCase(fetchStudents.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.status = "Success";
      state.students = action.payload;
    });
    builder.addCase(fetchStudents.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.message;
    });

    //add student
    builder.addCase(addStudentAsync.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(addStudentAsync.fulfilled, (state, action) => {
      state.status = "Student Data Added";
      const addedStudent = action.payload;
      console.log(addedStudent, "added student");
    });
    builder.addCase(addStudentAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload.message;
    });

    //update student
    builder.addCase(updateStudentAsync.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(updateStudentAsync.fulfilled, (state, action) => {
      state.status = "Student Data Updated Successfully.";
      const updatedStudent = action.payload;
      console.log(updatedStudent, "updatedStudent");
    });
    builder.addCase(updateStudentAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    //delete student
    builder.addCase(deleteStudentAsync.pending, (state) => {
      state.status = "Loading";
    });
    builder.addCase(deleteStudentAsync.fulfilled, (state, action) => {
      state.status = "Student Data Deleted.";
      const deletedStudent = action.payload;
      console.log(deletedStudent, "Deleted student");
    });
    builder.addCase(deleteStudentAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default studentsSlice.reducer;
