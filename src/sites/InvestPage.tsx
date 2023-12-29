import React from 'react';

import { useParams, Link } from 'react-router-dom';

const InvestPage = ({ investments, setInvestments, loadInvestments }) => {
  const { investId } = useParams()
  const product = investments.find(item => item.id === investId)

  return (
    <>
      <h1>{product && product.name}</h1>
      <Link to="/invest">Back</Link>
    </>
  )
}

export default InvestPage