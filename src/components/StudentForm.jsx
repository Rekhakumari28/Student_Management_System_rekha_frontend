import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, addStudentAsync, updateStudentAsync } from "../features/students/studentsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "./Header";
import toast, { Toaster } from "react-hot-toast";

const StudentForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [gender, setGender] = useState("null");
  const [attendance, setAttendance] = useState(0);
  const [marks, setMarks] = useState(0);

  const navigate = useNavigate()

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  const studentId = useParams() 

  const students = useSelector((state) => state.students.students);  

 const studentExisting =studentId.studentId && students.find(student=> student._id == studentId.studentId)

  
    const existing = Boolean(studentExisting)  

  useEffect(() => {
    if (existing) {
      setName(studentExisting.name || "");
      setAge(studentExisting.age || "");
      setGrade(studentExisting.grade || "");
      setGender(studentExisting.gender || "");
      setAttendance(studentExisting.attendance || "");
      setMarks(studentExisting.marks || "");
    }
  }, [existing, studentExisting]);

  const handleSubmit = (e) => {
    e.preventDefault();   

    if (!studentExisting) {
      const newStudent = {
        name: name,
        age: parseInt(age),
        grade: grade,
        gender: gender,
      };
      dispatch(addStudentAsync(newStudent));
      setName(""),
      setAge("")
      setGrade("")
      setGender("")
      toast.success('New Student added!')
    } else {
      const updateStudent = {
        name: name,
        age: parseInt(age),
        grade: grade,
        gender: gender,
        attendance: parseInt(attendance),
        marks: parseInt(marks),
      };
  
      dispatch(
        updateStudentAsync({
          studentId: studentExisting._id,
          updateStudent: updateStudent,
        })
      );
      setName(""),
      setAge("")
      setGrade("")
      setGender("")
      setAttendance("")
      setMarks("")
      toast.success('Student data updated!')
      setTimeout(()=>{
        navigate(`/`)
    }, 3000)
    }
  };

  return (
    <div>
      <Header/>
      <div className="container py-2 ">
      <h2 className="py-3"> {existing ? "Edit Student Detail" : "Add Student"}</h2>
      <form onSubmit={handleSubmit}>
                 
        <input
        style={{width: "50%"}}
        className="form-control "
          type="text"
          placeholder="Name"
          value= {name}
          onChange={(event) => setName(event.target.value)}
        />
        <br />
        <input
         style={{width: "50%"}}
        className="form-control"
          type="number"
          placeholder="Age"
          value={age}
          onChange={(event) => setAge(event.target.value)}
        />
        <br />
        <input
         style={{width: "50%"}}
        className="form-control"
          type="text"
          placeholder="Grade"
          value={grade}
          onChange={(event) => setGrade(event.target.value)}
        />
        <br />
        <label>Gender: </label>{" "}{" "}{" "}
        <label>
          <input
          className="form-check-input"
            type="radio"
            name="gender"
            value="Male"
            checked={gender === "Male"}
            onChange={(event) => setGender(event.target.value)}
          />
         {" "} Male{"   "}
        </label>{" "}
        <label>
          <input
          className="form-check-input"
            type="radio"
            name="gender"
            value="Female"
            checked={gender === "Female"}
            onChange={(event) => setGender(event.target.value)}
          />
        {" "}  Female
        </label>
        <br /><br />
        {studentExisting &&  <>
          <input
           style={{width: "50%"}}
        className="form-control"
          type="number"
          placeholder="Attandence"
          value={attendance}
          onChange={(event) => setAttendance(event.target.value)}
        />
        <br />
        <input
         style={{width: "50%"}}
        className="form-control"
          type="number"
          placeholder="Marks"
          value={marks}
          onChange={(event) => setMarks(event.target.value)}
        />
        <br />        
        </> }       
        
        <button className="btn btn-primary my-2" type="submit">{existing ? "Update" : "Add"}</button>
      </form>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
      </div>
    </div>
  );
};

export default StudentForm;
