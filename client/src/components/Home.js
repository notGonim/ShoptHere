import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../redux/products/product-actions'
import { MetaData } from './layouts/MetaData'
import { Product } from './product/Product'



export const Home = () => {

  const dispatch = useDispatch()
  const { loading, products, errors, productsCount } = useSelector(state => state.products)


  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])



  return (
    <>
      {loading ? <h1>Loading...</h1> : (
        <div classNameName="container container-fluid">
          <MetaData title={"Buy Best Products Online"} />
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {products && products.map(product => (
                <Product key={product._id} product={product} />
              ))}

            </div>
          </section>
        </div>
      )}
    </>
  )
}
