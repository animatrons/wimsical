import './App.css'; 
import GetIt from './components/GetIt'
import PostIt from './components/PostIt'
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom';

import {
  Container,
  Navbar,
  NavbarBrand,
  Row,
  Col
} from 'reactstrap';

function App() {
  return (
    <Router>
    <div className="App">
      <div className="all-container">
        <h1 className="app-header"><span className="logo">WIM</span></h1>
        <div className="container-small">
          <div class="form">
            <div className="tabs">
              <span id="t1">
                <Link className="lnk" id="lnk1" to='/'>Post</Link>
              </span>
              <span id="t2">
                <Link className="lnk" id="lnk2" to='/get'>Get</Link>
              </span>
            </div>
            {/* <h2 className="title">Form</h2>
            
              <textarea className ="textarea"></textarea>
              <button className="post">Post</button>
            
            <div className="response">response</div> */}
            <Route exact path='/'>
              <PostIt></PostIt>
            </Route>
            <Route exact path='/get'>
              <GetIt></GetIt>
            </Route>
          </div>
        </div>
      </div>
      
      <footer className="app-footer"> <span>WIM &copy; 2021.</span> </footer>
    </div>
    </Router>
  );
}

export default App;
