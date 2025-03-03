import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './app/store.js'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import StudentForm from './components/StudentForm.jsx'
import StudentDetails from './components/StudentDetails.jsx'
import ClassView from './features/class/ClassView.jsx'
import SchoolView from './features/school/SchoolView.jsx'
import TeachersView from './features/teachers/TeachersView.jsx'
import TeacherDetails from './components/TeacherDetails.jsx'
import TeacherForm from './components/TeacherForm.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<App  />}/>
          <Route path='/addStudent' element={<StudentForm  />}/>
          <Route path='/updateStudent/:studentId' element={<StudentForm  />}/>
          <Route path='/studentDetails/:studentId' element={<StudentDetails  />}/>
         <Route path='/classes' element={<ClassView/>}/>
         <Route path='/school' element={<SchoolView/>}/>
         <Route path='/teachers' element={<TeachersView/>}/>
         <Route path='/addTeacher' element={<TeacherForm  />}/>
         <Route path='/updateTeacher/:teacherId' element={<TeacherForm  />}/>
          <Route path='/teacherDetails/:teacherId' element={<TeacherDetails  />}/>
        </Routes>
      </Router>
    
    </Provider>
    
  </StrictMode>,
)
