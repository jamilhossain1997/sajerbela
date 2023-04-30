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
            {/* <link rel="icon" type="image/png" href="/darkmode/favicon.png" sizes="32x32" /> */}
          </Helmet>
          <Herosection7 />
          {/* <div className="page-content"> */}
          {/* <section className="pb-0 FreeShipping">
            <Container>
              <Processstep />
            </Container>
          </section> */}

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


          {/*feature end*/}
          {/*product start*/}
          {/* <section>
            <div className="container-fluid px-lg-8">
              <Row className="justify-content-center text-center">
                <Col lg={8} md={10}>
                  <div className="mb-8">
                    <h6 className="text-primary mb-1">
                      — Fashion gallery
                      </h6>
                    <h2 className="mb-0">Trending Products</h2>
                  </div>
                </Col>
              </Row>
              <Fashiongallery />
            </div>
          </section> */}
          {/*product end*/}

          {/*product start*/}

          <div className="container-fluid ">

            <HomeCatgoryPro />
          </div>

          {/*product end*/}

          {/*product start*/}

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
          {/*product end*/}

          {/*countdown start*/}
          {/* <section className="p-0">
            <div className="container-fluid pl-0">
              <Row>
                <Col md={6} sm={5} className="custom-py-3 rounded" style={{ backgroundImage: `url(${require(`../../assets/images/bg/03.jpg`).default})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} ></Col>
                <Col md={6} className="col-sm-7 py-sm-0 py-5">
                  <div className="pl-lg-6 pr-lg-8 p-2 pt-sm-10"> <span className="bg-primary py-1 px-2 d-inline-block rounded mb-3 text-white text-uppercase">Limited Offer</span>
                    <h2 className="mb-5 font-w-5 line-h-1">Weekly Sale on<br /> <span className="text-primary font-w-8">60% OFF</span> All Products</h2>
                    <ul className="countdown list-inline d-flex ">
                      <CommingSoonCounter time={'500550'} />
                    </ul>
                  </div>
                </Col>
              </Row>
            </div>
          </section> */}
          {/*countdown end*/}
          {/*product start*/}
          {/* <section className="tab p-0 mt-n15">
            <div className="container-fluid pr-sm-0">
              <Row>
                <div className="col-lg-10 col-md-11 ml-auto">
                  <OurProduct2/>
                </div>
              </Row>
            </div>
          </section> */}
          {/*product end*/}
          {/*product-add start*/}
          {/* <section>
            <Container>
              <Productbanner />
            </Container>
          </section> */}
          {/*product-add end*/}
          {/*multi sec start*/}
          {/* <section className="bg-light">
            <Container>
              <Row className="justify-content-center text-center mb-8">
                <div className="col-lg-6 col-md-10">
                  <div className="mb-4">
                    <h6 className="text-primary mb-1">
                      — Newsletter
                    </h6>
                    <h2 className="mb-0">Subscribe Our Newsletter</h2>
                  </div>
                  <Newsletter1 />

                </div>
              </Row>
            </Container>
          </section> */}
          {/* <section className="p-0 mt-n11">
            <Container>
              <Row>
                <Col>
                  <Clientlogo />
                </Col>
              </Row>
            </Container>
          </section> */}
          {/*multi sec end*/}
          {/*blog start*/}
          {/* <section>
            <Container>
              <Row className="justify-content-center text-center mb-5">
                <Col md={10} lg={8} className="col-12">
                  <div>
                    <h6 className="text-primary mb-1">
                      — Fashion Blog
                    </h6>
                    <h2 className="mb-0">Latest News Feed</h2>
                  </div>
                </Col>
              </Row>
              
              <Blogcart />
              <Row className="justify-content-center text-center mt-5">
                <Col> <Link className="btn btn-dark" to="/blog-card">View All Blog</Link>
                </Col>
              </Row>
            </Container>
          </section> */}
          {/*blog end*/}
          {/*instagram start*/}


          <Instafeed />


          {/*instagram end*/}

        </HelmetProvider>
      </>
    );
  }
}

export default index;