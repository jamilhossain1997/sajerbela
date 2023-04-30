import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { FacebookEmbed } from 'react-social-media-embed';
import apiClient from '../../api/http-common';
import OwlCarousel from "react-owl-carousel";
window.fn = OwlCarousel;
const instafeed = () => {
    const [fburl, setFburl] = useState([]);
    const options = {
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
    };
    useEffect(() => {
        apiClient.get(`v1/facebookPost`)
            .then(res => {
                setFburl(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    return (

        <>
            <div className="container-fluid">
                <Row className="justify-content-center text-center">
                    <Col lg={8} md={10}>
                        <div className="mb-1">
                            <h6 className="text-primary mb-1">
                                — FACEBOOK POST
                            </h6>
                            {/* <h2 className="mb-0">Trending Products</h2> */}
                        </div>
                    </Col>
                </Row>
            </div>

            <div className="container-fluid mb-5">
                <Row className="justify-content-center text-center">

                    {
                        fburl?.slice(0, 4).map((item) => (
                            <React.Fragment key={item.id}>
                                <Col sm={4} md={3} lg={3} xs={6} >
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <FacebookEmbed url={item?.link} width={325}
                                            height={670} />
                                    </div>
                                </Col>
                            </React.Fragment>
                        ))
                    }
                </Row>
            </div>
        </>


    );
}

export default instafeed