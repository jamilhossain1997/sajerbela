import { useState, useEffect } from "react";
import apiClient from '../api/http-common';

export const useScrollToTop = (initialScrollState = false) => {
    const [scrollToTop, setScrollToTop] = useState(initialScrollState);

    useEffect(() => {
        if (scrollToTop) {
            setScrollToTop(false);
            try {
                window.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                });
            } catch (error) {
                window.scrollTo(0, 0);
            }
        }
    }, [scrollToTop, setScrollToTop]);

    return setScrollToTop;
};



export const useCountdown = () => {
    const [timer, setTimer] = useState([]);
    const countDownDate = new Date(timer.end_date);

    const [countDown, setCountDown] = useState(
        countDownDate - new Date()
    );
    const difference = +new Date("2022-02-28T18:30:00+05:30") - +new Date();
    useEffect(() => {
        apiClient.get(`v1/flash-deals/countdown`)
            .then(res => {
                // const setFlashDeles = res.data.products;
                setTimer(res.data);
                // console.log(res.data)
            })
    }, [timer])


    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, [countDownDate]);

    const getReturnValues = (countDown) => {
        // calculate time left
        const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

        return [days, hours, minutes, seconds];
    };

    return getReturnValues(countDown);
};


export const useDayWiseCampaign = () => {
    const [timer, setTimer] = useState([]);
    const timerDay = timer.map((item) => item.start_day);
    const countDownDate = +new Date(timerDay[0]);
    const [countDown, setCountDown] = useState(
        countDownDate - +new Date()
    );

    // console.log(countDownDate - )
    // const difference = +new Date("2022-02-28T18:30:00+05:30") - +new Date();
    useEffect(() => {
        apiClient.get(`v1/flash-deals/campaing-products`)
            .then(res => {
                // const setFlashDeles = res.data.products;
                setTimer(res.data);
                // console.log(res.data)
            })
    }, [timer])




    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, [countDownDate]);

    const getReturnValues = (countDown) => {
        // calculate time left
        const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
        // console.log(hours);
        return [days, hours, minutes, seconds];
    };

    return getReturnValues(countDown);
};



// export { useCountdown };



