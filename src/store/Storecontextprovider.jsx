import React, { createContext, useState } from 'react'

export const Storecontext=createContext();

const Storecontextprovider = ({children}) => {
    const [cart,setcart]=useState([])
    const [orders,setOrders]=useState([])
    const [custdata,setcustData]= useState({name:'',number:'',address:''})
  return (
    <Storecontext.Provider value={{cart,setcart,custdata,setcustData,orders,setOrders}}>
      {children}      
    </Storecontext.Provider>
  )
}

export default Storecontextprovider
