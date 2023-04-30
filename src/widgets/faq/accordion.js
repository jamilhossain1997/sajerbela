import React, { useState, useEffect } from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import apiClient from "../../api/http-common";
import imgUrl from "../../api/baseUrl";

const accordion = () => {
    const [faqData, setFaqData] = useState([]);
    useEffect(() => {
        apiClient.get(`/v1/faq`)
            .then(function (response) {
                setFaqData(response.data)
            });
    }, []);
    return (
        <>
            <Accordion>
                {
                    faqData.map((item) =>
                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    {item.question}
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <p>
                                    {item.answer}
                                </p>
                            </AccordionItemPanel>
                        </AccordionItem>
                    )
                }

            </Accordion>
        </>
    )
}

export default accordion
