import React from "react";
import { Header } from "../../components/Header";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTeachers } from "./teacherSlice";
const TeachersView = () => {
  const dispatch = useDispatch();
  const {teachers, status, error} = useSelector((state) => state.teachers);
console.log(teachers)
  useEffect(() => {
    dispatch(fetchTeachers());
  }, []);
  return (
    <>
      <Header />
      <div className="container">
        <h1 className="my-4">Teachers</h1>
        <Link
          className="bg-warning rounded px-3 py-2 text-primary"
          to="/addTeacher"
        >
          Add Teacher
        </Link>
        <h2 className="my-4">Teachers List</h2>
        <div>
          {status === "Loading" && (
            <p className="bg-success-subtle text-success-emphasis p-3 rounded">
              {status}
            </p>
          )}
          {error && (
            <p className="bg-danger-subtle text-danger-emphasis p-3 rounded">
              {error}
            </p>
          )}
          {teachers &&
            teachers?.map((teacher) => (
              <li key={teacher._id}>
                <Link to={`/teacherDetails/${teacher._id}`}>
                  {teacher.name} (Age:{teacher.age})
                </Link>
              </li>
            ))}
        </div>
      </div>
    </>
  );
};

export default TeachersView;
