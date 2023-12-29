import { useEffect, useState } from 'react'
import styles from './Invest.module.css'

import { collection, addDoc, Timestamp, getDocs } from "firebase/firestore";
import { Link } from 'react-router-dom';
import {db} from '../firebase';

import Input from '../components/Input'
import { formatPrice } from '../lib';

const Invest = ({ investments, setInvestments, loadInvestments }) => {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    buyprice: "",
    shipping: "",
    storage: "",
    buyurl: ""
  })

  const addProduct = async (e) => {
    e.preventDefault()

    const checkIfEmpty = Object.keys(formData).some(key => formData[key] === "")

    if(checkIfEmpty) return

    const amount = Number(formData.amount.replace(",", "."))

    const buyprice = Number(formData.buyprice.replace(",", "."))

    const shipping = Number(formData.shipping.replace(",", "."))

    const storage = Number(formData.storage.replace(",", "."))

    if(isNaN(amount) || isNaN(buyprice) || isNaN(shipping) || isNaN(storage)) return

    try {
      const docRef = await addDoc(collection(db, "investments"), {
        name: formData.name,
        amount,
        buyprice,
        shipping,
        storage
      })

      console.log("Document written with ID: ", docRef.id)

      await loadInvestments()
    } catch (e) {
      console.error("Error adding document: ", e)
    }

    setFormData({
      name: "",
      amount: "",
      buyprice: "",
      shipping: "",
      storage: "",
      buyurl: ""
    });
  }
  
  return (
    <>
      <h1>Investment Inventory</h1>

      <div className="toolbar">
        <button
          type="button"
          id="add-product-btn"
          className="button1"
          onClick={(e) => setShowForm(!showForm)}
        >
          Add Product
        </button>
      </div>

      <div className={styles.formWrapper}>
        <form 
          className={showForm ? `${styles.form} ${styles.changeHeight}` : `${styles.form}`}
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
            label="Amount" 
            id="add-product-amount" 
            size="small" 
            value={formData.amount} 
            handler={(e) => setFormData({...formData, amount: e.target.value})}
          />
          <Input 
            label="Buy Price" 
            id="add-product-buy-price" 
            size="small" 
            value={formData.buyprice} 
            handler={(e) => setFormData({...formData, buyprice: e.target.value})}
          />
          <Input 
            label="Shipping Cost" 
            id="add-product-shipping" 
            size="small" 
            value={formData.storage} 
            handler={(e) => setFormData({...formData, storage: e.target.value})}
          />
          <Input 
            label="Storage Cost" 
            id="add-product-storage" 
            size="small" 
            value={formData.shipping} 
            handler={(e) => setFormData({...formData, shipping: e.target.value})}
          />
          <Input 
            label="Buy URL" 
            id="add-product-url" 
            size="normal" 
            value={formData.buyurl} 
            handler={(e) => setFormData({...formData, buyurl: e.target.value})}
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

      <div className={styles.products}>
        <div className={styles.product}>
          <span className="text-center headline">Amount</span>
          <span className="headline">Product Name</span>
          <span className="text-center headline">Buy Price</span>
          <span className="text-center headline">Total Price</span>
        </div>
        {investments.map((item, idx) => (
          <div className={styles.product} key={`invest-product-${idx}`}>
            <span className="text-center">{item.amount}</span>
            <span><Link to={`/invest/${item.id}`}>{item.name}</Link></span>
            <span className="text-center">{formatPrice(item.buyprice)}</span>
            <span className="text-center">{formatPrice(item.buyprice * item.amount)}</span>
          </div>
        ))}

        <div className={styles.product}>
          <span></span>
          <span></span>
          <span>Summe:</span>
          <span className="text-center headline">
            {investments.length > 0 && formatPrice(investments.reduce((a, item) => a + (item.amount * item.buyprice), 0))}
          </span>
        </div>
      </div>
    </>
  )
}

export default Invest