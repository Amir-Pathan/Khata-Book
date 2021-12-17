import React,{Component} from 'react'
import {TextField,Button,ButtonGroup} from '@material-ui/core'
import {AiFillCloseCircle} from 'react-icons/ai'
import {connect} from 'react-redux'
import {Update} from '../redux'
import {Link} from 'react-router-dom'

class UpdateBalance extends Component{

    constructor(){
        super()
        this.state={
            amount :''
        }
        this.setAmount=this.setAmount.bind(this)
        this.update=this.update.bind(this)
    }

    setAmount(e){
        this.setState({
            amount:e.target.value
        })
    }

    update(controll){
       if(this.state.amount){
        const amt = Number(this.state.amount)
           if(controll==='plus'){
               this.props.update(amt,this.props.accountNo,this.props.no,controll)
           }
           else{
                  this.props.update(amt,this.props.accountNo,this.props.no,controll)
           }
       }
       else{
           alert('Please Enter Value')
       }
    }

    render(){
        return(
            <>
                <div style={{
                        display:'flex',
                        flexDirection:'row',
                        justifyContent:'flex-end'
                    }}>
                    <Link to={{
                        pathname:'/home'
                    }}>
                         <AiFillCloseCircle size={50} cursor={'pointer'} onClick={this.props.close}/>
                    </Link>
                </div>
                <div style={{
                    marginTop:'40px'
                }}>
                     <TextField type={'number'} fullWidth variant='outlined' label='Enter Amount'
                     value={this.state.amount} onChange={this.setAmount}/>
                </div>
                <div>
                    <ButtonGroup fullWidth color='primary' variant='contained' style={{
                        marginTop:'10px',
                        display:'flex',
                        flexDirection:'column',
                        gap :'10px'
                    }}>
                        <Button onClick={()=>this.update('minize')}>Minize - </Button>
                        <Button onClick={()=>this.update('plus')}>Add + </Button>
                    </ButtonGroup>
                </div>
            </>
        )
    }
}


const mapDispatchToProps=(dispatch)=>{
    return{
       update :(amount,userNo,AccountNo,controll)=> dispatch(Update(amount,userNo,AccountNo,controll))
    }
}

export default connect(null,mapDispatchToProps)(UpdateBalance)