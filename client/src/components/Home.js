import React from 'react'
import { MetaData } from './layouts/MetaData'

export const Home = () => {
  return (
    <div classNameName="container container-fluid">
      <MetaData title={"Buy Best Products Online"} />
      <h1 id="products_heading">Latest Products</h1>

      <div className="col-sm-12 col-md-6 col-lg-3 my-3">
        <div className="card p-3 rounded">
          <img
            className="card-img-top mx-auto"
            src="https://m.media-amazon.com/images/I/61B04f0ALWL._AC_UY218_.jpg"
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">
              <a href=""
              >Wyze Cam 1080p HD Indoor Wireless Smart Home Camera Wyze Cam 1080p HD Indoor Wireless Smart Home Camera</a
              >
            </h5>
            <div className="ratings mt-auto">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-half-o"></i>
              <i className="fa fa-star-o"></i>
              <span id="no_of_reviews">(5 Reviews)</span>
            </div>
            <p className="card-text">$965.67</p>
            <a href="#" id="view_btn" className="btn btn-block">View Details</a>
          </div>
        </div>
      </div>
    </div>
  )
}
