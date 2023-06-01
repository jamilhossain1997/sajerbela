import React, { useEffect, useState } from 'react';
import {
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    UncontrolledDropdown,
    Container,
    Row,
    Col
} from 'reactstrap';
import apiClient from '../../../api/http-common';
import { Link } from 'react-router-dom';

const offerHeader = (props) => {
    const [offer, setOffer] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [isOpen, setIsOpen] = useState(false)
    // const history = useHistory();


    useEffect(() => {
        apiClient.get(`v1/landingpages/landing-view`)
            .then(res => {
                setOffer(res.data.landPages);
                setIsLoading(false);
            })
    }, []);


    return (
        <UncontrolledDropdown nav inNavbar >
            <DropdownToggle nav caret className="dropdown-item " >
                <strong className='text-primary'>OFFER</strong>
            </DropdownToggle>
            <DropdownMenu onClick={props.toggle} className="childsubmenu" style={{ overflowY: 'scroll', maxHeight: "500px", width: "200px" }}>
                <Container>
                    <Row>
                        {
                            offer?.map((branditem) => (
                                <React.Fragment key={branditem} >
                                    <Col xs={12} md={12} >
                                        <DropdownItem>
                                            <a href={`/${branditem.slug}`} style={{ textTransform: `uppercase` }}>
                                                {branditem.slug}
                                            </a>
                                        </DropdownItem>
                                    </Col>
                                </React.Fragment>

                            ))
                        }
                    </Row>
                </Container>
            </DropdownMenu>
        </UncontrolledDropdown >

    );
}

export default offerHeader
