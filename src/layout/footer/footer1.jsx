import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { useEffect } from 'react';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import apiClient from '../../api/http-common';
import imgUrl from '../../api/baseUrl';

const footer1 = () => {
    const [copyRight, setCopyRight] = useState([]);
    const [about, setAbout] = useState([]);
    const [email, setSetEmail] = useState([]);
    const [footerlogo, setFootlogo] = useState([]);
    const [comName, setComName] = useState([]);
    const [phone, setPhone] = useState([]);
    const [address, setAddress] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brand, setBrand] = useState([]);
    const [social, setSocial] = useState([]);
    const [loading, setLoading] = useState(true);
    // const history = useHistory();

    useEffect(() => {
        apiClient.get(`/v1/categories`)
            .then(res => {
                setCategories(res.data);
                setLoading(false)
            })
    }, []);

    // const history = useHistory();

    useEffect(() => {
        apiClient.get(`/v1/brands`)
            .then(res => {
                setBrand(res.data);
                setLoading(false)
            })
    }, []);



    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        apiClient.get(`/v1/company-phone`)
            .then(res => {
                setPhone(res.data);
                setLoading(false)
            })
        apiClient.get(`/v1/company-name`)
            .then(res => {
                setComName(res.data);
                // setLoading(false)
            })
        apiClient.get(`/v1/company-about`)
            .then(res => {
                setAbout(res.data);
                setLoading(false)
            })
        apiClient.get(`/v1/company-email`)
            .then(res => {
                setSetEmail(res.data);
                setLoading(false)
            })
        apiClient.get(`/v1/company-footer-logo`)
            .then(res => {
                setFootlogo(res.data);
                setLoading(false)
            })
        apiClient.get(`/v1/company-copyright-text`)
            .then(res => {
                setCopyRight(res.data);
                setLoading(false)
            })

        apiClient.get(`/v1/company-address`)
            .then(res => {
                setAddress(res.data);
                setLoading(false)
            })

        apiClient.get(`/v1/SocialMedia`)
            .then(res => {
                setSocial(res.data);
                setLoading(false)
            })
    }, [])

    if (loading) return (
        <Skeleton count={1} style={{ height: `300px` }} />
    )
    return (
        <footer className="py-11 bg-dark">
            <Container>
                <Row>
                    <div className="col-12 col-lg-3"> <Link className="footer-logo text-white h2 mb-0" to="/">
                        Sajer<span className="text-primary">Bela</span>
                    </Link>
                        {/* <img src='footerlogo' /> */}

                        {/* <p className="my-3 text-muted" ontentEditable='true' dangerouslySetInnerHTML={{ __html: about.value }}></p> */}

                        <ul className="list-inline mb-0">
                            {
                                social?.map((soc, i) => (


                                    <li key={i} className="list-inline-item"><a className="text-light ic-2x" href={`${soc.link}`}><i className={`${soc.icon}`} /></a>
                                    </li>

                                ))
                            }
                        </ul>

                        <Link className="footer-logo text-white h2 mb-0" to="/">
                            <img className="img-fluid" src={`${imgUrl}storage/app/public/company/${footerlogo.value}`} alt="Sajerbela" style={{ marginLeft: `-10px` }} />
                        </Link>

                    </div>
                    <div className="col-12 col-lg-6 mt-6 mt-lg-0">
                        <Row>
                            <div className="col-12 col-sm-4 navbar-dark">
                                <h5 className="mb-4 text-white">Quick Links</h5>
                                <ul className="navbar-nav list-unstyled mb-0">
                                    <li className="mb-3 nav-item"><Link className="nav-link" to="/">Home</Link>
                                    </li>
                                    <li className="mb-3 nav-item"><Link className="nav-link" to="/discontproduct">Discount Product</Link>
                                    </li>
                                    <li className="mb-3 nav-item"><Link className="nav-link" to="/termcondition">Term-condition</Link>
                                    </li>
                                    <li className="mb-3 nav-item"><Link className="nav-link" to="/faq">Faq</Link>
                                    </li>
                                    <li className="mb-3 nav-item"><Link className="nav-link" to="/about">About Us</Link>
                                    </li>
                                    <li className="mb-3 nav-item"><Link className="nav-link" to="/privacy-policy">privacy-policy</Link>
                                    </li>

                                </ul>
                            </div>
                            <div className="col-12 col-sm-4 mt-6 mt-sm-0 navbar-dark">
                                <h5 className="mb-4 text-white"> Top Categories</h5>

                                {

                                    categories.map((cat, i) => (
                                        <ul className="navbar-nav list-unstyled mb-0" key={i}>
                                            <li className="mb-3 nav-item"><Link className="nav-link" to={`/catgory/${cat.id}`}>{cat.name}</Link></li>

                                        </ul>
                                    ))

                                }



                            </div>
                            <div className="col-12 col-sm-4 mt-6 mt-sm-0 navbar-dark">
                                <h5 className="mb-4 text-white">Brand</h5>
                                {
                                    brand.slice(0, 7).map((brand, i) => (
                                        <ul key={i} className="navbar-nav list-unstyled mb-0">
                                            <li className="mb-3 nav-item"><Link className="nav-link" to={`/grid-left-sidebar/${brand.id}`}>{brand.name}</Link>
                                            </li>
                                        </ul>
                                    ))
                                }

                            </div>
                        </Row>
                    </div>
                    <div className="col-12 col-lg-3 mt-6 mt-lg-0">
                        <div className="d-flex mb-3">
                            <div className="mr-2"> <i className="las la-map ic-2x text-primary" />
                            </div>
                            <div>
                                <h6 className="mb-1 text-light">Address</h6>
                                <p className="mb-0 text-muted">{address.value}</p>
                            </div>
                        </div>
                        <div className="d-flex mb-3">
                            <div className="mr-2"> <i className="las la-envelope ic-2x text-primary" />
                            </div>
                            <div>
                                <h6 className="mb-1 text-light">Email Us</h6>
                                <Link className="text-muted">{email.value}</Link>
                            </div>
                        </div>
                        <div className="d-flex mb-3">
                            <div className="mr-2"> <i className="las la-mobile ic-2x text-primary" />
                            </div>
                            <div>
                                <h6 className="mb-1 text-light">Phone Number</h6>
                                <Link className="text-muted" >{phone.value}</Link>
                            </div>
                        </div>
                    </div>
                </Row>
                <hr className="my-8" />
                <Row className="text-muted align-items-center">
                    <Col md={7}> <i className="lar la-heart text-primary heartBeat2" /> <a className="text-primary" href="https://www.evertechit.com/">{copyRight.value}</a>
                    </Col>
                    <Col md={5} className="text-md-right mt-3 mt-md-0">
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                                <Link to="#">
                                    <img className="img-fluid" src={require(`../../assets/images/pay-icon/01.png`)} alt="" />
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#">
                                    <img className="img-fluid" src={require(`../../assets/images/pay-icon/02.png`)} alt="" />
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#">
                                    <img className="img-fluid" src={require(`../../assets/images/pay-icon/03.png`)} alt="" />
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#">
                                    <img className="img-fluid" src={require(`../../assets/images/pay-icon/04.png`)} alt="" />
                                </Link>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default footer1