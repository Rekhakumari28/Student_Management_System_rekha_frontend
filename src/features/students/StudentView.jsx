import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents } from "./studentsSlice";
import { useEffect } from "react";

const StudentView = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => {
    return state.students;
  });

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);
  return (
    <>
      <div className="container">
        <h1 className="my-4">Student View</h1>
        <Link className="bg-warning rounded px-3 py-2 text-primary" to="/addStudent">Add Student</Link>
        <h2 className="my-4">Student List</h2>
        <div>
          {students.status === "Loading" && (
            <p className="bg-success-subtle text-success-emphasis p-3 rounded">
              {students.status}
            </p>
          )}
           {students.status === "error" && (
            <p className="bg-danger-subtle text-danger-emphasis p-3 rounded">
              {students.error}
            </p>
          )}
          {students &&
            students.students?.map((student) => (
              <li key={student._id}>
                <Link to={`/studentDetails/${student._id}`}>
                  {student.name} (Age:{student.age})
                </Link>
              </li>
            ))}
        </div>
      </div>
    </>
  );
};

export default StudentView;
