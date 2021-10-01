import './App.css';
import Header  from './widget/Header'; 
import Footer  from './widget/Footer'; 
import Home from './pages/Home';
import Add from './pages/Add';
import New from './pages/New';
import Endsoon from './pages/Endsoon';
import Expired from './pages/Expired'
import Delegators  from './pages/Delegator';
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
          <Route path="/new" exact component={New}/> 
          <Route path="/endsoon" exact component={Endsoon}/> 
          <Route path="/expired" exact component={Expired}/> 
          <Route path="/delegator" exact component={Delegators}/> 
        </Switch>

    </BrowserRouter>
    <Footer></Footer>
      
    </>
  );
}

export default App;
