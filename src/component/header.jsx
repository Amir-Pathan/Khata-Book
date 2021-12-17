import React, { Component } from 'react'
import { connect } from 'react-redux' 
import {AccessUser} from '../redux'
import {AiOutlinePlusCircle} from 'react-icons/ai'
import {FaSearch} from 'react-icons/fa'
import {BiLogOutCircle} from 'react-icons/bi'
import {IconContext} from 'react-icons'
import {Link} from 'react-router-dom'
import ListUser from './accounts'

class Header extends Component{

    constructor(){
        super()
        this.state={
            search : false,
            plus :false,
            log:false
        }
        this.color=this.color.bind(this)
        this.blackColor=this.blackColor.bind(this)
    }

    componentDidMount(){
        const no = localStorage.getItem('loggedIn')
        this.props.userAccount(no);
    }

    color(cntrl){
        if(cntrl==='search'){
            this.setState({
                ...this.state,
                search:true
            })
        }
        if(cntrl==='plus'){
            this.setState({
                ...this.state,
                plus:true
            })
        }
        if(cntrl==='logout'){
            this.setState({
                ...this.state,
                log:true
            })
        }
    }

    blackColor(cntrl){
        if(cntrl==='search'){
            this.setState({
                ...this.state,
                search:false
            })
        }
        if(cntrl==='plus'){
            this.setState({
                ...this.state,
                plus:false
            })
        }
        if(cntrl==='logout'){
            this.setState({
                ...this.state,
                log:false
            })
        }
    }

    logout(){
        localStorage.setItem('loggedIn','')
    }



    render(){
        return(
            <>
            <div className='header'>
            <div>
                <h3>Khata-Book</h3> 
            </div>
            <div className='icons'>
                <IconContext.Provider value={{color :'black',size:'30px'}}>
                    <Link to={{pathname:"/search"}}>
                         <FaSearch cursor='pointer' color={this.state.search?'white':null} 
                         onMouseOver={()=>this.color('search')} onMouseOut={()=>this.blackColor('search')}/>
                    </Link>
                    <Link to={{pathname:'/newAccount'}}>
                         <AiOutlinePlusCircle cursor='pointer' color={this.state.plus?'white':null}
                         onMouseOver={()=>this.color('plus')} onMouseOut={()=>this.blackColor('plus')}/>
                    </Link>
                    <Link to={{
                        pathname:'/'
                    }}>
                        <BiLogOutCircle cursor='pointer' onClick={this.logout} color={this.state.log?'white':null}
                        onMouseOver={()=>this.color('logout')} onMouseOut={()=>this.blackColor('logout')}/>
                    </Link>
                </IconContext.Provider>
            </div>
            </div>
            <ListUser list={this.props.user}/>
            </>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        user : state.user
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        userAccount : (no)=>dispatch(AccessUser(no))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header)