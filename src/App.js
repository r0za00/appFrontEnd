import logo from './logo.svg';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Lesson from './Components/Lesson/Lesson';
import MyNavbar from './Components/Navbar/MyNavbar';
import InfoLesson from './Components/InfoLesson/InfoLesson';
import { Link,  BrowserRouter as Router,Route,Switch } from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      <MyNavbar></MyNavbar>
      <Switch>
      <Route path="/lesson/:id" component={InfoLesson} />
      </Switch>

    </div>
    </Router>
  );
}

export default App;
