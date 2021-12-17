import {ADD_ACCOUNT,ACCESS,ACCOUNT, NEW_ACCOUNT, USER} from './createAction'

export function addAccount(payLoad){
    return{
        type : ADD_ACCOUNT,
        payLoad:payLoad
    }
}

export function Access(payLoad){
    return{
        type:ACCESS,
        payLoad :payLoad
    }
}

export function Account(payLoad){
    return{
        type:ACCOUNT,
        payLoad
    }
}

export function User(){
    return{
        type:USER
    }
}


export function accountPush(e){
    const account=localStorage.getItem('account')
    const ac= JSON.parse(account)
    ac.push(e)
    return dispatch=>{
        dispatch(addAccount(ac))
        localStorage.setItem('account',JSON.stringify(ac))
    }
}

export function AccessAccount(){
    const account=localStorage.getItem('account')
    const ac= JSON.parse(account)
    return dispatch=>{
        dispatch(Access(ac))
    }
}

export function AccessUser(no){
    const accounts= localStorage.getItem('account')
    const list = JSON.parse(accounts)||[]
    const index=list.findIndex((i)=>{
        return i.no===no
    })
    console.log('hire');
    console.log(index);
    return dispatch=>{
        dispatch(Account(list[index]))
    }
}

export function NewCustommer(no,data){
    const dat = localStorage.getItem('account')
    const pr= JSON.parse(dat)
    const index = pr.findIndex((i)=>{
        return i.no===no
    })
    pr[index].data.push(data)
    localStorage.setItem('account',JSON.stringify(pr))
    return dispatch=>{
        dispatch(AccessUser(no))
    }
}

export const Update = (amount,AccountNo,userNo,controll)=>{
    console.log('hire');
    console.log(userNo);
    console.log(AccountNo);
    const accounts= localStorage.getItem('account')
    const list = JSON.parse(accounts)||[]
    const accountIndex= list.findIndex(i=>{
        return i.no===AccountNo
    })
    if(accountIndex>=0){
        
    const indx = list[accountIndex].data.findIndex(i=>{
        return i.no===userNo
    })
     
    const pr = Number(list[accountIndex].data[indx].bal)
    if(controll==='plus'){
        list[accountIndex].data[indx].bal=pr+amount
        console.log(list[accountIndex].data[indx].bal);
        alert(`Total Balance : ${list[accountIndex].data[indx].bal}`)
    }else{
        list[accountIndex].data[indx].bal=pr-amount
        console.log(list[accountIndex].data[indx].bal);
        alert(`Total Balance : ${list[accountIndex].data[indx].bal}`)
    }
    

    console.log(list[accountIndex].data[indx].bal);
    
    }
    console.log(accountIndex);
    return dispatch=>{
        dispatch(addAccount(list))
        localStorage.setItem('account',JSON.stringify(list))
    }
}