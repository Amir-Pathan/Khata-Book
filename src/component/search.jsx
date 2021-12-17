import React,{useRef,useState,useEffect} from 'react'
import {TextField} from '@material-ui/core'
import SearchList from './searchlist'
import {BiArrowBack} from 'react-icons/bi'
import {useNavigate} from 'react-router-dom'

function Search(){

    const navigate = useNavigate()

    const [value,setValue] = useState('')
    const ref = useRef(null)
    useEffect(()=>{
        ref.current.focus()
        console.log('foc');
    },[])

    const valueHandler=function(e){
        setValue(e.target.value)
        console.log(e.target.value);
    }

    const home=()=>{
        navigate('/')
    }
    
    return(
        <>
        <div className='search'>
            <BiArrowBack size={40} cursor={'pointer'} onClick={home}/>
            <TextField type={'number'} label='Enter No to Search' ref={ref} value={value}
            onChange={valueHandler} className='field'/> 
        </div>
        <SearchList value={value}/>
        </>
    )
}

export default Search