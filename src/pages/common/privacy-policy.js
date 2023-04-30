
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import Pageheading from '../../widgets/pageheading';
import apiClient from '../../api/http-common';
const privacyPolicy = () => {
    const [termCondition, setTermCondition] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        apiClient.get(`v1/privacy-policy`)
            .then(res => {
                setTermCondition(res.data);
            })
    }, []);

    return (
        <>
            {/*hero section start*/}
            <section className="bg-light">
                <Pageheading foldername={"Pages"} title={"Privacy-Policy"} />
            </section>
            {/*hero section end*/}
            {/*body content start*/}
            <div className="page-content">
                {/*terms start*/}
                <section>
                    <Container>
                        <Row>
                            <div className="col-lg-12 col-md-12">
                                <p className="mb-4" ontentEditable='true' dangerouslySetInnerHTML={{ __html: termCondition?.value }} style={{ textAlign: `justify` }}></p>
                            </div>
                        </Row>
                    </Container>
                </section>
                {/*terms end*/}
            </div>
            {/*body content end*/}
        </>
    );
}


export default privacyPolicy;
