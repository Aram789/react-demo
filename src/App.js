import './App.css';
import ToDo from "./components/ToDo/ToDo";
import 'bootstrap/dist/css/bootstrap.min.css';
import About from "./components/pages/about/about";
import Contact from "./components/pages/contact/contact";
import {NotFound} from "./components/pages/NotFound";
import NavMenu from "./components/NavMenu/NavMenu";
import Footer from "./components/Footer";
import SingleTask from "./components/pages/singleTask/SingleTask";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


//23
function App() {
    return (
        <div className="App">
            <Router>
                <NavMenu/>
                <Switch>
                    <Route exact={true}  path="/"
                           component={ToDo}
                    />
                    <Route exact={true}  path="/about"
                               component={About}
                    />
                    <Route exact={true}  path="/contact"
                           component={Contact}
                    />
                    <Route exact={true}  path="/task/:taskId"
                           component={SingleTask}
                    />
                    <Route exact={true}  path="*" component={NotFound}/>
                </Switch>
                <Footer/>
            </Router>
        </div>
    );
}


export default App;
