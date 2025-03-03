import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../students/studentsSlice";
import { Header } from "../../components/Header";

const ClassView = () => {
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Name");

  const { students, status, error } = useSelector((state) => state.students);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const filteredStudents =
    filter === "All"
      ? students
      : students?.filter((student) => student.gender === filter);

  const sortedStudents =
    sortBy === "Name"
      ? [...filteredStudents].sort((a, b) => a.name.localeCompare(b.name))
      : sortBy === "Marks"
      ? [...filteredStudents].sort((a, b) => a.marks - b.marks)
      : sortBy === "Attendance"
      ? [...filteredStudents].sort((a, b) => a.attendance - b.attendance)
      : filteredStudents;

  return (
    <>
      <Header />
      <div className="container">
        <h1 className="my-4">Class View</h1>
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="filterByGender">Filter by Gender: </label>
            <select
              className="form-select"
              name="gender"
              id="filterByGender"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="All">All</option>
              <option value="Male">Boys</option>
              <option value="Female">Girls</option>
            </select>
          </div>
          <br />
          <div className="col-md-6">
            <label htmlFor="sortStudents">Sort by:</label>
            <select
              className="form-select"
              name="sort"
              id="sortStudents"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="Name">Name</option>
              <option value="Marks">Marks</option>
              <option value="Attendance">Attendance</option>
            </select>
          </div>
        </div>
        <ul>
          {status === "Loading" && (
            <p className="bg-success-subtle text-success-emphasis p-3 rounded">
              {status}
            </p>
          )}
          {status === "error" && (
            <p className="bg-danger-subtle text-danger-emphasis p-3 rounded">
              {error}
            </p>
          )}
          {sortedStudents.length > 0 &&
            sortedStudents?.map((student) => (
              <li key={student._id}>
                {student.name} - {student.gender} - Marks: {student.marks} -
                Attendance: {student.attendance}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default ClassView;
