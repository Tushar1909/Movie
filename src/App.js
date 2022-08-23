import React from 'react';
//Routing
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// styles
import {GlobalStyle} from './GlobalStyle';

//components
import Header from './components/Header';
import Home from './components/Home';
import Movie from './components/Movie';
import Nomovie from './components/Nomovie';

const App= ()=> (
    <Router>
        <Header/>
        <Routes>
          <Route path='/' element={ <Home/>}/>
          <Route path='/:movieid' element={ <Movie/>}/>
          <Route path='/*' element={ <Nomovie/>}/>

        </Routes>
        <GlobalStyle/>
    </Router>
)

export default App;
