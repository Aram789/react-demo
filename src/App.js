import './App.css';
import ToDo from "./components/ToDo/ToDo";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from "react-router-dom";
import About from "./components/pages/about/about";
import Contact from "./components/pages/contact/contact";
import {NotFound} from "./components/pages/NotFound";
import NavMenu from "./components/NavMenu/NavMenu";
//22-3
function App() {
    return (
        <div className="App">
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
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
    );
}


export default App;
