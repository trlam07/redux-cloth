import Axios  from 'axios';
import React, { useEffect } from 'react'
import {useParams} from 'react-router-dom'
import { PRODUCT_URL } from '../constants';
import {useDispatch, useSelector} from 'react-redux'
import { removeSelectedProduct, selectProduct } from '../redux/actions/productAction';


const ProductDetail = () => {
  const dispatch = useDispatch();
  const {product} = useSelector(state => state.allProducts)
  const {productId} = useParams();
  console.log('productId:', productId)

  const fetchProductDetail = async (id) => {
    try {
      const {data} = await Axios.get(`${PRODUCT_URL}/${id}`)
      console.log('product details:', data)
      dispatch(selectProduct(data))
    } catch (error) {
      console.log('error:', error)
    }
  }

  useEffect(() => {
    if (productId && productId !== '')
    fetchProductDetail(productId)

    return () => {dispatch(removeSelectedProduct())}
  }, [productId])

  return (
    <div>
      {
        Object.keys(product).length === 0 ? (<div>Loading...</div>) : (<div style={{
          display: 'flex',
          gap: 10
        }}>
          <div style={{
            flex: 1,
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <img style={{
              width: 500,
              height: 500,
            }} src= {product?.image} alt="" />
          </div>

          <div style={{
            flex: 1,
          }}>
            <h1>{product?.title}</h1>
            <p>{product?.price} $</p>
            <p>{product?.description}</p>
            <button>Add to cart</button>
          </div>
        </div>)
      }
    </div>
  )
}

export default ProductDetail