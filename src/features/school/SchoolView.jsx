import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../students/studentsSlice";
import { updateSchoolStats, setTopStudent } from "./schoolSlice";
import { Header } from "../../components/Header";
const SchoolView = () => {
  const dispatch = useDispatch();
  const { students, status, error } = useSelector((state) => state.students);

  let { totalStudents, averageAttendance, averageMarks, topStudent } =
    useSelector((state) => state.school);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);
  
  useEffect(() => {   
    totalStudents = students && students.length > 0 && students.length;
    averageAttendance =
      students &&
      students.length > 0 &&
      students.reduce((acc, curr) => acc + curr.attendance, 0) / totalStudents;
  
    averageMarks =
      students &&
      students.length > 0 &&
      students.reduce((acc, curr) => acc + curr.marks, 0) / totalStudents;
  
      topStudent =
      students &&
      students.length > 0 &&
      students.reduce((acc, curr) => acc.marks > curr.marks ? acc : curr)
  
    dispatch(
      updateSchoolStats({ totalStudents, averageAttendance, averageMarks })
    );
    dispatch(setTopStudent(topStudent));
  }, [students,dispatch]);

  return (
    <>
      <Header />
      <div className="container">
        <h1 className="my-3">School View</h1>
        {status === "Loading" ? (
          <p className="bg-success-subtle text-success-emphasis p-3 rounded">
            {status}
          </p>
        ) : (
          <>
            <p>Total Students: {totalStudents && totalStudents}</p>
            <p>
              Average Attendance:{" "}
              {averageAttendance && averageAttendance.toFixed(2)}
            </p>
            <p>Average Marks: {averageMarks && averageMarks.toFixed(2)}</p>
            <p>Top Student: {topStudent && topStudent.name}</p>
          </>
        )}
        {error && (
            <p className="bg-danger-subtle text-danger-emphasis p-3 rounded">
              {error}
            </p>
          )}
      </div>
    </>
  );
};

export default SchoolView;
