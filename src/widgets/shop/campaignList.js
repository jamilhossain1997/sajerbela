import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import imgUrl from '../../api/baseUrl';
import { RiShoppingBag3Line } from "react-icons/ri";
import { BiCaretRightCircle } from "react-icons/bi";
import apiClient from "../../api/http-common";

class campaignList extends Component {
    constructor(props) {
        super(props);
        this.quickview = this.quickview.bind(this);
        this.state = {
            nextDiscount: [],
            modelview: false,
            viewproduct: []
        };
    }
    quickview() {
        this.setState(prevState => ({
            modelview: !prevState.modelview
        }));
    }

    componentDidMount() {
        // window.scrollTo(0, 0)
        apiClient.get(`v1/flash-deals/campaing-products-tomrrrow`)
            .then(res => {
                const nextDiscount = res.data;
                console.log(res.data);
                this.setState({ nextDiscount });
            })
    }
    onClickQuickView(product) {
        this.setState({
            modelview: true,
            viewproduct: product
        })
    }
    Productaddcart(ProductID, ProductName, ProductImage, Qty, Rate, discount, StockStatus) {
        var Cart = JSON.parse(localStorage.getItem("CartProduct"));
        if (Cart == null)
            Cart = new Array();
        let Productadd = Cart.find(product => product.ProductID === ProductID);
        if (Productadd == null) {
            Cart.push({ ProductID: ProductID, ProductName: ProductName, ProductImage: ProductImage, Qty: Qty, Rate: Rate, Discount: discount, StockStatus: StockStatus });
            localStorage.removeItem("CartProduct");
            localStorage.setItem("CartProduct", JSON.stringify(Cart));
            var flag = 0;
            if (flag == 0) {
                toast.success("Item Added to Cart");
                flag = 1;
            }
        }
        else {
            toast.warning("Item is already in Cart");
        }
    }

