import { useState, useEffect } from 'react'
import './Dashboard.css'

import { collection, addDoc, Timestamp, getDocs } from "firebase/firestore";
import {db} from '../firebase';
import { Link, useParams } from 'react-router-dom';

import Input from '../components/Input'


const Dashboard = ({ inventory, setInventory, loadInventory }) => {
  const params = useParams()

  const pageId = Number(params.pageId) > Math.ceil(inventory.length / 10) ? Math.ceil(inventory.length / 10) : Number(params.pageId) || 1

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    url: ""
  })

  const startIndex = (pageId - 1) * 10;
  const endIndex = pageId * 10;
  const displayedItems = inventory.slice(startIndex, Math.min(endIndex, inventory.length));

  const addProduct = async (e) => {
    e.preventDefault()

    if(formData.name === "" || formData.url === "") return

    try {
      const docRef = await addDoc(collection(db, "inventory"), {
        ...formData,
        price: []
      })

      console.log("Document written with ID: ", docRef.id)

      loadInventory()
    } catch (e) {
      console.error("Error adding document: ", e)
    }

    setFormData({
      name: '',
      url: '',
    });
  }

  const handleScrapeAll = async () => {
    const res = await fetch("http://localhost:8000/api/scraper/")
    const json = await res.json()

    console.log(json)
    loadInventory()
  }

  return (
    <>
      <h1>Dashboard</h1>

      <div className="toolbar">
        <button
          type="button"
          id="add-product-btn"
          className="button1"
          onClick={(e) => setShowForm(!showForm)}
        >
          Add Product
        </button>
        <button type="button" className="button1" onClick={handleScrapeAll}>
          Scrape All
        </button>
      </div>
      <div className="form-container">
        <form 
          className={showForm ? "add-product-form change-height" : "add-product-form"}
          onSubmit={addProduct}
        >
          <Input 
            label="Name" 
            id="add-product-name" 
            size="normal" 
            value={formData.name} 
            handler={(e) => setFormData({...formData, name: e.target.value})}
          />
          <Input 
            label="Url" 
            id="add-product-url" 
            size="normal" 
            value={formData.url} 
            handler={(e) => setFormData({...formData, url: e.target.value})}
          />
          <button
            type="submit"
            id="add-product-submit-btn"
            className="button1"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="inventory-list">
        {displayedItems.map((product, idx) => (
          <div className="product-row" key={`product-row-${idx}`}>
            <span><Link to={`/inventory/${product.id}`}>{product.name}</Link></span>
            <span><a href={product.url} target="_blank">Cardmarket</a></span>
          </div>
        ))}
      </div>
      <div className="page-buttons">
        {Array(Math.ceil(inventory.length / 10)).fill(null).map((link, idx) => {
          if((idx + 1) === pageId){
            return(
              <span className="page-number" key={`page-button-${idx}`}>
                {idx + 1}
              </span>
            )
          }else{
            return(
              <Link to={`/${idx + 1}`} key={`page-button-${idx}`}>
                {idx + 1}
              </Link>
            )
          }
        })}
      </div>
    </>
  )
}

export default Dashboard