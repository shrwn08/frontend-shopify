import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/slices/productSlice';

function ProductList() {
  const {products,loading,error} = useSelector(state=>state.products);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getProducts());
  },[dispatch])

  if(loading)return <p>loading... </p>
  if(error)return <p>{error.message}</p>

  console.log(products)
  return (
    <div>
      {products.map((product)=>(
        <div key={product._id}>
          <p>{product.name}</p>
        </div>
      ))}
    </div>
  )
}

export default ProductList