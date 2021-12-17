import React,{useState,useEffect} from 'react'
import {TextField,Button} from '@material-ui/core'
import {AccessAccount, AccessUser} from '../redux'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

function Login(){

    const [no,setNo] = useState('')
    const [password,setPassword] = useState('')

    const history = useNavigate()

    const noHandler=(e)=>{
        setNo(e.target.value)
    }

    const passwordHandler=(e)=>{
        setPassword(e.target.value)
    }

    const dispatch = useDispatch()
    const data = useSelector(state=>state.account)

    useEffect(()=>{
        dispatch(AccessAccount())
        console.log(data);
    },[])

    const valid=()=>{
        const indx=data.findIndex(i=>{
            return i.no===no
        })
        if(indx===-1){
            alert('Invalid User No')
        }
        else{
            if(data[indx].password===password){
              history('/home')
              localStorage.setItem('loggedIn',no)
              dispatch(AccessUser(no))
            }
            else{
                alert('Invalid Password')
            }
        }
    }
    return(
        <>
            <TextField type='number' variant='outlined' size='small' label='Enter No' fullWidth
            value={no} onChange={noHandler}/>
            <TextField type='password' variant='outlined' size='small' label='Enter Password' fullWidth
            value={password} onChange={passwordHandler}/>
            <Button variant='contained' cursor='pointer' color='primary' onClick={valid}>Login</Button>
        </>
    )
}

export default Login