    Productbuycart(ProductID, ProductName, ProductImage, Qty, Rate, discount, StockStatus) {
        var Cart = JSON.parse(localStorage.getItem("CartProduct"));
        if (Cart == null)
            Cart = new Array();
        let Productadd = Cart.find(product => product.ProductID === ProductID);
        if (Productadd == null) {
            Cart.push({ ProductID: ProductID, ProductName: ProductName, ProductImage: ProductImage, Qty: Qty, Rate: Rate, Discount: discount, StockStatus: StockStatus });
            localStorage.removeItem("CartProduct");
            localStorage.setItem("CartProduct", JSON.stringify(Cart));
            var flag = 0;
            if (flag == 0) {
                toast.success("Item Added to Cart");
                flag = 1;
            }
        }
        else {
            toast.warning("Item is already in Cart");
        }
    }
    Productaddwishlist(ProductID, ProductName, ProductImage, Qty, Rate, StockStatus) {
        var Cart = JSON.parse(localStorage.getItem("WishlistProduct"));
        if (Cart == null)
            Cart = new Array();

        let Productadd = Cart.find(product => product.ProductID === ProductID);
        if (Productadd == null) {

            Cart.push({ ProductID: ProductID, ProductName: ProductName, ProductImage: ProductImage, Qty: Qty, Rate: Rate, StockStatus: StockStatus });
            localStorage.removeItem("WishlistProduct");
            localStorage.setItem("WishlistProduct", JSON.stringify(Cart));

            toast.success("Item Added to WishList");
        }
        else {
            toast.warning("Item is already in WishList");
        }


    }
    CartItems(ID) {
        let checkcart = false;
        var Cart = JSON.parse(localStorage.getItem("CartProduct"));
        if (Cart && Cart.length > 0) {
            for (const cartItem of Cart) {
                if (cartItem.ProductID === ID) {
                    checkcart = true
                }
            }
        }
        return checkcart;
    }
    WishlistItems(ID) {
        let wishlist = false;
        var Wish = JSON.parse(localStorage.getItem("WishlistProduct"));

        if (Wish && Wish.length > 0) {
            for (const wishItem of Wish) {
                if (wishItem.ProductID === ID) {
                    wishlist = true
                }
            }
        }
        return wishlist;
    }
    render() {
        let { viewproduct } = this.state;
        const { productdata } = this.props;
        console.log(productdata)
        let layout = localStorage.getItem("ProductLayout");
        const convert = 0.011904761904762;
        return (
            <>
                <ToastContainer autoClose={900} />
                {(layout == 'Listing') ?
                    <Col xs={6} xl={3} lg={4} md={6} >

                        {
                            this.nextDiscount.filter(person => person.product_id == productdata.product_id).map((item) => {
                                return (
                                    <>
                                        <span style={{ borderBottomRightRadius: `50%`, position: 'absolute', zIndex: 5, background: `#fe4c1c`, color: `#fff` }}>
                                            <strong style={{ fontWeight: `400`, fontSize: `1rem`, padding: `2px` }}>
                                                {
                                                    <>Next Day:{Math.round((item.discountCam))}% OFF</>
                                                }
                                            </strong>
                                        </span>
                                    </>
                                )
                            })
                        }
                        {
                            productdata.id ?
                                <div className="card product-card">
                                    {!this.WishlistItems(productdata.id) ? (
                                        <Link
                                            to="#"
                                            onClick={() => this.Productaddwishlist(productdata.id, productdata.name, productdata.thumbnail, productdata.min_qty, productdata.unit_price, productdata.current_stock)}
                                            className="btn-wishlist btn-sm"
                                            id="addtowish"
                                        >
                                            <i className="lar la-heart" />
                                        </Link>
                                    ) : (
                                        <Link to="/OneStepCheck" className="btn-wishlist btn-sm" id="viewwishlist">
                                            <i className="las la-heart" />
                                        </Link>
                                    )}


                                    {
                                        productdata.video_url ?
                                            <Link className="card-img-hover d-block" to={`/product-single-campaing/${productdata.slug}`}>
                                                <img className="card-img-top card-img-back" src={`${imgUrl}storage/app/public/product/thumbnail/${productdata.thumbnail}`} alt={`${productdata.thumbnail}`} />
                                                <img className="card-img-top card-img-front" src={`${imgUrl}storage/app/public/product/thumbnail/${productdata.thumbnail}`} alt={`${productdata.thumbnail}`} />
                                                <div style={{ zIndex: `9999`, marginTop: `-138px`, marginLeft: `80px` }}>
                                                    <BiCaretRightCircle size={70} />
                                                </div>

                                            </Link>
                                            :
                                            <Link className="card-img-hover d-block" to={`/product-single-campaing/${productdata.slug}`}>
                                                <img className="card-img-top card-img-back" src={`${imgUrl}storage/app/public/product/thumbnail/${productdata.thumbnail}`} alt={`${productdata.thumbnail}`} />
                                                <img className="card-img-top card-img-front" src={`${imgUrl}storage/app/public/product/thumbnail/${productdata.thumbnail}`} alt={`${productdata.thumbnail}`} />

                                            </Link>


                                    }





                                    <div className="card-info">
                                        <div className="card-body">
                                            <div className="product-title">
                                                <Link to="/product-single" className="link-title">
                                                    {productdata.name}
                                                </Link>
                                            </div>
                                            <div className="mt-1">
                                                <span className="product-price">

                                                    <>Today Discount: {Math.round((productdata.discountCam))}%</>
                                                </span><br />
                                                <span className="product-price">
                                                    <>৳{(Math.round(productdata?.unit_price / convert, 2)) - (Math.round(((productdata?.unit_price / convert * productdata?.discountCam)), 2) / 100)}</>

                                                    <span>

                                                        <del className="text-muted h6"> ৳{Math.round(productdata?.unit_price / convert, 2)}</del>


                                                    </span>
                                                    {/* <del className="text-muted">{productdata.unit_price}</del>{productdata.unit_price} */}
                                                </span>
                                                {/* <div className="star-rating"><i className="las la-star" /><i className="las la-star" /><i className="las la-star" /><i className="las la-star" /><i className="las la-star" />
                                        </div> */}
                                            </div>
                                        </div>
                                        <div className="card-footer bg-transparent border-0">
                                            <div className="product-link d-flex align-items-center justify-content-center">
                                                {!this.CartItems(productdata.id) ? (
                                                    <Link
                                                        to="/OneStepCheck"
                                                        onClick={() => this.Productbuycart(productdata.id, productdata.name, productdata.thumbnail, productdata.min_qty, (productdata.unit_price - (productdata?.discount_type == 'percent' ? ((productdata?.unit_price * productdata?.discount) / 100) : productdata.discount)), (productdata?.discount_type == 'percent' ? ((productdata?.unit_price * productdata?.discount) / 100) : productdata.discount), productdata.current_stock)}
                                                        className="btn btn-view mx-3"
                                                        rel="nofollow"
                                                        id="addtocard1"
                                                    >
                                                        <RiShoppingBag3Line className="mr-1" />
                                                    </Link>
                                                ) : (
                                                    <Link to="/OneStepCheck" className="btn btn-view" rel="nofollow" id="viewcart1">
                                                        <RiShoppingBag3Line className="mr-1" />
                                                    </Link>
                                                )}

                                                {!this.CartItems(productdata.id) ? (
                                                    <Link
                                                        to="#"
                                                        onClick={() => this.Productaddcart(productdata.id, productdata.name, productdata.thumbnail, productdata.min_qty, (productdata.unit_price - (productdata?.discount_type == 'percent' ? ((productdata?.unit_price * productdata?.discount) / 100) : productdata.discount)), (productdata?.discount_type == 'percent' ? ((productdata?.unit_price * productdata?.discount) / 100) : productdata.discount), productdata.current_stock)}
                                                        className="btn-cart btn btn-primary btn-animated mx-3"
                                                        rel="nofollow"
                                                        id="addtocard1"
                                                    >
                                                        <i className="las la-shopping-cart mr-1" />
                                                    </Link>
                                                ) : (
                                                    <Link to="/OneStepCheck" className="btn-cart btn btn-primary btn-animated mx-3" rel="nofollow" id="viewcart1">
                                                        <i className="las-regular la-bag-shopping mr-1" />
                                                    </Link>
                                                )}
                                                <Link to="#" onClick={() => this.onClickQuickView(productdata)} className="btn btn-view" id="quickview1">
                                                    <i className="las la-eye" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div> :
                                <>
                                    <Card
                                        style={{
                                            width: '18rem'
                                        }}
                                    >
                                        <CardImg
                                            alt="Card image cap"
                                            src="https://picsum.photos/id/135/318/180?grayscale&blur=10"
                                            top
                                            width="100%"
                                        />
                                        <CardBody>
                                            <Placeholder
                                                animation="wave"
                                                tag={function noRefCheck() { }}
                                            >
                                                <Placeholder xs={8} />
                                            </Placeholder>
                                            <Placeholder
                                                animation="wave"
                                                tag={function noRefCheck() { }}
                                            >
                                                <Placeholder xs={12} />
                                                <Placeholder xs={7} />
                                            </Placeholder>
                                            <PlaceholderButton xs={8} />
                                        </CardBody>
                                    </Card>
                                </>
                        }
                    </Col>
                    :
                    <Col xs={12} xl={3} lg={4} md={6} >
                        {
                            productdata.id ?
                                <div className="card product-card">
                                    {!this.WishlistItems(productdata.id) ? (
                                        <Link
                                            to="#"
                                            onClick={() => this.Productaddwishlist(productdata.id, productdata.name, productdata.thumbnail, productdata.min_qty, productdata.unit_price, productdata.current_stock)}
                                            className="btn-wishlist btn-sm"
                                            id="addtowish"
                                        >
                                            <i className="lar la-heart" />
                                        </Link>
                                    ) : (
                                        <Link to="/OneStepCheck" className="btn-wishlist btn-sm" id="viewwishlist">
                                            <i className="las la-heart" />
                                        </Link>
                                    )}


                                    {
                                        productdata.video_url ?
                                            <Link className="card-img-hover d-block" to={`/product-single-campaing/${productdata.slug}`}>
                                                <img className="card-img-top card-img-back" src={`${imgUrl}storage/app/public/product/thumbnail/${productdata.thumbnail}`} alt={`${productdata.thumbnail}`} />
                                                <img className="card-img-top card-img-front" src={`${imgUrl}storage/app/public/product/thumbnail/${productdata.thumbnail}`} alt={`${productdata.thumbnail}`} />
                                                <div style={{ zIndex: `9999`, marginTop: `-138px`, marginLeft: `80px` }}>
                                                    <BiCaretRightCircle size={70} />
                                                </div>

                                            </Link>
                                            :
                                            <Link className="card-img-hover d-block" to={`/product-single-campaing/${productdata.slug}`}>
                                                <img className="card-img-top card-img-back" src={`${imgUrl}storage/app/public/product/thumbnail/${productdata.thumbnail}`} alt={`${productdata.thumbnail}`} />
                                                <img className="card-img-top card-img-front" src={`${imgUrl}storage/app/public/product/thumbnail/${productdata.thumbnail}`} alt={`${productdata.thumbnail}`} />

                                            </Link>


                                    }





                                    <div className="card-info">

                                        <div className="card-body">
                                            <div className="product-title">
                                                <Link to="/product-single" className="link-title">
                                                    {productdata.name}
                                                </Link>
                                            </div>

                                            <div className="coming-soon" style={{ marginLeft: `-41px` }}>
                                                <ul className="countdown list-inline d-flex align-items-center">
                                                    <li>
                                                        <span className="" style={{ fontSize: `20px!important` }}>{0}</span>
                                                        <p className="days_ref">D</p>
                                                    </li>
                                                    {/* <p className="days_ref">D</p> */}
                                                    <li>
                                                        <span className="hours">{24 - new Date().getHours()}</span>
                                                        <p className="hours_ref">H</p>
                                                    </li>
                                                    <li>
                                                        <span className="minutes" >{new Date().getMinutes()}</span>
                                                        <p className="minutes_ref">M</p>
                                                    </li>
                                                    <li>
                                                        <span className="seconds">{new Date().getSeconds()}</span>
                                                        <p className="seconds_ref">S</p>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mt-1">
                                                <span className="product-price">
                                                    <>Today Discount: {Math.round((productdata.discountCam))}%</>
                                                </span><br />
                                                <span className="product-price">
                                                    <>৳{(Math.round(productdata?.unit_price / convert, 2)) - (Math.round(((productdata?.unit_price / convert * productdata?.discountCam)), 2) / 100)}</>
                                                    <span>
                                                        <del className="text-muted h6"> ৳{Math.round(productdata?.unit_price / convert, 2)}</del>
                                                    </span>
                                                    {/* <del className="text-muted">{productdata.unit_price}</del>{productdata.unit_price} */}
                                                </span>
                                                {/* <div className="star-rating"><i className="las la-star" /><i className="las la-star" /><i className="las la-star" /><i className="las la-star" /><i className="las la-star" />
                                        </div> */}
                                            </div>
                                        </div>
                                        <div className="card-footer bg-transparent border-0">
                                            <div className="product-link d-flex align-items-center justify-content-center">
                                                {!this.CartItems(productdata.id) ? (
                                                    <Link
                                                        to="/OneStepCheck"
                                                        onClick={() => this.Productbuycart(productdata.id, productdata.name, productdata.thumbnail, productdata.min_qty, ((productdata.unit_price - ((productdata?.unit_price * productdata?.discountCam) / 100))), ((productdata?.unit_price * productdata?.discountCam) / 100), productdata.current_stock)}
                                                        className="btn btn-view mx-3"
                                                        rel="nofollow"
                                                        id="addtocard1"
                                                    >
                                                        <RiShoppingBag3Line className="mr-1" />
                                                    </Link>
                                                ) : (
                                                    <Link to="/OneStepCheck" className="btn btn-view" rel="nofollow" id="viewcart1">
                                                        <RiShoppingBag3Line className="mr-1" />
                                                    </Link>
                                                )}

                                                {!this.CartItems(productdata.id) ? (
                                                    <Link
                                                        to="#"
                                                        onClick={() => this.Productaddcart(productdata.id, productdata.name, productdata.thumbnail, productdata.min_qty, ((productdata.unit_price - ((productdata?.unit_price * productdata?.discountCam) / 100))), ((productdata?.unit_price * productdata?.discountCam) / 100), productdata.current_stock)}
                                                        className="btn-cart btn btn-primary btn-animated mx-3"
                                                        rel="nofollow"
                                                        id="addtocard1"
                                                    >
                                                        <i className="las la-shopping-cart mr-1" />
                                                    </Link>
                                                ) : (
                                                    <Link to="/OneStepCheck" className="btn-cart btn btn-primary btn-animated mx-3" rel="nofollow" id="viewcart1">
                                                        <i className="las-regular la-bag-shopping mr-1" />
                                                    </Link>
                                                )}
                                                <Link to="#" onClick={() => this.onClickQuickView(productdata)} className="btn btn-view" id="quickview1">
                                                    <i className="las la-eye" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                </div> :
                                <>
                                    <Card
                                        style={{
                                            width: '18rem'
                                        }}
                                    >
                                        <CardImg
                                            alt="Card image cap"
                                            src="https://picsum.photos/id/135/318/180?grayscale&blur=10"
                                            top
                                            width="100%"
                                        />
                                        <CardBody>
                                            <Placeholder
                                                animation="wave"
                                                tag={function noRefCheck() { }}
                                            >
                                                <Placeholder xs={8} />
                                            </Placeholder>
                                            <Placeholder
                                                animation="wave"
                                                tag={function noRefCheck() { }}
                                            >
                                                <Placeholder xs={12} />
                                                <Placeholder xs={7} />
                                            </Placeholder>
                                            <PlaceholderButton xs={8} />
                                        </CardBody>
                                    </Card>
                                </>
                        }
                    </Col>

                }

                <Modal isOpen={this.state.modelview} toggle={this.modelview} className="view-modal" size="lg" style={{ maxWidth: '900px', width: '60%' }}>
                    <ToastContainer autoClose={900} />
                    <ModalHeader className="border-bottom-0 pb-0 ">
                        <Button color="danger" onClick={() => this.quickview()} ><span aria-hidden="true">×</span></Button>
                    </ModalHeader>
                    <ModalBody>
                        <Row className="align-items-center">
                            <div className="col-lg-5 col-12">
                                <img className="img-fluid rounded" src={`${imgUrl}storage/app/public/product/thumbnail/${viewproduct.thumbnail}`} alt="hello" />
                            </div>
                            <div className="col-lg-7 col-12 mt-5 mt-lg-0">
                                <div className="product-details">
                                    <h3 className="mb-0" style={{ fontSize: `16px` }}> {viewproduct.name}</h3>
                                    <div className="star-rating mb-4"><i className="las la-star" /><i className="las la-star" /><i className="las la-star" /><i className="las la-star" /><i className="las la-star" />
                                    </div>
                                    <span className="product-price h4">
                                        <span className="product-price">

                                            {
                                                viewproduct.discount > 0 ? viewproduct?.discount_type == 'percent' ? <> Discount:{Math.round((viewproduct.discount))}%</> : null : null
                                            }

                                            {
                                                viewproduct.discount > 0 ? viewproduct?.discount_type == 'flat' ? <> Discount:৳{Math.round((viewproduct.discount / convert))}</> : null : null
                                            }
                                        </span><br />
                                        <span className="product-price">
                                            {
                                                viewproduct.discount > 0 ? viewproduct?.discount_type == 'percent' ? <>৳{(Math.round(viewproduct?.unit_price / convert, 2)) - (Math.round(((viewproduct?.unit_price / convert * viewproduct?.discount)), 2) / 100)}</> : <>৳{(Math.round(viewproduct?.unit_price / convert, 2)) - (Math.round((viewproduct?.discount) / convert, 2))}</> : <>৳{Math.round(viewproduct?.unit_price / convert, 2)}</>
                                            }
                                            <span>
                                                {
                                                    viewproduct?.discount > 0 ? <del className="text-muted h6"> ৳{Math.round(viewproduct?.unit_price / convert, 2)}</del>
                                                        : null
                                                }
                                            </span>

                                        </span>

                                    </span>

                                    <ul className="list-unstyled my-4">
                                        <li className="mb-2">Availibility: <span className="text-muted"> {viewproduct.current_stock}</span>
                                        </li>

                                    </ul>
                                    <p className="mb-4">{viewproduct?.description}</p>
                                    <div className="d-sm-flex align-items-center mb-5">
                                        <div className="d-flex align-items-center mr-sm-4">
                                            <button className="btn-product btn-product-up"> <i className="las la-minus" />
                                            </button>
                                            <input className="form-product" type="number" name="form-product" defaultValue={1} />
                                            <button className="btn-product btn-product-down"> <i className="las la-plus" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="d-sm-flex align-items-center mb-3">


                                        {viewproduct?.choice_options?.map((sizes, index) => {

                                            return (
                                                <>
                                                    {
                                                        sizes.options ? <>
                                                            <p style={{ marginTop: `10px` }}>Size:</p>
                                                            <select className="custom-select mt-3 mt-sm-0" style={{ width: `70px` }}>
                                                                {sizes.options.map((options, index) =>
                                                                    <option key={index}>{options}</option>)}
                                                            </select>

                                                        </> : null

                                                    }
                                                </>

                                            )

                                        }
                                        )}
                                    </div>
                                    <div className="d-sm-flex align-items-center mb-1" style={{ marginLeft: `-10px` }}>
                                        <div className="d-flex text-center ml-sm-4 mt-3 mt-sm-0" id="inputGroupSelect02">

                                            {viewproduct?.colors?.map((color, index) => {

                                                return (
                                                    <>
                                                        {
                                                            color.code ?
                                                                <> <div className="form-check pl-0 mr-3">
                                                                    <input type="checkbox" value={color.name} id={`color-filter${index}`} className="form-check-input" checked={this.state.selectedColor === color.name}
                                                                        onChange={this.onChangeColor} />
                                                                    <label className="form-check-label" htmlFor={`color-filter${index}`} style={{ background: `${color.code}` }} />
                                                                </div></> : null
                                                        }

                                                    </>
                                                )
                                            }
                                            )}
                                        </div>
                                    </div>
                                    <div className="d-sm-flex align-items-center mt-5">
                                        {!this.CartItems(viewproduct.id) ?
                                            <Link to="#" onClick={() => this.Productaddcart(viewproduct.id, viewproduct.name, viewproduct.thumbnail, viewproduct.min_qty, viewproduct.unit_price, viewproduct.current_stock)} className="btn btn-primary btn-animated mr-sm-4 mb-3 mb-sm-0" rel="nofollow" ><i className="las la-shopping-cart mr-1" />Add To Cart</Link>
                                            :
                                            <Link to="/OneStepCheck" className="btn btn-primary btn-animated mr-sm-4 mb-3 mb-sm-0" rel="nofollow" id="viewcart1"><i className="las la-shopping-cart mr-1" />view cart</Link>

                                        }


                                        <Link to="/OneStepCheck" onClick={() => this.Productaddcart(productdata.id, productdata.name, productdata.thumbnail, productdata.min_qty, productdata.unit_price, productdata.current_stock)} className="btn btn-primary btn-animated mr-sm-4 mb-3 mb-sm-0" rel="nofollow" ><i className="las la-shopping-cart mr-1" />Buy Now</Link>

                                    </div>
                                    <div className="d-sm-flex align-items-center border-top pt-4 mt-5">
                                        <h6 className="mb-sm-0 mr-sm-4">Share It:</h6>
                                        <ul className="list-inline">
                                            <li className="list-inline-item"><Link className="bg-white shadow-sm rounded p-2" to="#"><i className="la la-facebook" /></Link>
                                            </li>
                                            <li className="list-inline-item"><Link className="bg-white shadow-sm rounded p-2" to="#"><i className="la la-dribbble" /></Link>
                                            </li>
                                            <li className="list-inline-item"><Link className="bg-white shadow-sm rounded p-2" to="#"><i className="la la-instagram" /></Link>
                                            </li>
                                            <li className="list-inline-item"><Link className="bg-white shadow-sm rounded p-2" to="#"><i className="la la-twitter" /></Link>
                                            </li>
                                            <li className="list-inline-item"><Link className="bg-white shadow-sm rounded p-2" to="#"><i className="la la-linkedin" /></Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </ModalBody>
                </Modal>

            </>
        );
    }
}


export default campaignList