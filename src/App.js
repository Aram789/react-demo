import './App.css';
import ToDo from "./components/ToDo/ToDo";
import 'bootstrap/dist/css/bootstrap.min.css';
import About from "./components/pages/about/about";
import Contact from "./components/pages/contact/contact";
import {NotFound} from "./components/pages/NotFound";
import NavMenu from "./components/NavMenu/NavMenu";
import Footer from "./components/Footer";
import SingleTask from "./components/pages/singleTask/SingleTask";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

//23
function App() {
    return (
        <div className="App">
            <Router>
                <NavMenu/>
                <Routes>
                    <Route path="/"
                           element={<ToDo/>}
                    />
                    <Route path="/about"
                           element={<About/>}
                    />
                    <Route path="/contact"
                           element={<Contact/>}
                    />
                    <Route exact path="/task/:taskId"
                           element={<SingleTask/>}
                    />
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
                <Footer/>
            </Router>
        </div>
    );
}


export default App;
