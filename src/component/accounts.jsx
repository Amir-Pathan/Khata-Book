import { Typography,Avatar } from '@material-ui/core';
import React from 'react'
import {useNavigate} from 'react-router-dom'

function ListUser(props){
 
    const {list} = props;

    const navigate= useNavigate()

    const userDetails=(user)=>{
        let no = list.no
        sessionStorage.setItem('user',JSON.stringify({
            no,
            user
        }))
        navigate('/user')
    }

    const colors =['blue','grey','orange','purple']

    return(
        <div>
            {
                list.data?
                list.data.map((i,index)=>{
                    const icon = i.name.split(' ')
                    const first = icon[0].split('')
                    let secound='';
                    if(icon.length>1){
                        secound = icon[1].split('')
                    }
                    let indx = 0;
                    index=index+1;
                    if(index%2===0&&index%4===0){
                        indx=indx+3
                    }
                    if(index%2===0){
                        indx=indx+1
                    }
                    if(index%3===0){
                        indx=indx+2
                    }
                    
                    return(
                        <div key={i.no} className='items' onClick={()=>userDetails(i)}>
                            <Avatar style={{
                                height:'40px',
                                width:'40px',
                                backgroundColor:colors[indx]
                            }} >{first[0]}{secound[0]}</Avatar>
                            <h3>{i.name}</h3>
                        </div>
                    )
                }):
                <Typography variant='h3'>List Empty</Typography>
            }
        </div>
    )
}

export default ListUser