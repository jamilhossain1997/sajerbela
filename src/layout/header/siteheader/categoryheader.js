import React, { useEffect, useState } from 'react';
import {
    Nav,
    NavItem,
    Dropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    UncontrolledDropdown,
    Container,
    Row,
    Col,
    NavLink,
} from 'reactstrap';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import { useQuery } from 'react-query';
import apiClient from '../../../api/http-common';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BsArrowRightShort } from "react-icons/bs";
import { Tooltip } from 'reactstrap';
import imgUrl from '../../../api/baseUrl';


const categoryheader = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [brand, setBrand] = useState([]);

    // const history = useHistory();

    useEffect(() => {
        apiClient.get(`/v1/categories`)
            .then(res => {
                setBrand(res.data);
            })
    }, []);


    return (

        <UncontrolledDropdown nav inNavbar renderMenuOnMount={true}>
            <DropdownToggle id="DisabledAutoHideExample" nav caret tag="div" className="dropdown-item" style={{ textTransform: `uppercase` }}>
                Categories
            </DropdownToggle>


            <DropdownMenu className='dropDownScroll'>
                <Container >
                    {/* style={{ overflowY: 'scroll', maxHeight: "500px", width: "1100px" }} */}
                    <Row>
                        {brand?.map((branditem) => (
                            <React.Fragment key={branditem.slug}>
                                <Col xs={12} md={3} >
                                    <DropdownToggle nav tag="div" ><a href={`/category/${branditem.slug}`} >
                                        <img className='rounded' style={{ maxHeight: "40px", width: "40px" }} src={`${imgUrl}storage/app/public/category/${branditem.icon}`} alt="Sajerbela" />
                                        <span className='m-2'><b>{branditem.name}</b></span>
                                    </a></DropdownToggle>
                                    {branditem?.childes?.map((subcat) => (
                                        <React.Fragment key={subcat.slug}>
                                            <ul href={`/category/${subcat.slug}`}>

                                                <Accordion allowZeroExpanded>
                                                    <AccordionItem>
                                                        <li className='fs-4 ml-5'>
                                                            {
                                                                subcat.childes.length > 0 ?
                                                                    <AccordionItemHeading>
                                                                        <AccordionItemButton>
                                                                            <a href={`/category/${subcat.slug}`} >
                                                                                {subcat.name}
                                                                            </a>
                                                                        </AccordionItemButton>
                                                                    </AccordionItemHeading> :
                                                                    <a href={`/category/${subcat.slug}`} >
                                                                        {subcat.name}
                                                                    </a>
                                                            }

                                                        </li>
                                                        <AccordionItemPanel>
                                                            <ul>
                                                                {
                                                                    subcat?.childes?.map((subsubcat, i) => (
                                                                        <React.Fragment key={subsubcat.slug}>
                                                                            <li key={i} style={{ listStyleType: `square` }} className='fs-4 ml-5' href={`/category/${subsubcat.slug}`}>
                                                                                <a href={`/category/${subsubcat.slug}`} >
                                                                                    {subsubcat.name}
                                                                                </a>
                                                                            </li>
                                                                        </React.Fragment>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </AccordionItemPanel>
                                                    </AccordionItem>
                                                </Accordion>
                                            </ul>
                                        </React.Fragment>
                                    ))}
                                </Col>
                            </React.Fragment>
                        ))}
                    </Row>
                </Container>
            </DropdownMenu >
        </UncontrolledDropdown>
    );
}


export default categoryheader;
