import React, { useEffect, useState } from 'react'
import { Header } from './Header';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addTeacherAsync, fetchTeachers, updateTeacherAsync } from '../features/teachers/teacherSlice';

const TeacherForm = () => {
      const [name, setName] = useState("");
      const [age, setAge] = useState("");
      const [email, setEmail] = useState("");
      const [gender, setGender] = useState("null");
      const [experience, setExperience] = useState(0);
      const [phone, setPhone] = useState("");
      const [subject, setSubject] = useState("");
    
      const navigate = useNavigate()

      const dispatch = useDispatch();
      useEffect(() => {
        dispatch(fetchTeachers());
      }, []);
    
      const teacherId = useParams() 
    
      const teachers = useSelector((state) => state.teachers.teachers);  
    
     const teacherExisting = teacherId.teacherId && teachers.find(teacher=> teacher._id == teacherId.teacherId)
    
      console.log(teacherExisting, "teacherExisting")
        const existing = Boolean(teacherExisting)  
    
      useEffect(() => {
        if (existing) {
          setName(teacherExisting.name || ""),
          setAge(teacherExisting.age || "")
          setEmail(teacherExisting.email || "")
          setGender(teacherExisting.gender || "")
          setExperience(teacherExisting.experience || "")
          setPhone(teacherExisting.phone || "")
          setSubject(teacherExisting.subject || "")
         
        }
      }, [existing, teacherExisting]);
    
      const handleSubmit = (e) => {
        e.preventDefault();   
    
        if (!teacherExisting) {
          const newTeacher = {
            name: name,
            age: parseInt(age),
            email: email,
            gender: gender,
          };
          dispatch(addTeacherAsync(newTeacher));
          setName(""),
          setAge("")
          setEmail("")
          setGender("")
        } else {
          const updateTeacher = {
            name: name,
            age: parseInt(age),
            email: email,
            gender: gender,
            experience: parseInt(experience),
            phone: phone,
            subject: subject
          };
      
          dispatch(
            updateTeacherAsync({
                teacherId: teacherExisting._id,
              updateTeacher: updateTeacher,
            })
          );
          setName(""),
          setAge("")
          setEmail("")
          setGender("")
          setExperience("")
          setPhone("")
          setSubject("")
          setTimeout(()=>{
            navigate(`/teachers`)
        }, 3000)
        }
      };
    

  return (
    <div>
        <Header/>
          <div className="container py-2 ">
          <h2 className="py-3"> {existing ? "Edit Teacher Detail" : "Add Teacher"}</h2>
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
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
            {teacherExisting &&  <>
              <input
               style={{width: "50%"}}
            className="form-control"
              type="number"
              placeholder="Experience"
              value={experience}
              onChange={(event) => setExperience(event.target.value)}
            />
            <br />
            <input
             style={{width: "50%"}}
            className="form-control"
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
            <br />        
            <input
             style={{width: "50%"}}
            className="form-control"
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
            />
            <br />        
            </> }       
            
            <button className="btn btn-primary my-2" type="submit">{existing ? "Update" : "Add"}</button>
          </form>
          </div>
        </div>
  )
}

export default TeacherForm