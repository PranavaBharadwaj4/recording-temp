// import './css/bootstrap.min.css'
import './css/style.css'
import {Routes, Route} from 'react-router-dom'
import Base from './pages/Base';
function App() {
  return <Routes>
    <Route path ='/' element={ <Base/>}/>
    {/* <Route path ='/doctor-settings/' element={ <DoctorsSettings/>}/> */}
    

  </Routes>
}

export default App;
