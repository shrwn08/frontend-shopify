import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../redux/slices/productSlice';

const ProductDetails = () => {
  const id = useParams();
  const {products,error, loading} = useSelector(state=>state.products)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getProductDetails({id}));
  },[dispatch, id])
  console.log(products)
  return (
    <div>
      Product ProductDetails
    </div>
  )
}

export default ProductDetails;