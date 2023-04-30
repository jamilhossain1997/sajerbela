import React, { useState, useEffect } from "react";
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, Modal, ModalHeader, ModalBody, Row, Col, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';
// import { toast, ToastContainer } from 'react-toastify';
import classnames from "classnames";
import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useQuery } from "react-query";
import apiClient from "../../api/http-common";
import imgUrl from "../../api/baseUrl";
import axios from "axios";

// const categorapi = async () => {
//     const result = await apiClient.get(`/v1/categories/`);
//     return result.data;
// };
const Categories = () => {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const options = {
        loop: true,
        nav: true,
        dots: false,
        margin: 10,
        responsive: {
            0: {
                items: 1,
            },
            300: {
                items: 2,
            },
            600: {
                items: 4,
            },
            1000: {
                items: 6,
            },
        },
    };

    useEffect(() => {

        apiClient.get(`/v1/categories`)
            .then(res => {
                setCategory(res.data)
                setLoading(false)
            })

    }, []);

    if (loading) {
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

    return (
        <Container fluid className="p-5">
            <Row className="justify-content-center text-center">
                <Col lg={8} md={10}>
                    <div className="mb-4">
                        <h6 className="text-primary mb-1">— Categories gallery</h6>
                        {/* <h2 className="mb-0">{cat.name}</h2> */}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    {/* Tab panes */}

                    <OwlCarousel className="owl-carousel no-pb owl-2" {...options}
                        navText={["<span class='la la-angle-left'><span></span></span>", "<span class='la la-angle-right'><span></span></span>"]}
                    >
                        {category?.map((productdata) => (
                            <React.Fragment key={productdata.id}>
                                <div key={productdata.id}>
                                    <div className="item" >
                                        <Link to={`/category/${productdata.slug}`} >
                                            <div className="card">
                                                <img className="rounded" src={`${imgUrl}storage/app/public/category/${productdata.icon}`} alt={`${productdata.name}`} style={{ height: `170.5px` }} />
                                            </div>
                                        </Link>
                                        <h5 className="card-title text-center" style={{ fontSize: `14px` }}> {productdata.name}</h5>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                        )}
                    </OwlCarousel>
                </Col>
            </Row>
        </Container>
    )
}

export default Categories