import { useEffect, useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import {db} from './firebase';
import './App.css';

import Dashboard from './sites/Dashboard'
import ProductPage from './sites/ProductPage';
import Invest from './sites/Invest';
import InvestPage from './sites/InvestPage';

function App() {
  const [inventory, setInventory] = useState([])
  const [investments, setInvestments] = useState([])

  useEffect(() => {
    loadInventory()
    loadInvestments()
  }, [])

  const loadInventory = async () => {   
    try{
      const querySnapshot = await getDocs(collection(db, "inventory"))
                  
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
                
      setInventory(newData)
    }catch(err){
      console.log(err)
    }
  }

  const loadInvestments = async () => {   
    try{
      const querySnapshot = await getDocs(collection(db, "investments"))
                  
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
                
      setInvestments(newData)

      console.log(newData)
    }catch(err){
      console.log(err)
    }
  }

  return (
    <>
      <header className="header">
        <div className="logo-bar">
          <Link to="/">Inventory Manager</Link>
        </div>
        <nav className="nav">
          <div className="nav-items">
            <Link to="/">Dashboard</Link>
            <Link to="/invest">Investments</Link>
          </div>
        </nav>
      </header>
      <main className="main">
        <Routes>
          <Route path="/" element={<Dashboard inventory={inventory} setInventory={setInventory} loadInventory={loadInventory} />} />
          <Route path="/:pageId" element={<Dashboard inventory={inventory} setInventory={setInventory} loadInventory={loadInventory} />} />
          <Route path="/inventory/:productId" element={<ProductPage inventory={inventory} setInventory={setInventory} loadInventory={loadInventory} />} />
          <Route path="/invest" element={<Invest investments={investments} setInvestments={setInvestments} loadInvestments={loadInvestments} />} />
          <Route path="/invest/:investId" element={<InvestPage investments={investments} setInvestments={setInvestments} loadInvestments={loadInvestments} />} />
        </Routes>
      </main>
      <footer className="footer">

      </footer>
    </>
  )
}

export default App
