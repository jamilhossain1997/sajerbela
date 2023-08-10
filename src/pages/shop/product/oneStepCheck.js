import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Label, FormGroup, Input, Collapse, Button, CardBody, Card } from 'reactstrap';
// import { Link } from 'react-router-dom';
import imgUrl from '../../../api/baseUrl';
import { useParams, Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import apiClient from "../../../api/http-common";
import { toast, ToastContainer } from 'react-toastify';
import { AiOutlinePlus } from "react-icons/ai";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from 'axios';

import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';



const oneStepCheck = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [prodata, setProdata] = useState(JSON.parse(localStorage.getItem("CartProduct")));
    const [shipping, setShipping] = useState([]);
    const [shopping, setShopping] = useState([]);
    const [address, setAddress] = useState([]);
    const [shippingMethod, setShippingMethod] = useState('')
    const [payment, setPayment] = useState('');
    // const [shippingPost,setShippingPost]=useState('')
    const [cartList, setCartList] = useState([])
    const [cartListAll, setCartListAll] = useState([])
    const history = useHistory()
    // Address
    const [collapse, SetCollapse] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('token')) {
            history.push('/OneStepCheck');
        } else {
            history.push('/otpLogin');
        }
    }, [])
    // useEffect(() => {
    //     apiClient.delete(`v1/cart/remove-all`)
    //         setTimeout(function () {
    //             window.location.reload()
    //         }, 1000)
    //         .then(res => {
    //             console.log(res)
    //         })
    // }, []);


    function toggle() {
        SetCollapse(!collapse);
        // this.setState({ collapse: !this.state.collapse });
    }


    // DropDown
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDrop = () => setDropdownOpen((prevState) => !prevState);

    useEffect(() => {
        window.scrollTo(0, 0)
        GetCartItems()
    }, []);
    useEffect(() => {
        apiClient.get(`/v1/cart/cart`)
            .then((res) => {
                console.log(res.data)
                setCartList(res.data)
            })
    }, [cartList]);

    useEffect(() => {
        apiClient.get(`/v1/cart/allCart`)
            .then((res) => {
                console.log(res.data)
                setCartListAll(res.data)
                // localStorage.removeItem("CartProduct")
            })
    }, [cartListAll])



    function GetCartItems() {
        var ItemCart = cartListAll;
        // if (ItemCart == null) {
        //     setTimeout(function () {
        //         window.location.reload()
        //     }, 1000);
        //     history.push(`/`)
        // }
        return ItemCart;
    }



    // console.log(GetCartItems());
    const RemoveItem = (id) => {
        apiClient.delete(`/v1/cart/Cartremove/${id}`)
            .then((res) => {
                console.log(res)
                toast.success('Product Item delect')
            })

    }

    useEffect(() => {
        localStorage.setItem('shippingMethod', JSON.stringify(shippingMethod));
    }, [shippingMethod]);
    useEffect(() => {
        const product = prodata?.map((item) => item)
        const cat = [...product]

        let cat1 = {
            id: cat[0]?.ProductID,
            product_id: cat[0]?.ProductID,
            color: cat[0]?.Color,
            // color: "",
            // choices: [SelectedSize],
            variations: cat[0]?.Size,
            variant: cat[0]?.Color,
            quantity: cat[0]?.Qty,
            price: cat[0]?.Rate,
            thumbnail: cat[0]?.ProductImage
        }

        let cat2 = {
            id: cat[1]?.ProductID,
            product_id: cat[1]?.ProductID,
            color: cat[1]?.Color,
            // color: "",
            // choices: [SelectedSize],
            variations: cat[1]?.Size,
            variant: cat[1]?.Color,
            quantity: cat[1]?.Qty,
            price: cat[1]?.Rate,
            thumbnail: cat[1]?.ProductImage
        }
        let cat3 = {
            id: cat[2]?.ProductID,
            product_id: cat[2]?.ProductID,
            color: cat[2]?.Color,
            // color: "",
            // choices: [SelectedSize],
            variations: cat[2]?.Size,
            variant: cat[2]?.Color,
            // variant: SelectedColor - SelectedSize,
            quantity: cat[2]?.Qty,
            price: cat[2]?.Rate,
            thumbnail: cat[2]?.ProductImage
        }

        let cat4 = {
            id: cat[3]?.ProductID,
            product_id: cat[3]?.ProductID,
            color: cat[3]?.Color,
            // color: "",
            // choices: [SelectedSize],
            variations: cat[3]?.Size,
            variant: cat[3]?.Color,
            // variant: SelectedColor - SelectedSize,
            quantity: cat[3]?.Qty,
            price: cat[3]?.Rate,
            thumbnail: cat[3]?.ProductImage
        }
        let cat5 = {
            id: cat[4]?.ProductID,
            product_id: cat[4]?.ProductID,
            color: cat[4]?.Color,
            // color: "",
            // choices: [SelectedSize],
            variations: cat[4]?.Size,
            variant: cat[4]?.Color,
            // variant: SelectedColor - SelectedSize,
            quantity: cat[4]?.Qty,
            price: cat[4]?.Rate,
            thumbnail: cat[4]?.ProductImage
        }

        let cat6 = {
            id: cat[5]?.ProductID,
            product_id: cat[5]?.ProductID,
            color: cat[5]?.Color,
            // color: "",
            // choices: [SelectedSize],
            variations: cat[5]?.Size,
            variant: cat[5]?.Color,
            // variant: SelectedColor - SelectedSize,
            quantity: cat[5]?.Qty,
            price: cat[5]?.Rate,
            thumbnail: cat[5]?.ProductImage
        }

        let cat7 = {
            id: cat[6]?.ProductID,
            product_id: cat[6]?.ProductID,
            color: cat[6]?.Color,
            // color: "",
            // choices: [SelectedSize],
            variations: cat[6]?.Size,
            variant: cat[6]?.Color,
            // variant: SelectedColor - SelectedSize,
            quantity: cat[6]?.Qty,
            price: cat[6]?.Rate,
            thumbnail: cat[6]?.ProductImage
        }

        let cat8 = {
            id: cat[7]?.ProductID,
            product_id: cat[7]?.ProductID,
            color: cat[7]?.Color,
            // color: "",
            // choices: [SelectedSize],
            variations: cat[7]?.Size,
            variant: cat[7]?.Color,
            // variant: SelectedColor - SelectedSize,
            quantity: cat[7]?.Qty,
            price: cat[7]?.Rate,
            thumbnail: cat[7]?.ProductImage
        }

        let cat9 = {
            id: cat[8]?.ProductID,
            product_id: cat[8]?.ProductID,
            color: cat[8]?.Color,
            // color: "",
            // choices: [SelectedSize],
            variations: cat[8]?.Size,
            variant: cat[8]?.Color,
            // variant: SelectedColor - SelectedSize,
            quantity: cat[8]?.Qty,
            price: cat[8]?.Rate,
            thumbnail: cat[8]?.ProductImage
        }

        let cat10 = {
            id: cat[9]?.ProductID,
            product_id: cat[9]?.ProductID,
            color: cat[9]?.Color,
            // color: "",
            // choices: [SelectedSize],
            variations: cat[9]?.Size,
            variant: cat[9]?.Color,
            // variant: SelectedColor - SelectedSize,
            quantity: cat[9]?.Qty,
            price: cat[9]?.Rate,
            thumbnail: cat[9]?.ProductImage
        }

        if (cat[0]) {
            apiClient.post(`/v1/cart/add`, cat1)
                .then(res => {
                    console.log(res);

                })
                .catch(err => {
                    console.log(err);

                })
        } else {

        }

        if (cat[1]) {
            apiClient.post(`/v1/cart/add`, cat2)
                .then(res => {
                    console.log(res.data);

                })
                .catch(err => {
                    console.log(err);

                })
        } else {

        }

        if (cat[2]) {
            apiClient.post(`/v1/cart/add`, cat3)
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);

                })
        } else {

        }

        if (cat[3]) {
            apiClient.post(`/v1/cart/add`, cat4)
                .then(res => {
                    console.log(res.data);

                })
                .catch(err => {
                    console.log(err);

                })
        } else {

        }

        if (cat[4]) {
            apiClient.post(`/v1/cart/add`, cat5)
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);

                })
        } else {

        }

        if (cat[5]) {
            apiClient.post(`/v1/cart/add`, cat6)
                .then(res => {
                    console.log(res.data);

                })
                .catch(err => {
                    console.log(err);

                })
        } else {

        }

        if (cat[6]) {
            apiClient.post(`/v1/cart/add`, cat7)
                .then(res => {
                    console.log(res.data);

                })
                .catch(err => {
                    console.log(err);

                })
        } else {

        }

        if (cat[7]) {
            apiClient.post(`/v1/cart/add`, cat8)
                .then(res => {
                    console.log(res.data);

                })
                .catch(err => {
                    console.log(err);

                })
        } else {

        }

        if (cat[8]) {
            apiClient.post(`/v1/cart/add`, cat9)
                .then(res => {
                    console.log(res.data);

                })
                .catch(err => {
                    console.log(err);

                })
        } else {

        }

        if (cat[9]) {
            apiClient.post(`/v1/cart/add`, cat10)
                .then(res => {
                    console.log(res.data);


                })
                .catch(err => {
                    console.log(err);

                })
        } else {

        }
    }, [])

    const shippingOnChange = (id) => {
        setShippingMethod(id);
        let ship = {
            cart_group_id: cartList.cart_group_id,
            id: id.id
        }
        apiClient.post(`/v1/shipping-method/choose-for-order`, ship)
            .then(res => {
                console.log(res);
                toast.success('Shipping Add')
            })
            .catch(err => {
                console.log(err);
                toast.warning('Again Shipping Add')
            })

    }



    useEffect(() => {
        apiClient.get(`/v1/products/shipping-methods`)
            .then(res => {
                setShopping(res.data)
            })
    }, [])



    const onSubmit = data => {
        apiClient.post(`/v1/customer/address/add`, data)
            .then(res => {
                console.log(res)
                history.push('/OneStepCheck')
                toast.success("Address Add");
            })
            .catch(err => {
                console.log(err);
            })
    }


    useEffect(() => {
        apiClient.get(`/v1/customer/address/list`)
            .then(res => {
                setAddress(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [address])



    const orderPlace = (add_id) => {
        const order = {
            shipping_cost: shippingMethod?.cost,
            shipping_method_id: shippingMethod.id
        }

        if (address?.address) {
            if (shippingMethod.cost) {
                if (payment) {
                    apiClient.post(`/v1/customer/order/place?address_id=${add_id}`, order)
                        .then(res => {
                            console.log(res)
                            localStorage.removeItem("CartProduct")
                            history.push('/order-complate')
                        })
                        .catch(err => {
                            toast.warning('Plz Reload your Pages')
                            console.log(err);
                        })
                } else {
                    toast.error('Plz Select Payment Method')
                }
            } else {
                toast.error('Plz shipping Method ')
            }
        } else {
            toast.error('Plz shipping Address Add ')
        }



    }
    const convert = 0.011904761904762;
    const Subtotal = (shippingMethod ? (Number(Math.round(GetCartItems()?.reduce((fr, CartItem) => fr + (CartItem.quantity * CartItem.price), 0).toLocaleString(navigator.language, { minimumFractionDigits: 0 }) / convert), 2) + Number(Math.round(shippingMethod?.cost / convert))) : (Math.round((GetCartItems()?.reduce((fr, CartItem) => fr + (CartItem.quantity * CartItem.price), 0).toLocaleString(navigator.language, { minimumFractionDigits: 0 })) / convert, 2)));
    return (
        <>
            <HelmetProvider>
                <ToastContainer autoClose={5000} />
                <Helmet>
                    <meta http-equiv='cache-control' content='no-cache' />
                    <meta http-equiv='expires' content='0' />
                    <meta http-equiv='pragma' content='no-cache' />
                    <title>Checkout</title>
                </Helmet>
                {
                    (GetCartItems() != null && GetCartItems().length > 0) ?
                        <div class="container mb-5">
                            <div class="py-5 text-center">
                                {/* <h2>Checkout form</h2>
                    <p class="lead">Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p> */}
                            </div>

                            <div class="row">
                                <div class="col-md-6 order-md-2 mb-4">
                                    <h4 class="d-flex justify-content-between align-items-center mb-3">
                                        <span class="text-muted">Your cart</span>
                                        {/* <span class="badge badge-secondary badge-pill">3</span> */}
                                    </h4>
                                    <ul class="list-group mb-3">
                                        <table class="table table-responsive">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Product</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">price</th>
                                                    <th scope="col">Discount</th>
                                                    <th scope="col">Quantity</th>
                                                    <th scope="col">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cartListAll?.map((CartItem, index) => {
                                                    return (
                                                        <>
                                                            <tr>
                                                                <td>
                                                                    <img className="img-fluid" src={`${imgUrl}storage/app/public/product/thumbnail/${CartItem.thumbnail}`} style={{ height: '100px' }} alt="" />
                                                                </td>
                                                                <td>
                                                                    <div className="media-body ml-3">
                                                                        <div className="product-title mb-2"><Link className="link-title" to="#">{CartItem.name}</Link>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media-body ml-3">
                                                                        <div className="product-title mb-2"><Link className="link-title" to="#">{Math.round(((CartItem.price) + (CartItem.discount)) / convert, 2)}</Link>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="media-body ml-3">
                                                                        <div className="product-title mb-2"><Link className="link-title" to="#">{Math.round((CartItem.discount) / convert, 2)}</Link>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="d-flex justify-content-center align-items-center">
                                                                        {CartItem?.quantity}
                                                                        {/* <Link className="btn-product btn-product-up" onClick={() => RemoveQty(index)}> <i className="las la-minus" />
                                                    </Link> */}
                                                                        {/* <input className="form-product" type="number" name="form-product" value={CartItem.Qty} /> */}
                                                                        {/* <Link className="btn-product btn-product-down" onClick={() => AddQty(index)}> <i className="las la-plus" />
                                                    </Link> */}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <span className="product-price text-dark font-w-6">
                                                                        ৳{Math.round((CartItem?.price * CartItem?.quantity).toLocaleString(navigator.language, { minimumFractionDigits: 0 }) / convert, 2)}
                                                                    </span>
                                                                    <Link type="submit" className="btn btn-primary btn-sm" onClick={() => RemoveItem(CartItem.id)}><i className="las la-times" />
                                                                    </Link>
                                                                </td>
                                                            </tr>

                                                        </>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </ul>

                                    <ul class="list-group mb-3">
                                        <li class="list-group-item d-flex justify-content-between lh-condensed">
                                            <div>
                                                <h6 class="my-0">Product Price</h6>
                                            </div>
                                            <span class="text-muted">৳ {Math.round((GetCartItems()?.reduce((fr, CartItem) => fr + ((CartItem.quantity * CartItem.price) + (CartItem.quantity * CartItem.discount)), 0).toLocaleString(navigator.language, { minimumFractionDigits: 0 })) / convert, 2)}</span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between lh-condensed">
                                            <div>
                                                <h6 class="my-0">Discount</h6>
                                            </div>
                                            <span class="text-muted">৳ {Math.round((GetCartItems()?.reduce((fr, CartItem) => fr + (CartItem.quantity * CartItem.discount), 0).toLocaleString(navigator.language, { minimumFractionDigits: 0 })) / convert, 2)}</span>
                                        </li>

                                        <li class="list-group-item d-flex justify-content-between lh-condensed">
                                            <div>
                                                <h6 class="my-0">Subtotal</h6>

                                            </div>
                                            <span class="text-muted">৳ {Math.round((GetCartItems()?.reduce((fr, CartItem) => fr + (CartItem.quantity * CartItem.price), 0).toLocaleString(navigator.language, { minimumFractionDigits: 0 })) / convert, 2)}</span>
                                        </li>

                                        <li class="list-group-item d-flex justify-content-between lh-condensed">
                                            <div>
                                                <h6 class="my-0">Shipping Cost</h6>
                                            </div>
                                            <span class="text-muted">৳{shippingMethod ? (Math.round(shippingMethod.cost / convert)) : 0} </span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between lh-condensed">
                                            <div>
                                                <h6 class="my-0">Tax</h6>

                                            </div>
                                            <span class="text-muted">৳ 0</span>
                                        </li>

                                        <li class="list-group-item d-flex justify-content-between">
                                            <span>Total</span>
                                            <strong>৳{Subtotal}</strong>
                                        </li>
                                    </ul>

                                </div>
                                <div className="col-md-6 order-md-1">

                                    <h4 className="mb-3">Billing address</h4>

                                    {

                                        address.phone ?
                                            <>
                                                <Card className="mb-3">
                                                    <CardBody>
                                                        Name: {address?.contact_person_name}<br />
                                                        phone:{address?.phone}<br />
                                                        Address:{address?.address}
                                                    </CardBody>
                                                </Card>
                                                <div class="d-block my-3">
                                                    <div class="custom-control custom-radio">
                                                        <input id="credit1" name="paymentMethod" type="checkbox" class="custom-control-input" required checked />
                                                        <label class="custom-control-label" for="credit1">Select My Address</label>
                                                    </div>
                                                </div>
                                            </> : null
                                    }


                                    <div>
                                        {
                                            collapse == true ? <>
                                                <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>
                                                    {/* <AiOutlinePlus className='mr-2' /> */}
                                                    <i className="las la-times" />
                                                </Button>

                                            </> :
                                                <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>
                                                    <AiOutlinePlus className='mr-2' />
                                                    <strong className='mt-2'>New Address</strong>
                                                </Button>
                                        }

                                        <Collapse isOpen={collapse}>
                                            <form class="needs-validation" onSubmit={handleSubmit(onSubmit)}>
                                                <div class="row">
                                                    <div class="col-md-6 mb-3">
                                                        <label for="firstName">Name</label>
                                                        <input type="text" class="form-control" {...register("contact_person_name")} id="firstName" placeholder required />
                                                        <div class="invalid-feedback">
                                                            Valid name is required.
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 mb-3">
                                                        <label for="lastName">Phone</label>
                                                        <input type="text" class="form-control" {...register("phone")} id="lastName" placeholder required />
                                                        <div class="invalid-feedback">
                                                            Valid Phone is required.
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6 mb-3">
                                                        <label for="firstName">Address Type</label>
                                                        <select {...register("address_type")} className="form-control" required>
                                                            <option value="Home">Home</option>
                                                            <option value="Alaska">OFFICE</option>
                                                        </select>
                                                        <div class="invalid-feedback">
                                                            Valid name is required.
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 mb-3">
                                                        <label for="lastName">City</label>
                                                        <input type="text"  {...register("city")} class="form-control" id="lastName" placeholder required />
                                                        <div class="invalid-feedback">
                                                            Valid Phone is required.
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="mb-3">
                                                    <label for="address">Address</label>
                                                    <input type="text" {...register("address")} class="form-control" id="address" placeholder="1234 Main St" required />
                                                    <div class="invalid-feedback">
                                                        Please enter your shipping address.
                                                    </div>
                                                </div>

                                                <hr class="mb-4" />

                                                <div class="row">
                                                    <div className='col-md-4 '>
                                                        <button class="btn btn-success btn-lg btn-block" type="submit">Add</button>
                                                    </div>
                                                </div>

                                            </form>
                                        </Collapse>
                                    </div>

                                    <hr class="mb-4" />

                                    <h4 class="mb-3">Shipping Methods</h4>

                                    <Dropdown isOpen={dropdownOpen} toggle={toggleDrop}>
                                        <DropdownToggle caret size="lg" style={{ fontSize: `15px`, backgroundColor: `transparent`, color: `#000`, width: `100%` }}>

                                            {
                                                shippingMethod.title
                                                    ? <>{shippingMethod.title}-{Math.round(shippingMethod.cost / convert)}৳</> : <>Select Shipping Methods</>
                                            }
                                        </DropdownToggle>
                                        <DropdownMenu style={{ fontSize: `15px`, color: `#000`, width: `100%` }}>
                                            {
                                                shopping?.map((item, i) => (
                                                    <DropdownItem key={i} type="button" class="btn btn-primary mr-2" onClick={() => shippingOnChange(item)}>{item?.title}-{Math.round(item?.cost / convert)}৳</DropdownItem>
                                                ))
                                            }
                                        </DropdownMenu>
                                    </Dropdown>
                                    <hr class="mb-4" />
                                    <h4 class="mb-3">Payment</h4>
                                    <div class="form-group">
                                        <select onChange={(e) => setPayment(e.target.value)} className="form-control" id="exampleFormControlSelect1">
                                            <option>Select payment Method</option>
                                            <option value='cash on delivery'>cash on delivery</option>
                                        </select>
                                    </div>
                                    {/* <form>
                            <div class="d-block my-3">
                                <div class="custom-control custom-radio">
                                    <input id="credit" name="paymentMethod" type="radio" class="custom-control-input" required />
                                    <label class="custom-control-label" for="credit">cash on delivery</label>
                                </div>
                            </div>
                            <hr class="mb-4" />
                        </form> */}
                                    <h4 class="mb-3">Discount</h4>
                                    <form class="card p-2 mb-3">
                                        <div class="input-group">
                                            <input type="text" className="form-control" placeholder="Discount code(optional)" />
                                            <div class="input-group-append">
                                                <button type="submit" className="btn btn-secondary">Apply</button>
                                            </div>
                                        </div>
                                    </form>
                                    <hr class="mb-4" />
                                    <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={() => orderPlace(address?.id)}>Order Place</button>
                                </div>
                            </div>
                        </div> :
                        <Row>
                            <Col md={12} className="text-center pb-11">
                                <h3 className="mb-4">Your cart is Currently Empty.</h3>
                                <Link className="btn btn-primary mr-3" to="/">Homes</Link>
                                <Link className="btn btn-primary" to="/discontproduct">Continue Shoppings</Link>

                            </Col>
                        </Row>
                }


            </HelmetProvider>
        </>
    )
}

export default oneStepCheck