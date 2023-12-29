import React, { useEffect } from 'react'
import './ProductPage.css'
import { useParams } from 'react-router-dom'

import { formatPrice } from '../lib'

const ProductPage = ({ inventory, setInventory, loadInventory }) => {
  const { productId } = useParams()

  const product = inventory.find(item => item.id === productId)

  const postScrape = async () => {
    try{
      const res = await fetch("http://localhost:8000/api/scraper/" + productId)

      const json = await res.json()

      console.log(json)

      await loadInventory()
    }catch(err){
      console.log(err)
    }
  }

  return (
    <>
      <div className="product-header">
        <h1>{product && product.name}</h1>

        <div>
          <a href={product ? product.url : ""} target="_blank">Cardmarket</a>
        </div>
      </div>
      

      <button type="button" onClick={postScrape} className="button1">
        Scrape Price
      </button>

      

      <div className="price-history">
        <div className="price-history-row">
          <span className="headline">Date</span>
          <span className="headline text-center">Amount</span>
          <span className="headline text-center">Price</span>
        </div>
        {product && product.price.map((price, idx) => (
          <div className="price-history-row" key={`price-history-row-${idx}`}>
            <span>{price.date}</span>
            <span className="text-center">{price.amount}</span>
            <span className="text-center">{formatPrice(price.price)}</span>
          </div>
        ))}
      </div>
    </>
  )
}

export default ProductPage