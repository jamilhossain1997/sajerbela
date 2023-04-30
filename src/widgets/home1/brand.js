import React, { useState, useEffect } from "react";
import { TabContent, Container, TabPane, Nav, NavItem, NavLink, Card, Button, Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";
import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useQuery } from "react-query";
import apiClient from "../../api/http-common";
import imgUrl from "../../api/baseUrl";

const brandapi = async () => {
    const result = await apiClient.get(`v1/brands`);
    return result.data;
};

const brand = () => {
    // api
    const { isLoading, error, data } = useQuery("brandapi", brandapi);

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
                items: 3,
            },
            1000: {
                items: 5,
            },
        },
    };

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
    return (
        <>

            <Container fluid >
                <Row className="justify-content-center text-center">
                    <Col lg={8} md={10}>
                        <div className="mb-2">
                            <h6 className="text-primary mb-1">— Brand gallery</h6>
                            {/* <h2 className="mb-0">{cat.name}</h2> */}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        {/* Tab panes */}

                        <OwlCarousel className="owl-carousel no-pb owl-2" {...options} navText={["<span class='la la-angle-left'><span></span></span>", "<span class='la la-angle-right'><span></span></span>"]}>
                            {data?.map((productdata, index) => {
                                return (


                                    <Card key={index} body className="mx-1 justify-content: center" style={{ boxShadow: `0 0 6px rgb(0 0 0 / 10%), inset 0 4px 6px rgb(0 0 0 / 10%)`, outline: `none`, borderRadius: `8px`, background: '#f4f6f9', webkitBoxShadow: `0 0 6px rgb(0 0 0 / 10%), inset 0 4px 6px rgb(0 0 0 / 10%)` }}>
                                        <Link to={`/grid-left-sidebar/${productdata.id}`}>
                                            {
                                                productdata.image ?
                                                    <img src={`${imgUrl}storage/app/public/brand/${productdata.image}`} alt="hello" style={{ width: `140px`, height: `93px`, marginLeft: `-5px` }} /> : <Skeleton variant="rectangular" height={500} />
                                            }
                                        </Link>
                                    </Card>
                                    // <div className="card product-card" style={{ width: `18rem` }}>



                                    // </div>

                                );
                            })}
                        </OwlCarousel>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default brand;
