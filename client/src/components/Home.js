import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../redux/products/product-actions'
import { Loader } from './layouts/Loader'
import { MetaData } from './layouts/MetaData'
import { Product } from './product/Product'
import Pagination from "react-js-pagination";


export const Home = ({match}) => {

  const dispatch = useDispatch()
  const { loading, products, error, productsCount, resPerPage } = useSelector(state => state.products)
  const alert = useAlert();
  const [currentPage, setCurrPage] = useState(1)

  const keyword = match.params.keyword

  const setCurrentPageNo = (pageNo) => {
    setCurrPage(pageNo)
  }

  useEffect(() => {
    if (error) {
      return alert.error(error)
    }
    dispatch(getProducts(keyword,currentPage))
  }, [dispatch, error, alert, currentPage])



  return (
    <>
      {loading ? <Loader /> : (
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

          {resPerPage <= productsCount && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination activePage={currentPage} itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount} onChange={setCurrentPageNo} nextPageText={'Next'} prevPageText={'Prev'}
                firstPageText={'First'}
                lastPageText={'Last'}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </div>
      )}
    </>
  )
}
