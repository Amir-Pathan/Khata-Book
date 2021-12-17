import React,{useState,useEffect} from 'react'
import Login from './login'
import CreateAccount from './createaccount'
import {AccessUser} from '../redux'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

function Autentication(){

    const [login,setLogin] = useState(true)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        const chk=localStorage.getItem('loggedIn')

    if(chk){
      dispatch(AccessUser(chk))
      navigate('/home')
    }
    },[])
  

    const createpage=()=>{
        setLogin(false)
    }

    const loginPage=()=>{
        setLogin(true)
    }
 
    return(
        <div>
        <div className='cntrl'>
            <h5 className='login' className={login?'color':null} onClick={loginPage}>Login</h5>
            <h5 className='create' className={login?null:'color'} onClick={createpage}>Create Account</h5>
        </div>
        <div className='autentication-box'>
            { 
                login?
                    <Login/>:
                    <CreateAccount/>
            }
        </div>
    </div>
    )
}

export default Autentication