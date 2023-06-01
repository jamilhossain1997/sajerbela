import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row } from 'reactstrap';
import apiClient from '../../api/http-common';
import imgUrl from '../../api/baseUrl';

const mainBanner = () => {
    const [footer, setFooter] = useState([]);
    useEffect(() => {
        apiClient.get(`/v1/banners?banner_type=main_section_banner`)
            .then(res => {
                setFooter(res.data);
            })
    }, [])
    return (
        <Row className="align-items-center mt-2">
            <div className="col-12 col-md-12">
                <div className="position-relative rounded overflow-hidden text-right shadow-sm">
                    {/* Background */}
                    {
                        footer?.map((item) =>
                        (
                            <React.Fragment key={item.id}>
                                <Link to={`/category/slug:${item.url}`}>
                                    <img className="img-fluid hover-zoom" src={`${imgUrl}/storage/app/public/banner/${item.photo}`} alt="" />
                                    {/* Body */}
                                    <div className="position-absolute top-50 pl-5 text-left">
                                        {/* <h6 className="text-dark">New Women's Collection</h6> */}
                                        {/* Heading */}
                                        {/* <h3><span className="font-w-7 text-primary d-block">50% OFF</span> Popular Items!</h3> */}

                                    </div>
                                </Link>
                            </React.Fragment>
                        )
                        )
                    }

                </div>
            </div>

        </Row>
    )
}

export default mainBanner