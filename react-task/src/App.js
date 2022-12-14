
import './App.css';
import TaskForm from './componets/TaskForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UpdateForm from './componets/UpdateForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TaskForm />} />
          <Route path='/task/:pid' element={<UpdateForm />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
