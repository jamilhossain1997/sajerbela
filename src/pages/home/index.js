import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
// import Herosection from '../../widgets/herosection/herosection';
import Processstep from '../../widgets/home1/processstep';
// import Newcollection from '../../widgets/home1/newcollection';
// import CommingSoonCounter from '../../widgets/common/counter';
// import Ourproduct from '../../widgets/home1/ourproduct';
// import Newsletter1 from '../../widgets/home1/newsletter1';
// import Productbanner from '../../widgets/home1/productbanner';
// import Clientlogo from '../../widgets/home1/clientlogo';
// import Blogcart from '../../widgets/blog/blogcart';
import Instafeed from '../../widgets/aboutus/instafeed';
// import OurProduct2 from '../../widgets/home1/ourProduct2';
import HomeCatgoryPro from '../../widgets/home1/homeCatgoryPro';

// function Component
import Herosection7 from '../../widgets/herosection/herosection7';
// import Fashiongallery from '../../widgets/home1/fashiongallery';
// import HomeCatPro from '../../widgets/home1/homeCatPro';
import FeaturedProduct from '../../widgets/home1/featuredProduct';
import Brand from '../../widgets/home1/brand';
import LatestProduct from '../../widgets/home1/latestProduct';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import FlashSale from '../../widgets/home1/flashSale';
import Categories from '../../widgets/home1/Categories';
import ShopBanner from '../../widgets/home1/shopBanner';
import MainBanner from '../../widgets/home1/mainBanner';
import { toast, ToastContainer } from 'react-toastify';
import CampaignHistory from '../../widgets/home1/campaignHistory';
import apiClient from '../../api/baseUrl';
// import favicon from '../../../public/favicon.ico'
// import VideoShopping from '../../widgets/home1/videoShopping';


class index extends Component {
  constructor(props) {
    super(props),
      this.state = {
        metaTitle: [],
      }
  }

  componentDidMount() {
    apiClient.get(`v1/metaTitle`)
      .then(res => {
        console.log(res.data)
        const metaTitle = res.data;
        this.setState({ metaTitle });
      })
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }
  render() {
    let { metaTitle } = this.state;

    return (
      <>
        <ToastContainer autoClose={500} />
        <HelmetProvider>
          <Helmet>
            <meta charset="utf-8" />
            <meta
              name="description"
              content="Welcome to the world of women's fashion where style meets comfort. Our online store is your one-stop destination for all the latest fashion trends and must-haves for the modern woman. We believe that fashion should be accessible to everyone, and that's why we bring you an extensive collection of stylish and affordable clothing, footwear, and accessories. From casual everyday outfits to elegant partywear, we have something for every occasion. Whether you're looking for the latest trends or classic staples, we've got you covered. Our collection includes a range of tops, dresses, pants, skirts, and jackets that are perfect for creating endless outfit combinations. You can shop by category or browse our curated collections to find the perfect pieces to suit your personal style. We understand the importance of accessories in completing any look, which is why we offer a wide selection of jewelry, bags, and shoes. Our accessories are designed to complement our clothing, making it easy for you to put together a complete and cohesive outfit. At our online store, we believe in making fashion accessible and affordable, which is why we offer free shipping on all orders. You can shop with confidence, knowing that you're getting high-quality products at unbeatable prices. So what are you waiting for? Browse our collection today and start building your dream wardrobe."
            />
            <meta name="facebook-domain-verification" content="ys1347xan857sapi97hdpyloyb1ppr" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="google-site-verification" content="NYAMigsrqKdF86lEc3XXvRPxLDFosUY7e2MeFmvTep8" />
            <link rel="shortcut icon" href="../../../public/favicon.ico" />
            <meta property="og:image" content="https://admin.sajerbela.com/storage/app/public/company/2023-03-31-6426dc9918aaa.png" />
            <meta property="og:site_name" content="Sajer Bela" />
            <meta
              property="og:url"
              content="https://admin.sajerbela.com/storage/app/public/company/2023-03-31-6426dc9918aaa.png"
            />
            <meta http-equiv='cache-control' content='no-cache' />
            <meta http-equiv='expires' content='0' />
            <meta http-equiv='pragma' content='no-cache' />
            <title>
              Discover the latest fashion trends for women at our online store "Sajer
              Bela". Shop a wide range of clothing, footwear, and accessories with
              attractive discount on all orders. Find your perfe
            </title>

          </Helmet>
          <Herosection7 />

          {/* brand */}
          {/* <section className='p-2 mb-3'>

              <Brand />

            </section> */}
          <section className='p-1'>
            <Categories />
          </section>

          <CampaignHistory />


          {/* <VideoShopping /> */}

          <div className="container-fluid mb-3">
            <FeaturedProduct />
          </div>

          <FlashSale />

          <MainBanner />




          <div className="container-fluid ">

            <HomeCatgoryPro />
          </div>



          <ShopBanner />

          <section>
            <div className="container-fluid">
              <Row className="justify-content-center text-center">
                <Col lg={8} md={10}>
                  <div className="mb-1">
                    <h6 className="text-primary mb-1">
                      — New Collection
                    </h6>
                    <h2 className="mb-0">Trending Products</h2>
                  </div>
                </Col>
              </Row>
              <LatestProduct />
            </div>
          </section>



          <Instafeed />


          {/*instagram end*/}

        </HelmetProvider>
      </>
    );
  }
}

export default index;