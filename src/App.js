import React, { Component, Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Footer1 from './layout/footer/footer1';
import Header from './layout/header/header';
import './App.css';
import './vendor.js';
import index from './pages/home';
import login from './pages/account/login';
import singup from './pages/account/singup';
import forgotpassword from './pages/account/forgot-password';
import pagenotfound from './pages/common/page-not-found';
import leftsidebar from './pages/shop/layout/grid/leftsidebar';
import nosidebar from './pages/shop/layout/grid/nosidebar';
import fullsidebar from './pages/shop/layout/grid/fullsidebar';
import ordercomplate from './pages/shop/ordercomplate';
import wishlist from './pages/shop/wishlist';
import Scrolltop from './layout/back-to-top';
import productsingle from './pages/shop/product/productsingle';
import OrderView from './pages/account/orderView';
import SearchView from './pages/shop/layout/grid/SearchView';
import userProfile from './pages/account/User/userProfile';
import Invoice from './pages/account/User/invoice';
import OneStepCheck from './pages/shop/product/oneStepCheck';
import PriceSearch from './pages/shop/layout/grid/PriceSearch';
import OtpLogin from './pages/account/OTP-LOGIN/otpLogin';
import Otpset from './pages/account/OTP-LOGIN/otpset';
import termcondition from './pages/common/term-condition';
import SearchColor from './pages/shop/layout/grid/searchColor';
import CampaingSingleProduct from './pages/shop/product/campaingSingleProduct';
import CampaignAll from './pages/shop/layout/grid/campaignAll';
import Faq from './pages/common/faq';
import about from './pages/common/about';
import privacyPolicy from './pages/common/privacy-policy';
import ReactPixel from 'react-facebook-pixel';
import LandPages from './pages/LandingPages/index';

// import CustomerChat from './pages/account/CustomerChat';
// import FacebookPixel from './pages/account/FacebookPixel';

class App extends React.Component {

  constructor(props) {
    super(props)
  }
  UNSAFE_componentWillMount() {
    // this.props.getProducts();
  }
  componentDidMount() {
    ReactPixel.init('546759807631140');
    ReactPixel.pageView(); // For tracking page view
  }

  render() {
    // const { location } = this.props;
    return (
      <Fragment>

        <div className="page-wrapper">
          <Header />
          {/* <CustomerChat /> */}
          {/* <FacebookPixel /> */}
          <Switch>
            <Route exact path="/" component={index} />
            <Route path="/Search" component={SearchView} />
            <Route path="/otpLogin" component={OtpLogin} />
            <Route path="/Otpset" component={Otpset} />
            <Route path="/userProfile" component={userProfile} />
            <Route path="/invoice/:id" component={Invoice} />
            <Route path="/OneStepCheck" component={OneStepCheck} />
            <Route path="/PriceSearch" component={PriceSearch} />
            <Route path="/searchcolor" component={SearchColor} />
            <Route path="/termcondition" component={termcondition} />
            <Route path="/campaign" component={CampaignAll} />
            <Route path="/faq" component={Faq} />
            <Route path="/about" component={about} />
            <Route path="/privacy-policy" component={privacyPolicy} />
            {/* Account Pages */}
            <Route path="/sign-in" component={login} />
            <Route path="/sign-up" component={singup} />
            <Route path="/forgot-password" component={forgotpassword} />
            {/* Shop Pages */}

            <Route exact path="/grid-left-sidebar/:id" component={leftsidebar} />
            <Route path="/category/slug::id" component={nosidebar} />
            <Route path="/discontproduct" component={fullsidebar} />
            <Route path={`/product-single/:slug`} component={productsingle} />
            <Route path={`/product-single-campaing/:slug/:id`} component={CampaingSingleProduct} />

            <Route path="/wishlist" component={wishlist} />
            <Route path="/order-complate" component={ordercomplate} />
            <Route path="/orderView" component={OrderView} />
            <Route path="/:slug" component={LandPages} />
            <Route path="*" component={pagenotfound} />
          </Switch>
          <Footer1 />
          <Scrolltop />
        </div>
      </Fragment>
    );
  }
}

// const AppMapStateToProps = state => {
//   return {
//     products: state.data.products
//   };
// };

// const AppMapDispatchToProps = dispatch => {
//   return {
//     getProducts: () => {
//       dispatch(getProducts());
//     }
//   };
// };


// export default connect(AppMapStateToProps, AppMapDispatchToProps)(withRouter(App))
export default (withRouter(App))

