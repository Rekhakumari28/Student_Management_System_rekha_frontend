import React from 'react'
import { Header } from './Header'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {deleteTeacherAsync} from '../features/teachers/teacherSlice'
const TeacherDetails = () => {
    const teacherId = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const teachers = useSelector((state) => state.teachers.teachers);
    const teacherData = teachers?.find(
      (student) => student._id == teacherId.teacherId
    );
  
    const handleDelete = (teacherId) => {
      dispatch(deleteTeacherAsync(teacherId));
      setTimeout(() => {
        navigate("/teachers");
      }, 3000);
    };
  return (
    <>
      <Header />
      <div className="container">
        <h2 className="my-3">Teacher Detail</h2>
        <div className="card border-0 ">
          <p className="mb-2 fs-5">Name: {teacherData?.name}</p>
          <p className="mb-2 fs-5">Age: {teacherData?.age}</p>
          <p className="mb-2 fs-5">Email: {teacherData?.email}</p>
          <p className="mb-2 fs-5">Gender: {teacherData?.gender}</p>
          {teacherData?.experience ? (
            <p className="mb-2 fs-5">Experience: {teacherData?.experience} </p>
          ) : (
            ""
          )}
          {teacherData?.phone ? (
            <p className="mb-2 fs-5">Phone: {teacherData?.phone}</p>
          ) : (
            ""
          )}
          {teacherData?.subject ? (
            <p className="mb-2 fs-5">Subject: {teacherData?.subject}</p>
          ) : (
            ""
          )}
          <p className="d-inline-flex gap-1">
            <Link
              className="bg-warning rounded px-3 py-2 text-primary"
              to={`/updateTeacher/${teacherData?._id}`}
            >
              Edit Details
            </Link>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(teacherData?._id)}
            >
              Delete
            </button>
          </p>
        </div>
      </div>
    </>
  )
}

export default TeacherDetails