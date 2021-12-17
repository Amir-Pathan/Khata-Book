import React,{Component} from 'react'
import {Button} from '@material-ui/core'
import Modal from 'react-modal'
import UpdateBalance from './balanceUpdate'
import {BiArrowBack} from 'react-icons/bi'
import {Link} from 'react-router-dom'

Modal.setAppElement('#root')


class UserDetails extends Component{

    state={
        data :{},
        open: false
    }

    componentDidMount(){
        const ur = sessionStorage.getItem('user')
        const user = JSON.parse(ur)||{}
        console.log(user);
        this.setState({
            data : user
        })
    }

    open(){
        this.setState({
            ...this.state,
            open : true
        })
    }

    close(){
        this.setState({
            ...this.state,
            open :false
        })
    }

    render(){
        let st = this.state.data.user
        return(
            <>
               <Link to={{pathname:'/home'}}> 
                    <BiArrowBack size={50} cursor={'pointer'}/>
               </Link>
               {
                   this.state.data.user?
                      <div className='user'>
                        <Modal isOpen={this.state.open}>
                            <UpdateBalance close={this.close.bind(this)} no={st.no} accountNo={this.state.data.no}/>
                         </Modal>
                          <div>
                              <h3>Name : {st.name}</h3>
                              <h3>No : {st.no}</h3>
                          </div>
                          <div>
                              <h3>Email : {st.email}</h3>
                              <h3>Balance : {st.bal}Rs</h3>
                          </div>
                          <Button color='primary' variant='contained'fullWidth onClick={this.open.bind(this)}>Update Balance</Button>
                      </div>:
                      null
               }
            </>
        )
    }
}

export default UserDetails