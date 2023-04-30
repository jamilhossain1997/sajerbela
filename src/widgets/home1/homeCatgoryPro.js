import React from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import OwlCarousel from 'react-owl-carousel';
import { Link } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css'
import apiClient from '../../api/http-common';
import imgUrl from '../../api/baseUrl';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RiShoppingBag3Line } from "react-icons/ri";
import { BiCaretRightCircle } from "react-icons/bi";
window.fn = OwlCarousel;


// const bestSeller = async () => {
//     const result = await apiClient.get(`/v1/products/home-categories`)
//     return result.data;
// }
class Newcollection extends React.Component {



    constructor(props) {
        super(props);
        this.quickview = this.quickview.bind(this);
        this.onChangeColor = this.onChangeColor.bind(this);
        this.state = {
            modelview: false,
            viewproduct: [],
            cat: [],
            SelectedSize: "",
            selectedColor: "",
            options: {
                loop: true,
                nav: true,
                dots: false,
                responsive: {
                    0: {
                        items: 1,
                    },
                    300: {
                        items: 2,
                    },
                    600: {
                        items: 2,
                    },
                    1000: {
                        items: 5
                    },
                },
            },
        };

    }



    componentDidMount() {
        apiClient.get(`v1/products/home-categories`)
            .then(res => {
                const cat = res.data;
                this.setState({ cat });
            })
    }

