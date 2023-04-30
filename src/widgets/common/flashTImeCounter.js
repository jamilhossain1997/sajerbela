// import React, { useState, useEffect } from 'react';
// import Countdown from "react-countdown";
// import apiClient from '../../api/http-common';


// const flashTImeCounter = () => {
//     const [timer, setTimer] = useState([]);

//     useEffect(() => {
//         apiClient.get(`/v1/flash-deals/countdown`)
//             .then(res => {
//                 // const setFlashDeles = res.data.products;
//                 setTimer(res.data);
//                 console.log(res.data)
//             })
//     }, [timer])
//     const [expiryTime, setExpiryTime] = useState(`${timer.end_date}`);
//     const [countdownTime, setCountdownTime] = useState({
//         countdownDays: "",
//         countdownHours: "",
//         countdownlMinutes: "",
//         countdownSeconds: "",
//     });

//     const countdownTimer = () => {
//         const timeInterval = setInterval(() => {
//             const countdownDateTime = new Date(expiryTime).getTime();
//             const currentTime = new Date().getTime();
//             const remainingDayTime = countdownDateTime - currentTime;
//             const totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24));
//             const totalHours = Math.floor(
//                 (remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//             );
//             const totalMinutes = Math.floor(
//                 (remainingDayTime % (1000 * 60 * 60)) / (1000 * 60)
//             );
//             const totalSeconds = Math.floor(
//                 (remainingDayTime % (1000 * 60)) / 1000
//             );

//             const runningCountdownTime = {
//                 countdownDays: totalDays,
//                 countdownHours: totalHours,
//                 countdownMinutes: totalMinutes,
//                 countdownSeconds: totalSeconds,
//             };

//             setCountdownTime(runningCountdownTime);

//             if (remainingDayTime < 0) {
//                 clearInterval(timeInterval);
//                 setExpiryTime(false);
//             }
//         }, 1000);
//     };

//     useEffect(() => {
//         countdownTimer();
//     });
//     return (
//         <>
//             {countdownTime.countdownDays}
//         </>
//     )
// }

// <ul className="countdown list-inline d-flex align-items-center">
//                                             <li>
//                                                 {/* <span className="days">{days}</span> */}
//                                                 <p className="days_ref">Day</p>
//                                             </li>
//                                             <li>
//                                                 {/* <span className="hours">{hours}</span> */}
//                                                 <p className="hours_ref">Hours</p>
//                                             </li>
//                                             <li>
//                                                 {/* <span className="minutes">{minutes}</span> */}
//                                                 <p className="minutes_ref">Mins</p>
//                                             </li>
//                                             <li>
//                                                 {/* <span className="seconds">{seconds}</span> */}
//                                                 <p className="seconds_ref">Secs</p>
//                                             </li>
//                                         </ul>

// export default flashTImeCounter