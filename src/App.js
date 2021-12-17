import React,{ useEffect } from 'react';
import './App.css';
import Autentication from './component/autentication';
import store from './redux/store';
import {Provider} from 'react-redux'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Header from './component/header';
import NewKhata from './component/newKhata';
import UserDetails from './component/userDetails';
import Search from './component/search';

function App() {

  useEffect(()=>{

    const account=[]

    const check=localStorage.getItem('account')
    if(check===null){
      localStorage.setItem('account',JSON.stringify(account))
    }

  },[])

  return (
    <div>
       <Provider store={store}>
         <Router>
          <Routes>
            <Route path='/' element={<Autentication/>}/>
            <Route path='/home' element={<Header/>}/>
            <Route path='/newAccount' element={<NewKhata/>}/>
            <Route path='/user' element={<UserDetails/>}/>
            <Route path='/search' element={<Search/>}/>
          </Routes>
         </Router>
       </Provider>
    </div>
  );
}

export default App;
