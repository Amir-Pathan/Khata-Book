import React,{useEffect, useState} from 'react'
import {TextField,Button,ButtonGroup,Typography} from '@material-ui/core'
import {AccessUser,NewCustommer} from '../redux'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

function NewKhata(){

    const [name,setName] = useState('')
    const [no,setNo] = useState('')
    const [email,setEmail] = useState('')

    const [noValid,setNoValid] = useState('')
    const [nameValid,setNameValid] = useState('')

    const nameHandler=(e)=>{
        setName(e.target.value)
    }

    const data = useSelector(state=>state.user)
    const dispatch=useDispatch()

    const navigate=useNavigate()

    const noHandler=(e)=>{
        setNo(e.target.value)
        if(e.target.value.length>10){
            setNoValid('Enter Valid No')
        }
        else{
            setNoValid('')
        }
    }

    const emailHandler=(e)=>{
        setEmail(e.target.value)
    }

    useEffect(()=>{
        const n= localStorage.getItem('loggedIn')
             dispatch(AccessUser(n))
    },[])

    const submit=()=>{
         if(name.length<4||no.length!=10){
             if(name.length<4){
                 setNameValid('Name Must Be In four Charecters')
             }
             else{
                 setNameValid('')
             }
             if(no.length!=10){
                 setNoValid('Invalid No')
             }
             else{
                 setNoValid('')
             }
         }
         else{
             console.log(data);
             if(data.data.length>0){
                const index= data.data.findIndex((i)=>{
                     return i.no===no
                 })
                 if(index===-1){
                    const n =localStorage.getItem('loggedIn')
                    dispatch(NewCustommer(n,{
                        name,no,email,bal:0
                    }))
                    navigate('/home')
                 }
                 else{
                    alert('No AvailAble')
                 }
             }
             else{
                const n =localStorage.getItem('loggedIn')
                    dispatch(NewCustommer(n,{
                        name,no,email,bal:0
                    })) 
                    navigate('/home')
             }
         }
    }

    const home=()=>{
        navigate('/home')
    }

    return(
       <div className='newAccount'>
           <Typography variant='h4' className='center'>Enter Custommer Details</Typography>
           <TextField required fullWidth label='Enter custommer name' variant="outlined" size='small'
           value={name} onChange={nameHandler} />
           <Typography variant='p' className='red'>{nameValid}</Typography>
           <TextField required fullWidth label='Enter custommer no' variant="outlined" size='small' 
           value={no} onChange={noHandler} type='number'/>
           <Typography variant='p' className='red'>{noValid}</Typography>
           <TextField fullWidth label='Enter custommer email' variant="outlined" size='small'
           value={email} onChange={emailHandler} />
           <ButtonGroup size='small' fullWidth variant='contained' color='primary' style={{
               display:'flex',
               flexDirection:'column',
               gap :'10px'
           }}>
               <Button onClick={home}>Cancell</Button>
               <Button onClick={submit}>Save</Button>
           </ButtonGroup>
       </div>
    )
}

export default NewKhata 