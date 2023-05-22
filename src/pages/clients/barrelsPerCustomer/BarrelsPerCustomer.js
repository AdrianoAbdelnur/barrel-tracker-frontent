import React, { useEffect, useState } from 'react'
import "./barrelsPerCustomer.css"
import axios from 'axios'
import { Button, Table } from 'react-bootstrap'
import DetailsModal from './DetailsModal'
import TableBarrels from './TableBarrels'


const BarrelsPerCustomer = () => {
  const [customersData, setCustomersData] = useState([])
  const [barrels, setBarrels] = useState([])
  const [flag, setFlag] = useState(false)
  
  
useEffect(() => {
  if(customersData.length === 0) handleGetCustomers();
  if(barrels.length === 0) handleGetBarrels();
}, [])


const handleGetBarrels = async() => {
  try {
    const {data} = await axios("http://localhost:4000/api/barrel/getBarrels")
    setBarrels(data.barrelsFound)
  } catch (error) {
      console.log(error)
  }
}

const handleGetCustomers = async() =>{
  try {
      const {data} = await axios("http://localhost:4000/api/client/getClients")
      setCustomersData(data.clientsList)
  } catch (error) {
      console.log(error)
  }
}



  return (
    (barrels.length  && customersData.length)? 
      <TableBarrels
        customersData={customersData}
        setCustomersData={setCustomersData}
        barrels={barrels}
      /> :
      <>loading...</>
   )
  }

export default BarrelsPerCustomer