    quickview() {
        this.setState(prevState => ({
            modelview: !prevState.modelview
        }));
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

    onChangeColor(event) {
        console.log(event.target.value);

        this.setState({
            selectedColor: event.target.value
        });
    }

    onChangeSize(event) {
        console.log(event.target.value);
        this.setState({
            SelectedSize: event.target.value
        });
    }
    Productaddwishlist(ProductID, ProductName, ProductImage, Qty, Rate, discount, StockStatus) {
        var Cart = JSON.parse(localStorage.getItem("WishlistProduct"));
        if (Cart == null)
            Cart = new Array();

        let Productadd = Cart.find(product => product.ProductID === ProductID);
        if (Productadd == null) {

            Cart.push({ ProductID: ProductID, ProductName: ProductName, ProductImage: ProductImage, Qty: Qty, Rate: Rate, Discount: discount, StockStatus: StockStatus });
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

    onChangeColor(event) {
        console.log(event.target.value);

        this.setState({
            selectedColor: event.target.value
        });
    }

    onChangeSize(event) {
        console.log(event.target.value);
        this.setState({
            SelectedSize: event.target.value
        });
    }

    render() {
        const { viewproduct } = this.state;
        const convert = 0.011904761904762;



        // const { isLoading, error, data } = useQuery('repoData1', bestSeller);
        return (
            <>
                <HelmetProvider>
                    <ToastContainer autoClose={5000} />
                    {
                        this.state.cat?.map((cat, i) => {

                            return (
                                <>
                                    <Row className="justify-content-center text-center mb-5" key={i}>
                                        <Col lg={8} md={10}>
                                            <div className="mb-5">
                                                <h6 className="text-primary mb-0">
                                                    — category gallery
                                                </h6>
                                                <h2 className="mb-0">{cat.name}</h2>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="shadow p-sm-4 p-2 bg-white mb-2">
                                        <Row>
                                            <Col>
                                                {/* Tab panes */}
                                                <div className="tab-content p-0">

                                                    <OwlCarousel
                                                        className="owl-carousel no-pb owl-2"
                                                        {...this.state.options}
                                                        navText={["<span class='la la-angle-left'><span></span></span>", "<span class='la la-angle-right'><span></span></span>"]}

                                                    >
                                                        {cat.products?.map((productdata, index) => {

                                                            return (

                                                                <div className="item" key={index}>
                                                                    <div className="card product-card">
                                                                        {!this.WishlistItems(productdata.id) ? (
                                                                            <Link
                                                                                to="#"
                                                                                onClick={() => this.Productaddwishlist(productdata.id, productdata.name, productdata.thumbnail, productdata.min_qty, (productdata.unit_price - (productdata?.discount_type == 'percent' ? ((productdata?.unit_price * productdata?.discount) / 100) : productdata.discount)), (productdata?.discount_type == 'percent' ? ((productdata?.unit_price * productdata?.discount) / 100) : productdata.discount), productdata.current_stock)}
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

                                                                        {/* <img className="card-img-top card-img-back" src={require(`http://127.0.0.1:8000/storage/product/thumbnail/${productdata.images}`).default} alt="..." /> */}
                                                                        {/* <img className="card-img-top card-img-front" src={require(`http://127.0.0.1:8000/storage/product/thumbnail/${productdata.thumbnail}`).default} alt="..." /> */}
                                                                        {
                                                                            productdata.video_url ?
                                                                                <Link className="card-img-hover d-block" to={`/product-single/${productdata.slug}`}>
                                                                                    <img className="card-img-top card-img-back" src={`${imgUrl}storage/app/public/product/${productdata.images[0]}`} alt="hello" />
                                                                                    <img className="card-img-top card-img-front" src={`${imgUrl}storage/app/public/product/thumbnail/${productdata.thumbnail}`} alt="hello" />
                                                                                    <div style={{ zIndex: `9999`, marginTop: `-138px`, marginLeft: `80px` }}>
                                                                                        <BiCaretRightCircle size={70} />
                                                                                    </div>

                                                                                </Link>
                                                                                :
                                                                                <Link className="card-img-hover d-block" to={`/product-single/${productdata.slug}`}>
                                                                                    <img className="card-img-top card-img-back" src={`${imgUrl}storage/app/public/product/${productdata.images[0]}`} alt="hello" />
                                                                                    <img className="card-img-top card-img-front" src={`${imgUrl}storage/app/public/product/thumbnail/${productdata.thumbnail}`} alt="hello" />

                                                                                </Link>


                                                                        }
                                                                        {/* <BiCaretRightCircle width={10} style={{ width: `20px` }} /> */}




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
                                                                                    {/* <div className="star-rating"><i className="las la-star" /><i className="las la-star" /><i className="las la-star" /><i className="las la-star" /><i className="las la-star" />
                                                                                    </div> */}
                                                                                </div>
                                                                            </div>
                                                                            {
                                                                                productdata.current_stock > 0 ?
                                                                                    <>
                                                                                        <div className="card-footer bg-transparent border-0">
                                                                                            <div className="product-link d-flex align-items-center justify-content-center">
                                                                                                {!this.CartItems(productdata.id) ? (
                                                                                                    <Link
                                                                                                        to="/OneStepCheck"
                                                                                                        onClick={() => this.Productbuycart(productdata.id, productdata.name, productdata.thumbnail, productdata.min_qty, (productdata.unit_price - (productdata?.discount_type == 'percent' ? ((productdata?.unit_price * productdata?.discount) / 100) : productdata.discount)), (productdata?.discount_type == 'percent' ? ((productdata?.unit_price * productdata?.discount) / 100) : productdata.discount), selectedColor, SelectedSize, productdata.current_stock)}
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

                                                                                                {!this.CartItems(productdata.id) ? (
                                                                                                    <Link
                                                                                                        to="#"
                                                                                                        onClick={() => this.Productaddcart(productdata.id, productdata.name, productdata.thumbnail, productdata.min_qty, (productdata.unit_price - (productdata?.discount_type == 'percent' ? ((productdata?.unit_price * productdata?.discount) / 100) : productdata.discount)), (productdata?.discount_type == 'percent' ? ((productdata?.unit_price * productdata?.discount) / 100) : productdata.discount), productdata.current_stock)}
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
                                                                                                <Link to="#" onClick={() => this.onClickQuickView(productdata)} className="btn btn-view" id="quickview1">
                                                                                                    <i className="las la-eye" />
                                                                                                </Link>
                                                                                            </div>
                                                                                        </div>
                                                                                    </>
                                                                                    :
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
                                                                </div>
                                                            )
                                                        }
                                                        )}
                                                    </OwlCarousel>

                                                </div>
                                            </Col>
                                        </Row>

                                    </div>

                                </>
                            )
                        })
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
                                                <Link to="#" onClick={() => this.Productaddcart(viewproduct.id, viewproduct.name, viewproduct.thumbnail, viewproduct.min_qty, (viewproduct.unit_price - (viewproduct?.discount_type == 'percent' ? ((viewproduct?.unit_price * viewproduct?.discount) / 100) : viewproduct.discount)), (viewproduct?.discount_type == 'percent' ? ((viewproduct?.unit_price * viewproduct?.discount) / 100) : viewproduct.discount), viewproduct.current_stock)} className="btn btn-primary btn-animated mr-sm-4 mb-3 mb-sm-0" rel="nofollow" ><i className="las la-shopping-cart mr-1" />Add To Cart</Link>
                                                :
                                                <Link to="/OneStepCheck" className="btn btn-primary btn-animated mr-sm-4 mb-3 mb-sm-0" rel="nofollow" id="viewcart1"><i className="las la-shopping-cart mr-1" />view cart</Link>

                                            }


                                            <Link to="/OneStepCheck" onClick={() => this.Productaddcart(viewproduct.id, viewproduct.name, viewproduct.thumbnail, viewproduct.min_qty, (viewproduct.unit_price - (viewproduct?.discount_type == 'percent' ? ((viewproduct?.unit_price * viewproduct?.discount) / 100) : viewproduct.discount)), (viewproduct?.discount_type == 'percent' ? ((viewproduct?.unit_price * viewproduct?.discount) / 100) : viewproduct.discount), viewproduct.current_stock)} className="btn btn-primary btn-animated mr-sm-4 mb-3 mb-sm-0" rel="nofollow" ><i className="las la-shopping-cart mr-1" />Buy Now</Link>

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

                </HelmetProvider>
            </>
        )
    }
}

export default Newcollection;
