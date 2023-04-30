import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import Pageheading from '../../widgets/pageheading';
import apiClient from '../../api/http-common';


class ordercomplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderList: []
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0)
    apiClient.get(`/v1/customer/order/list-last`)
      .then(res => {
        console.log(res.data)
        let orderList = res.data;
        this.setState({ orderList })
        // orderList(res.data)
      })
  }
  render() {
    return (
      <>
        {/*hero section start*/}
        <section className="bg-light">
          <Pageheading foldername={"Shop"} title={"Order Completed"} />
        </section>
        {/*hero section end*/}
        {/*body content start*/}
        <div className="page-content">
          <section className="text-center pb-11">
            <Container>
              <Row>
                <Col md={12}>
                  <h3 className="mb-4">Thank you for purchasing, Your order is complete</h3>
                  <Link className="btn btn-primary btn-animated mr-2" to="/"><i className="las la-home mr-1" />Home</Link>
                  <Link className="btn btn-dark btn-animated mr-2" to={`/invoice/${this.state.orderList?.id}`}><i className="las la-shopping-cart mr-1" />Invoice</Link>
                </Col>
              </Row>
            </Container>
          </section>
        </div>
        {/*body content end*/}
      </>
    );
  }
}

export default ordercomplate;