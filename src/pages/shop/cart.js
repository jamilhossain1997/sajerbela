import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Label, FormGroup, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import Pageheading from '../../widgets/pageheading';
import { useHistory } from 'react-router-dom';
import imgUrl from '../../api/baseUrl';
import { useForm } from "react-hook-form";
import apiClient from "../../api/http-common";



const cart = () => {


  const [prodata, setProdata] = useState(JSON.parse(localStorage.getItem("CartProduct")));
  const history = useHistory();
  const [shopping, setShopping] = useState([]);
  const [shippingMethod, setShippingMethod] = useState('')
  // const [shipCost, setShipcost] = useState('')

  console.log(shippingMethod);

  useEffect(() => {
    localStorage.setItem('shippingMethod', JSON.stringify(shippingMethod));
  }, [shippingMethod]);

  // const [shopCharge, setShopCharge] = useState(JSON.parse(localStorage.getItem("shopping")))

  useEffect(() => {
    if (localStorage.getItem('token')) {
      history.push('/cart');
      // window.location.reload(1)
      // location.reload()
    } else {
      history.push('/sign-in');
    }
  }, [])


  useEffect(() => {
    window.scrollTo(0, 0)
    apiClient.get(`/v1/products/shipping-methods`)
      .then(res => {
        setShopping(res.data)
      })
  }, [])



  const prductSubmit = () => {
    const product = prodata.map((item) => item)
    const cat = [...product]
    // console.log(product.ProductID);
    let cat1 = {
      id: cat[0]?.ProductID,
      product_id: product?.ProductID,
      // shipping_cost: shopCharge,
      discount: cat[0]?.discount && 0,
      // color: "",
      choices: [],
      variations: [],
      // variant: "",
      quantity: cat[0]?.Qty,
      price: cat[0]?.Rate,
      thumbnail: cat[0]?.ProductImage
    }

    let cat2 = {
      id: cat[1]?.ProductID,
      product_id: product?.ProductID,
      // shipping_cost: shopCharge,
      discount: cat[1]?.discount && 0,
      // color: "",
      choices: [],
      variations: [],
      // variant: "",
      quantity: cat[1]?.Qty,
      price: cat[1]?.Rate,
      thumbnail: cat[1]?.ProductImage
    }

    let cat3 = {
      id: cat[2]?.ProductID,
      product_id: product?.ProductID,
      // shipping_cost: shopCharge,
      discount: cat[2]?.discount && 0,
      // color: "",
      choices: [],
      variations: [],
      // variant: "",
      quantity: cat[2]?.Qty,
      price: cat[2]?.Rate,
      thumbnail: cat[2]?.ProductImage
    }

    let cat4 = {
      id: cat[3]?.ProductID,
      product_id: product?.ProductID,
      // shipping_cost: shopCharge,
      discount: cat[3]?.discount && 0,
      // color: "",
      choices: [],
      variations: [],
      // variant: "",
      quantity: cat[3]?.Qty,
      price: cat[3]?.Rate,
      thumbnail: cat[3]?.ProductImage
    }

    let cat5 = {
      id: cat[4]?.ProductID,
      product_id: product?.ProductID,
      // shipping_cost: shopCharge,
      discount: cat[4]?.discount && 0,
      // color: "",
      choices: [],
      variations: [],
      // variant: "",
      quantity: cat[4]?.Qty,
      price: cat[4]?.Rate,
      thumbnail: cat[4]?.ProductImage
    }
    if (cat[0]) {
      apiClient.post(`/v1/cart/add`, cat1)
        .then(res => {
          // console.log(res.data);
          // history.push('/checkout')
          // history.push('/checkout')
        })
        .catch(err => {
          console.log(err);
          alert('places Pages Reload')
        })

    } else {

    }

    if (cat[1]) {
      apiClient.post(`/v1/cart/add`, cat2)
        .then(res => {
          // console.log(res.data);
          // history.push('/checkout')
          // history.push('/checkout')
        })
        .catch(err => {
          console.log(err);
          alert('places Pages Reload')
        })

    } else {

    }

    if (cat[2]) {
      apiClient.post(`/v1/cart/add`, cat3)
        .then(res => {
          // console.log(res.data);
          // history.push('/checkout')
          // history.push('/checkout')
        })
        .catch(err => {
          // console.log(err);
          // alert('places Pages Reload')
        })

    } else {

    }

    if (cat[3]) {
      apiClient.post(`/v1/cart/add`, cat4)
        .then(res => {
          // console.log(res.data);
          // history.push('/checkout')
          // history.push('/checkout')
        })
        .catch(err => {
          console.log(err);
          alert('places Pages Reload')
        })

    } else {

    }

    if (cat[4]) {
      apiClient.post(`/v1/cart/add`, cat5)
        .then(res => {
          console.log(res.data);
          history.push('/checkout')
          // history.push('/checkout')
        })
        .catch(err => {
          console.log(err);
          alert('places Pages Reload')
        })

    } else {

    }

    if (cat) {
      history.push('/checkout')
    } else {

    }

  }


  function GetCartItems() {
    return JSON.parse(localStorage.getItem("CartProduct"));
  }
  const RemoveItem = (Index) => {
    var CartValue = JSON.parse(localStorage.getItem("CartProduct"));
    CartValue = CartValue.slice(0, Index).concat(CartValue.slice(Index + 1, CartValue.length));
    localStorage.removeItem("CartProduct");
    localStorage.setItem("CartProduct", JSON.stringify(CartValue));
  }

  const AddQty = (Index) => {
    var CartValue = JSON.parse(localStorage.getItem("CartProduct"));
    CartValue[Index].Qty = parseInt(CartValue[Index].Qty + 1);
    localStorage.removeItem("CartProduct");
    localStorage.setItem("CartProduct", JSON.stringify(CartValue));
  }

  const RemoveQty = (Index) => {
    var CartValue = JSON.parse(localStorage.getItem("CartProduct"));

    if (CartValue[Index].Qty != 1) {

      CartValue[Index].Qty = parseInt(CartValue[Index].Qty - 1);
      localStorage.removeItem("CartProduct");
      localStorage.setItem("CartProduct", JSON.stringify(CartValue));
    } else {
      RemoveItem(Index);
    }
  }

  // function refreshPage() {
  //   window.location.reload();
  // }

  const convert = 0.011904761904762;
  return (
    <>
      {/*hero section start*/}
      <section className="bg-light">
        <Pageheading foldername={"shop"} title={"Product Cart"} />
      </section>
      {/*hero section end*/}
      {/*body content start*/}
      <div className="page-content" >
        <section>
          <Container>
            {(GetCartItems() != null && GetCartItems().length > 0) ?
              <Row>

                <div className="col-lg-8">
                  <div className="table-responsive">
                    <table className="cart-table table">
                      <thead>
                        <tr>
                          <th scope="col">Product</th>
                          <th scope="col">Name</th>
                          <th scope="col">price</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {GetCartItems().map((CartItem, index) => (
                          <tr>


                            <td>
                              <img className="img-fluid" src={`${imgUrl}storage/app/public/product/thumbnail/${CartItem.ProductImage}`} style={{ height: '100px' }} alt="" />
                            </td>
                            {/* <Link to="/">
                                </Link> */}
                            <td>
                              <div className="media-body ml-3">
                                <div className="product-title mb-2"><Link className="link-title" to="#">{CartItem.ProductName}</Link>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="media-body ml-3">
                                <div className="product-title mb-2"><Link className="link-title" to="#">{Math.round((CartItem.Rate) / convert, 2)}</Link>
                                </div>
                              </div>
                            </td>


                            {/* <td> <span className="product-price text-muted">
                              ${CartItem.Rate.toLocaleString(navigator.language, { minimumFractionDigits: 0 }) / convert}
                            </span>
                            </td> */}
                            <td>
                              <div className="d-flex justify-content-center align-items-center">
                                <Link className="btn-product btn-product-up" onClick={() => RemoveQty(index)}> <i className="las la-minus" />
                                </Link>
                                <input className="form-product" type="number" name="form-product" value={CartItem.Qty} />
                                <Link className="btn-product btn-product-down" onClick={() => AddQty(index)}> <i className="las la-plus" />
                                </Link>
                              </div>
                            </td>
                            <td> <span className="product-price text-dark font-w-6">
                              ৳{Math.round((CartItem.Rate * CartItem.Qty).toLocaleString(navigator.language, { minimumFractionDigits: 0 }) / convert, 2)}
                            </span>
                              <Link type="submit" className="btn btn-primary btn-sm" onClick={() => RemoveItem(index)}><i className="las la-times" />
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <FormGroup>
                    <Label for="exampleSelect">
                      Shipping Cost
                    </Label>
                    <Input
                      id="exampleSelect"
                      name="select"
                      type="select"
                      onChange={e => setShippingMethod(e.target.value)}
                    >
                      {
                        shopping.map((item, i) => (
                          <option key={i} value={item.id}>
                            {item.title}-{Math.round(item.cost / convert)}
                          </option>
                        ))
                      }
                    </Input>
                  </FormGroup>

                  {/* <div class="form-check">
                    {
                      shopping.map((item, i) => (
                        <>
                          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                          <label class="form-check-label" for="flexCheckDefault" onClick={() => shippingCost(item.cost, item.id)}>
                            {item.title}-{Math.round(item.cost / convert)}
                          </label>
                        </>

                      ))
                    }

                  </div> */}

                  {/* <form>
                    <FormGroup check>
                      {
                        shopping.map((item, i) => (
                          <>
                            <input type="checkbox" />
                            <label onClick={() => shippingCost(Math.round(item.cost / convert), item.id)} check>
                              {item.title}-{Math.round(item.cost / convert)}
                            </label>
                          </>
                        ))
                      }

                    </FormGroup>
                  </form> */}

                  <div className="d-md-flex align-items-end justify-content-between border-top pt-5">
                    <div>
                      <label className="text-black h4" htmlFor="coupon">Coupon</label>
                      <p>Enter your coupon code if you have one.</p>
                      <Row className="form-row">
                        <Col>
                          <input className="form-control" id="coupon" placeholder="Coupon Code" type="text" />
                        </Col>
                        <div className="col col-auto">
                          <button className="btn btn-dark btn-animated">Apply Coupon</button>
                        </div>
                      </Row>
                    </div>
                    {/* <button className="btn btn-primary btn-animated mt-3 mt-md-0">Update Cart</button> */}
                  </div>
                </div>
                <div className="col-lg-4 pl-lg-5 mt-8 mt-lg-0">
                  <div className="shadow rounded p-5">
                    <h4 className="text-black text-center mb-2">Cart Totals</h4>
                    <div className="d-flex justify-content-between align-items-center border-bottom py-3"> <span className="text-muted">Subtotal</span>
                      <span className="text-dark">৳{Math.round((GetCartItems().reduce((fr, CartItem) => fr + (CartItem.Qty * CartItem.Rate), 0).toLocaleString(navigator.language, { minimumFractionDigits: 0 })) / convert, 2)}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center border-bottom py-3"> <span className="text-muted">Tax</span>  <span className="text-dark">$00.00</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center pt-3 mb-5"> <span className="text-dark h5">Total</span>
                      <span className="text-dark">৳{Math.round((GetCartItems().reduce((fr, CartItem) => fr + (CartItem.Qty * CartItem.Rate), 0).toLocaleString(navigator.language, { minimumFractionDigits: 0 })) / convert, 2)}</span>
                    </div>
                    <button className="btn btn-primary btn-animated btn-block" onClick={prductSubmit} >Proceed To Checkout</button>
                    <Link className="btn btn-dark btn-animated mt-3" to="/discontproduct">Continue Shopping</Link>
                  </div>
                </div>

              </Row>
              :
              <Row>
                <Col md={12} className="text-center pb-11">
                  <h3 className="mb-4">Your cart is Currently Empty.</h3>
                  <Link className="btn btn-primary mr-3" to="/">Homes</Link>
                  <Link className="btn btn-primary" to="/discontproduct">Continue Shoppings</Link>

                </Col>
              </Row>
            }
          </Container>
        </section>
      </div>
      {/*body content end*/}
    </>
  );
}

export default cart