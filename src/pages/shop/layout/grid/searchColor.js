import React, { useState, useEffect } from "react";
import { Col, Container, Row } from 'reactstrap';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useQuery } from "react-query";
import apiClient from '../../../../api/http-common';
import Listview from "../../../../widgets/shop/listview";
import Sidebar from "../../../../widgets/filter/Sidebar";

const searchColor = (props) => {
    const [price, setPrice] = useState(40);
    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(9)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    // Pagination
    const ProductParPage = 9;

    function itemRender(current, type, originalElement) {
        if (type === 'prev') {
            return <Link className="page-link" to="/">Previous</Link>;
        }
        if (type === 'next') {
            return <Link className="page-link" to="/">Next</Link>;
        }
        return originalElement;
    }

    function handleChange(value) {
        setMinValue((value - 1) * ProductParPage);
        setMaxValue(value * ProductParPage);
        // this.setState({
        //     minValue: (value - 1) * ProductParPage,
        //     maxValue: value * ProductParPage
        // });
    };
    return (
        <>
            <div className="page-content">
                <section>
                    <div className="container-fluid">
                        <Row>
                            <Col lg={9} md={12} className="order-lg-1">
                                {/* <Topbar productdata={searchProduct.length} /> */}
                                <Row>

                                    {(props.location?.state?.color?.length > 0) ?
                                        <>

                                            {props.location?.state?.color?.map((product, index) => (
                                                <Listview productdata={product} key={index} />
                                            ))}

                                            <div className="text-center col-12">
                                                <Pagination
                                                    defaultCurrent={1}
                                                    defaultPageSize={ProductParPage}
                                                    onChange={handleChange}
                                                    total={props.location.state?.color?.length}
                                                    itemRender={itemRender}
                                                />
                                            </div>
                                        </>
                                        :
                                        <Col lg={9} md={12} className="order-lg-12">
                                            <Row className="text-center12">
                                                <h3>Sorry! No products were found matching your selection!    </h3>
                                                <p>Please try to other words.</p>
                                            </Row>
                                        </Col>
                                    }
                                </Row>
                            </Col>
                            <Col lg={3} md={12} className="sidebar mt-8 mt-lg-0">
                                <Sidebar />
                            </Col>
                        </Row>
                    </div>
                </section>
            </div>
        </>
    )
}

export default searchColor
