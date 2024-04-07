import { useState } from 'react'
import Home from './pages/Home'
import StudentSignup from './pages/StudentSignup'
import TeacherSignup from './pages/TeacherSignup'
import StudentHome from './pages/StudentHome'
import TeacherHome from './pages/TeacherHome'
import AddSubject from './pages/AddSubject'
import AddMarks from './pages/AddMarks'
import CreateResult from './pages/CreateResult'
import ViewMarksStudent from './pages/ViewMarksStudent'
import ViewResultStudent from './pages/ViewResultStudent'
import PersonalDetails from './pages/PersonalDetails'
import ViewResults from './pages/ViewResults'
import TeacherStudent from './pages/TeacherStudent'
import {Navigate, Route, Routes} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import {useSelector} from 'react-redux'

function App() {
  const user=useSelector(state=>state.user_data)
  console.log(user)
  return (
    <div>
      <Routes>
        <Route path='/' element={user.userType?(user.userType==='student'?<Navigate to='/student/home'/>:<Navigate to='/teacher/home'/>):<Home/>}/>
        <Route path='/student-signup' element={user.userType==='student'?<Navigate to="/student/home"/>:<StudentSignup/>}/>
        <Route path='/teacher-signup' element={user.userType==='teacher'?<Navigate to="/teacher/home"/>:<TeacherSignup/>}/>
        <Route path='/teacher/add-marks' element={user.userType==='teacher'?<AddMarks/>:<div>Not Permitted here</div>}/>
        <Route path='/teacher/add-subject' element={user.userType==='teacher'?<AddSubject/>:<div>Not Permitted here</div>}/>
        <Route path='/teacher/create-result' element={user.userType==='teacher'?<CreateResult/>:<div>Not permitted here</div>}/>
        <Route path='/teacher/view-students' element={user.userType==='teacher'?<TeacherStudent/>:<div>Not Permitted Here</div>}/>
        <Route path='/teacher/view-results' element={user.userType==='teacher'?<ViewResults/>:<div>Not Permitted here</div>}/>
        <Route path='/teacher/home' element={user.userType==='teacher'?<TeacherHome/>:<div>Not Permitted here</div>}/>
        <Route path='/student/home' element={user.userType==='student'?<StudentHome/>:<div>Not Permitted here</div>}/>
        <Route path='/student/view-results' element={user.userType==='student'?<ViewResultStudent/>:<div>Not Permitted here</div>}/>
        <Route path='/student/view-marks' element={user.userType==='student'?<ViewMarksStudent/>:<div>Not Permitted here</div>}/>
        <Route path='/student/view-info' element={user.userType==='student'?<PersonalDetails/>:<div>Not Permitted here</div>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
