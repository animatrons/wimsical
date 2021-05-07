import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import './App.css'; 
import PostIt from './components/PostIt'
import GetIt from './components/GetIt'
import { useState } from 'react';
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
  const [postTabSelected, setPostTabSelected] = useState(true);
  return (
    <Router>
    <div className="App">
      <div className="all-container">
        <h1 className="app-header"><span className="logo">W.I.M</span><span className="lead">WIM postal service! Send and recieve data from all your devices, share it with friends, in under ONE seconds, no account required!</span></h1>
        <div className="container-small">
          <div className="form">
            <div className="tabs">
              <span id="t1">
                <Link 
                  className="lnk"
                  to='/' 
                  onClick={()=>setPostTabSelected(true)}
                  style={postTabSelected ? {color: "skyblue", textDecoration:"underline"}:{color: "white",textDecoration:"none"}}>
                    Post
                </Link>
              </span>
              <span id="t2">
                <Link 
                  className="lnk"
                  to='/get'
                  onClick={()=>setPostTabSelected(false)}
                  style={!postTabSelected ? {color: "skyblue", textDecoration:"underline"}:{color: "white",textDecoration:"none"}}>
                   Get
                </Link>
              </span>
            </div>
            <Route exact path='/'>
              <PostIt></PostIt>
            </Route>
            <Route exact path='/get'>
              <GetIt></GetIt>
            </Route>
          </div>
        </div>
      </div>
      
      <footer className="app-footer"> <span>WIM &copy; 2021. &nbsp;<a href="https://github.com/animatrons/wimsical"><FontAwesomeIcon icon={faGithub} style={{color: 'gray'}}/></a> </span> </footer>
    </div>
    </Router>
  );
}

export default App;
