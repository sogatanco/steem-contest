import './App.css';
import Header  from './widget/Header'; 
import Home from './pages/Home';
import Add from './pages/Add';
import {
  Switch,
  Route,
  BrowserRouter
} from "react-router-dom";


function App() {
  return (
    <>
    <BrowserRouter>
    <Header></Header>

       <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/add" exact component={Add}/> 
        </Switch>

    </BrowserRouter>
      
    </>
  );
}

export default App;
