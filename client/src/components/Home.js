import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../redux/products/product-actions'
import { Loader } from './layouts/Loader'
import { MetaData } from './layouts/MetaData'
import { Product } from './product/Product'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
import Pagination from "react-js-pagination";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)



export const Home = ({ match }) => {

  const dispatch = useDispatch()
  const { loading, products, error, productsCount, resPerPage } = useSelector(state => state.products)
  const alert = useAlert();
  const [currentPage, setCurrPage] = useState(1)

  const [price, setPrice] = useState([1, 1000])


  const keyword = match.params.keyword

  const setCurrentPageNo = (pageNo) => {
    setCurrPage(pageNo)
  }

  useEffect(() => {
    if (error) {
      return alert.error(error)
    }
    dispatch(getProducts(keyword, currentPage, price))
  }, [dispatch, error, alert, currentPage, price])



  return (
    <>
      {loading ? <Loader /> : (
        <div classNameName="container container-fluid">
          <MetaData title={"Buy Best Products Online"} />
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">

              {keyword ? (
                <>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <Range
                        marks={{
                          1: `$1`,
                          1000: `$1000`
                        }}
                        min={1}
                        max={1000}
                        defaultValue={[1, 1000]}
                        tipFormatter={value => `$${value}`}
                        tipProps={{
                          placement: "top",
                          visible: true
                        }}
                        value={price}
                        onChange={price => setPrice(price)}
                      />

                    </div>
                  </div>
                  <div className="col-6  col-md-9">
                    <div className="row">
                      {products.map(product => (
                        <Product key={product._id} product={product}  col={4} />
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                products.map(product => (
                  <Product key={product._id} product={product} col={3}/>
                ))
              )}


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
