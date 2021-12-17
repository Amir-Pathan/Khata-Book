import React, { useState,useEffect } from 'react'
import {TextField,Button} from '@material-ui/core'
import {useDispatch,useSelector} from 'react-redux'
import {accountPush,AccessAccount} from '../redux'
import {useNavigate} from 'react-router-dom'

function CreateAccount(){

    const [name,setName] = useState('')
    const [no,setNo]=useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [rePassword,setRePassword] = useState('')

    // VALIDATION MESSAGE

    const [nameValid,setNameValid] = useState('')
    const [noValid,setNoValid] = useState('')
    const [passwordValid,setPasswordValid] = useState('')
    const [passwordRule,setPasswordRule] = useState('')

    const navigate=useNavigate()

    const data = useSelector(state=>state.account)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(AccessAccount())
        console.log(data);
    },[])

    const nameHandler=(e)=>{
        setName(e.target.value)
        if(nameValid){
            if(e.target.value>4){
                nameValid('')
            }
        }
    }

    const noHandler=(e)=>{
        setNo(e.target.value)
        if(noValid){
            if(e.target.value.length===10){
                setNoValid('')
            }
        }
    }

    const emailHandler=(e)=>{
        setEmail(e.target.value)
    }

    const passwordHandler=(e)=>{
        setPassword(e.target.value)

        const n = /\d/g;
        const sp=/[!@#$%&*]/g;

        if(!e.target.value||e.target.value.length<8){
            setPasswordRule('password length must be in 8 char')
        }
        else if(!n.test(e.target.value)){
            setPasswordRule('minimum 1 No Require')
        }
        else if(!sp.test(e.target.value)){
            setPasswordRule('1 Special char required')
        }
        else{
            setPasswordRule('')
        }
    }

    const rePasswordHandler=(e)=>{
        setRePassword(e.target.value)
    }

    const submit=()=>{
        if(name.length<5||no.length!=10||password!==rePassword){
            if(name.length<5){
                setNameValid('Enter Name Greater Than 4 charecters')
            }
            else{
                setNameValid('')
            }
            if(no.length!==10){
                setNoValid('Enter Valid No')
            }
            else{
                setNoValid('')
            }
            if(password!==rePassword){
                setPasswordValid('Password Not Match')
            }
            else{
                setPasswordValid('')
            }
        }
        else{
            const obj ={name,no,email,password,data:[]}
            if(data.length===0){
                dispatch(accountPush(obj))
                alert('Account Created SuccessFully Login')
                localStorage.setItem('loggedIn',no)
                navigate('/home')
            }
            else{
                const index=data.findIndex(i=>{
                    return i.no===no
                })
                if(index!==-1){
                    alert('No Available')
                }
                else{
                    localStorage.setItem('loggedIn',no)
                    dispatch(accountPush(obj))
                    navigate('/home')
                }
            }
        }
    }

    return(
        <>
           <TextField variant='outlined' size='small' label='Enter Name' fullWidth required
           value={name} onChange={nameHandler}/>
           <p className='notValid'>{nameValid}</p>
           <TextField variant='outlined' size='small' label='Enter No' fullWidth required
           value={no} onChange={noHandler}/>
           <p className='notValid'>{noValid}</p>
           <TextField variant='outlined' size='small' label='Enter email' fullWidth
           value={email} onChange={emailHandler}/>
           <p className='notValid'></p>
           <TextField variant='outlined' size='small' label='Enter password' fullWidth
           value={password} onChange={passwordHandler}/>
           <p className='notValid'>{passwordRule}</p>
           <TextField variant='outlined' size='small' label='Re-Enter Password' fullWidth
           value={rePassword} onChange={rePasswordHandler}/>
           <p className='notValid'>{passwordValid}</p>
           <Button variant='contained' cursor='pointer' color='primary' onClick={submit}>Create-Account</Button>
        </>
    )
}

export default CreateAccount