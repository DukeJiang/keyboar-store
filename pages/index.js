import React from 'react';

import { client } from '../lib/client'; //client handles sanity client credientials
import { Product, FooterBanner, HeroBanner } from '../components';

const Home = ({ products, bannerData }) => (
  <div>
    {/* if banner data exist, pass in the first obj in bannerData */}
    <HeroBanner heroBanner={bannerData.length && bannerData[0]}  />
    <div className="products-heading">
      <h2>Best Seller Products</h2>
      <p>There are many variations passages</p>
    </div>

    <div className="products-container">
      {products?.map((product) => <Product key={product._id} product={product} />)}
    </div>

    <FooterBanner footerBanner={bannerData && bannerData[0]} />
  </div>
);

// async function that runs to fetch all products and banner products from sanity through sanity client
export const getServerSideProps = async () => {
  const query = '*[_type == "product"]'; //grab all products from sanity dashboard
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}

export default Home;
