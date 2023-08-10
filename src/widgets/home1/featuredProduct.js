import React, { useState, useEffect } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, Modal, ModalHeader, ModalBody, Row, Col, Container } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useQuery } from 'react-query';
import apiClient from '../../api/http-common';
import imgUrl from '../../api/baseUrl';
import { RiShoppingBag3Line } from "react-icons/ri";



const featuredpi = async () => {
    const result = await apiClient.get(`v1/products/featuredWeb`);
    return result.data;
};
const featuredProduct = () => {
    const [activeTab, setActiveTap] = useState(1);
    const [modelview, setModelview] = useState(false);
    const [viewproduct, setViewproduct] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const { isLoading, error, data } = useQuery("featuredpi1", featuredpi);
    const [visible, setVisible] = useState(8);
    const [isCompleted, setIsCompleted] = useState(false);

    // LoadMore
    const loadMore = () => {
        setVisible((prev) => prev + 8);
        if (visible >= data?.length) {
            setIsCompleted(true)
        } else {
            setIsCompleted(false)
        }
    };


    // quickview

    function quickview() {
        setModelview(!modelview);
    }

    function toggle(tab) {
        if (activeTab !== tab) {
            setActiveTap(tab);
        }
    }

    function onClickQuickView(product) {
        setModelview(true);
        setViewproduct(product);
    }

    // WishlistItems
    function WishlistItems(ID) {
        let wishlist = false;
        var Wish = JSON.parse(localStorage.getItem("WishlistProduct"));

        if (Wish && Wish.length > 0) {
            for (const wishItem of Wish) {
                if (wishItem.ProductID === ID) {
                    wishlist = true;
                }
            }
        }
        return wishlist;
    }

    function Productaddwishlist(ProductID, ProductName, ProductImage, Qty, Rate, discount, StockStatus) {
        var Cart = JSON.parse(localStorage.getItem("WishlistProduct"));
        if (Cart == null) Cart = new Array();

        let Productadd = Cart.find((product) => product.ProductID === ProductID);
        if (Productadd == null) {
            Cart.push({ ProductID: ProductID, ProductName: ProductName, ProductImage: ProductImage, Qty: Qty, Rate: Rate, Discount: discount, StockStatus: StockStatus });
            localStorage.removeItem("WishlistProduct");
            localStorage.setItem("WishlistProduct", JSON.stringify(Cart));

            toast.success("Item Added to WishList");
        } else {
            toast.warning("Item is already in WishList");
        }
    }

    // cart add
    function Productaddcart(ProductID, ProductName, ProductImage, Qty, Rate, discount, StockStatus) {
        var Cart = JSON.parse(localStorage.getItem("CartProduct"));
        if (Cart == null) Cart = new Array();
        let Productadd = Cart.find((product) => product.ProductID === ProductID);
        if (Productadd == null) {
            Cart.push({ ProductID: ProductID, ProductName: ProductName, ProductImage: ProductImage, Qty: Qty, Rate: Rate, Discount: discount, StockStatus: StockStatus });
            localStorage.removeItem("CartProduct");
            localStorage.setItem("CartProduct", JSON.stringify(Cart));
            var flag = 0;
            if (flag == 0) {
                toast.success("Item Added to Cart");
                flag = 1;
            }
        } else {
            toast.warning("Item is already in Cart");
        }
    }

    // CartItems

    function CartItems(ID) {
        let checkcart = false;
        var Cart = JSON.parse(localStorage.getItem("CartProduct"));
        if (Cart && Cart.length > 0) {
            for (const cartItem of Cart) {
                if (cartItem.ProductID === ID) {
                    checkcart = true;
                }
            }
        }
        return checkcart;
    }

    function onChangeColor(event) {
        console.log(event.target.value);
        setSelectedColor(event.target.value)
        // this.setState({
        //   selectedColor: event.target.value
        // });
    }

    if (isLoading) {
        return (
            <>
                <Container fluid>
                    <Row>
                        {
                            Array(5).fill(undefined).map((v, i) =>
                                <>
                                    <Col xs={6} xl={3} lg={4} md={6} key={i}>
                                        <Skeleton variant="rectangular" height={200} width={300} />
                                        <Skeleton variant="rectangular" width={300} count={3} />
                                    </Col>
                                </>

                            )
                        }
                    </Row>
                </Container>
            </>

        );
    }
    const convert = 0.011904761904762;
    return (
        <>
            <Row className="justify-content-center text-center">
                <Col lg={8} md={10}>
                    <div className="mb-2">
                        <h6 className="text-primary mb-1">
                            — Featured Product
                        </h6>
                        {/* <h2 className="mb-0">Trending Products</h2> */}
                    </div>
                </Col>
            </Row>
            <div className="shadow p-sm-4 p-2 bg-white">
                <Row>
                    <ToastContainer autoClose={900} />
                    {data?.slice(0, visible).map((productdata) => {
                        return (
                            <React.Fragment key={productdata.id}>
                                <Col xs={6} xl={3} lg={4} md={6} >
                                    <div className="card product-card">
                                        {!WishlistItems(productdata.id) ? (
                                            <Link
                                                to="#"
                                                onClick={() => Productaddwishlist(productdata.id, productdata.name, productdata.thumbnail, productdata.min_qty, (productdata.unit_price - (productdata?.discount_type == 'percent' ? ((productdata?.unit_price * productdata?.discount) / 100) : productdata.discount)), (productdata?.discount_type == 'percent' ? ((productdata?.unit_price * productdata?.discount) / 100) : productdata.discount), productdata.current_stock)}
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
                                            productdata.thumbnail ?
                                                <Link className="card-img-hover d-block" to={`/product-single/${productdata.slug}`}>
                                                    <LazyLoadImage className="card-img-top card-img-back" src={`${imgUrl}storage/app/public/product/thumbnail/${productdata?.thumbnail}`} alt="hello" />
                                                    <LazyLoadImage className="card-img-top card-img-front" src={`${imgUrl}storage/app/public/product/thumbnail/${productdata?.thumbnail}`} alt="hello" />
                                                </Link>
                                                : <Skeleton count={3} />
                                        }


                                        <div className="card-info">
                                            <div className="card-body">
                                                <div className="product-title">
                                                    <Link to={`/product-single/${productdata.slug}`} className="link-title">
                                                        {productdata.name}
                                                    </Link>
                                                </div>
                                                <div className="mt-1">
                                                    <span className="product-price">

                                                        {
                                                            productdata.discount > 0 ? productdata?.discount_type == 'percent' ? <> Discount: {Math.round((productdata.discount))}%</> : null : null
                                                        }

                                                        {
                                                            productdata.discount > 0 ? productdata?.discount_type == 'flat' ? <> Discount: ৳{Math.round((productdata.discount / convert))}</> : null : null
                                                        }
                                                    </span><br />
                                                    <span className="product-price">
                                                        {
                                                            productdata.discount > 0 ? productdata?.discount_type == 'percent' ? <>৳{Math.round((productdata?.unit_price / convert) - (productdata?.unit_price / convert * productdata?.discount) / 100)}</> : <>৳{(Math.round(productdata?.unit_price / convert) - ((productdata?.discount) / convert))}</> : <>৳{Math.round(productdata?.unit_price / convert)}</>
                                                        }

                                                        <span>
                                                            {
                                                                productdata?.discount > 0 ? <del className="text-muted h6"> ৳{Math.round(productdata?.unit_price / convert, 2)}</del>
                                                                    : null
                                                            }
                                                        </span>
                                                        {/* <del className="text-muted">{productdata.unit_price}</del>{productdata.unit_price} */}
                                                    </span>
                                                </div>
                                            </div>
                                            {
                                                productdata.current_stock > 0 ?
                                                    <>
                                                        <div className="card-footer bg-transparent border-0">
                                                            <div className="product-link d-flex align-items-center justify-content-center">
                                                                {!CartItems(productdata.id) ? (
                                                                    <Link
                                                                        to="/OneStepCheck"
                                                                        onClick={() => Productbuycart(productdata.id, productdata.name, productdata.thumbnail, productdata.min_qty, (productdata.unit_price - (productdata?.discount_type == 'percent' ? ((productdata?.unit_price * productdata?.discount) / 100) : productdata.discount)), (productdata?.discount_type == 'percent' ? ((productdata?.unit_price * productdata?.discount) / 100) : productdata.discount), productdata.current_stock)}
                                                                        className="btn btn-view mx-1"
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

                                                                {!CartItems(productdata.id) ? (
                                                                    <Link
                                                                        to="#"
                                                                        onClick={() => Productaddcart(productdata.id, productdata.name, productdata.thumbnail, productdata.min_qty, (productdata.unit_price - (productdata?.discount_type == 'percent' ? ((productdata?.unit_price * productdata?.discount) / 100) : productdata.discount)), (productdata?.discount_type == 'percent' ? ((productdata?.unit_price * productdata?.discount) / 100) : productdata.discount), productdata.current_stock)}
                                                                        className="btn-cart btn btn-primary btn-animated mx-1"
                                                                        rel="nofollow"
                                                                        id="addtocard1"
                                                                    >
                                                                        <i className="las la-shopping-cart mr-1" />
                                                                    </Link>
                                                                ) : (
                                                                    <Link to="/OneStepCheck" className="btn-cart btn btn-primary btn-animated mx-1" rel="nofollow" id="viewcart1">
                                                                        <i className="las-regular la-bag-shopping mr-1" />
                                                                    </Link>
                                                                )}
                                                                <Link to="#" onClick={() => onClickQuickView(productdata)} className="btn btn-view" id="quickview1">
                                                                    <i className="las la-eye" />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </> :
                                                    <>
                                                        <div className="card-footer bg-transparent border-0">
                                                            <div className="product-link d-flex align-items-center justify-content-center">
                                                                <Link to="/" className="btn btn-primary btn-animated mr-sm-4 mb-3 mb-sm-0" rel="nofollow">Stock Out</Link>
                                                            </div>
                                                        </div>
                                                    </>
                                            }

                                        </div>
                                    </div>
                                </Col>
                            </React.Fragment>
                        );
                    })}

                </Row>
                <div className="d-grid mt-3 mb-5 justify-content-center text-center">
                    {isCompleted ? (
                        <button
                            onClick={loadMore}
                            type="button"
                            className="btn btn-danger disabled"
                        >
                            That's It
                        </button>
                    ) : (
                        <button onClick={loadMore} type="button" className="btn btn-danger">
                            Load More +
                        </button>
                    )}
                </div>
            </div>

            <Modal isOpen={modelview} toggle={modelview} className="view-modal" size="lg" style={{ maxWidth: '900px', width: '60%' }}>
                <ToastContainer autoClose={900} />
                <ModalHeader className="border-bottom-0 pb-0 ">
                    <Button color="danger" onClick={() => quickview()} ><span aria-hidden="true">×</span></Button>
                </ModalHeader>
                <ModalBody>
                    <Row className="align-items-center">
                        <div className="col-lg-5 col-12">
                            <img className="img-fluid rounded" src={`${imgUrl}storage/app/public/product/thumbnail/${viewproduct.thumbnail}`} alt="hello" />
                        </div>
                        <div className="col-lg-7 col-12 mt-5 mt-lg-0">
                            <div className="product-details">
                                <h3 className="mb-0" style={{ fontSize: `16px` }}> {viewproduct.name}</h3>

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
                                <p className="mb-4">{viewproduct.description}</p>
                                <div className="d-sm-flex align-items-center mb-5">
                                    <div className="d-flex align-items-center mr-sm-4">
                                        <button className="btn-product btn-product-up"> <i className="las la-minus" />
                                        </button>
                                        <input className="form-product" type="number" name="form-product" defaultValue={1} />
                                        <button className="btn-product btn-product-down"> <i className="las la-plus" />
                                        </button>
                                    </div>

                                </div>

                                <div className="d-sm-flex align-items-center mt-5">
                                    {!CartItems(viewproduct.id) ?
                                        <Link to="#" onClick={() => Productaddcart(productdata.id, productdata.name, productdata.thumbnail, productdata.min_qty, (productdata.unit_price - (productdata?.discount_type == 'percent' ? ((productdata?.unit_price * productdata?.discount) / 100) : productdata.discount)), (productdata?.discount_type == 'percent' ? ((productdata?.unit_price * productdata?.discount) / 100) : productdata.discount), productdata.current_stock)} className="btn btn-primary btn-animated mr-sm-4 mb-3 mb-sm-0" rel="nofollow" ><i className="las la-shopping-cart mr-1" />Add To Cart</Link>
                                        :
                                        <Link to="/OneStepCheck" className="btn btn-primary btn-animated mr-sm-4 mb-3 mb-sm-0" rel="nofollow" id="viewcart1"><i className="las la-shopping-cart mr-1" />view cart</Link>

                                    }


                                    <Link to="/OneStepCheck" onClick={() => Productaddcart(productdata.id, productdata.name, productdata.thumbnail, productdata.min_qty, (productdata.unit_price - (productdata?.discount_type == 'percent' ? ((productdata?.unit_price * productdata?.discount) / 100) : productdata.discount)), (productdata?.discount_type == 'percent' ? ((productdata?.unit_price * productdata?.discount) / 100) : productdata.discount), productdata.current_stock)} className="btn btn-primary btn-animated mr-sm-4 mb-3 mb-sm-0" rel="nofollow" ><i className="las la-shopping-cart mr-1" />Buy Now</Link>

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

export default featuredProduct
