import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Header } from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudentAsync } from "../features/students/studentsSlice";
import toast, { Toaster }  from "react-hot-toast";
const StudentDetails = () => {
  const studentId = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const students = useSelector((state) => state.students.students);
  const studentData = students?.find(
    (student) => student._id == studentId.studentId
  );

  const handleDelete = (studentId) => {
    dispatch(deleteStudentAsync(studentId));
    toast.success('Student data deleted successfully!')
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <>
      <Header />
      <div className="container">
        <h2 className="my-3">Student Detail</h2>
        <div className="card border-0 ">
          <p className="mb-2 fs-5">Name: {studentData?.name}</p>
          <p className="mb-2 fs-5">Age: {studentData?.age}</p>
          <p className="mb-2 fs-5">Grade: {studentData?.grade}</p>
          <p className="mb-2 fs-5">Gender: {studentData?.gender}</p>
          {studentData?.attendance ? (
            <p className="mb-2 fs-5">Attendance: {studentData?.attendance} </p>
          ) : (
            ""
          )}
          {studentData?.marks ? (
            <p className="mb-2 fs-5">Marks: {studentData?.marks}</p>
          ) : (
            ""
          )}
          <p className="d-inline-flex gap-1">
            <Link
              className="bg-warning rounded px-3 py-2 text-primary"
              to={`/updateStudent/${studentData?._id}`}
            >
              Edit Details
            </Link>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(studentData?._id)}
            >
              Delete
            </button>
            
          </p>
          <Toaster
  position="top-center"
  reverseOrder={false}
/>
        </div>
      </div>
    </>
  );
};

export default StudentDetails;
