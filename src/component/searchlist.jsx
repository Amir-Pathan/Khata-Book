import React,{useEffect,useState} from 'react'
import {AccessUser} from '../redux'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

function SearchList(props){

    const [list,setList] = useState([])
    const [no,setNo] = useState('')

    const {value} = props

    const data = useSelector(state=>state.user)
    const dispatch = useDispatch()

    const navigate= useNavigate()

    useEffect(()=>{
        const n = localStorage.getItem('loggedIn')
        setNo(n)
        dispatch(AccessUser(n))
        console.log(data.data);
        if(value>0){
            const search = data.data.filter(i=>{
                return i.no.includes(value)
            })
            console.log(search);
            setList(search)
        }
    },[value])

    const details=(user)=>{
        sessionStorage.setItem('user',JSON.stringify({
            no,
            user
        }))
        navigate('/user')
    }

    return(
        <div>
            {
                !value?
                    <h1 className='center'>Please Enter No</h1>:
                 list.length>0?
                 list.map(i=>{
                     return <div key={i.no} style={{paddingLeft:'10px',borderBottom:'1px solid black',cursor:'pointer'}}
                     onClick={()=>details(i)}>
                           <h2>{i.name}</h2>
                     </div>
                 }):
                 <h1 className='center'>Not Found</h1>
            }
        </div>
    )
}

export default SearchList