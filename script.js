/* =========================================================
   FIREBASE
========================================================= */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";


import {
    getDatabase,
    ref,
    onValue,
    runTransaction,
    push,
    set,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";



/* =========================================================
   FIREBASE CONFIG

   !!! 换成你自己的 Firebase Config !!!
========================================================= */

const firebaseConfig = {

    apiKey:
        "YOUR_API_KEY",

    authDomain:
        "YOUR_PROJECT.firebaseapp.com",

    databaseURL:
        "https://YOUR_PROJECT-default-rtdb.asia-southeast1.firebasedatabase.app",

    projectId:
        "YOUR_PROJECT",

    storageBucket:
        "YOUR_PROJECT.appspot.com",

    messagingSenderId:
        "YOUR_SENDER_ID",

    appId:
        "YOUR_APP_ID"

};



const app =
    initializeApp(
        firebaseConfig
    );


const db =
    getDatabase(app);



/* =========================================================
   ELEMENTS
========================================================= */

const menuButton =
    document.getElementById(
        "menuButton"
    );


const sideMenu =
    document.getElementById(
        "sideMenu"
    );


const sideOverlay =
    document.getElementById(
        "sideOverlay"
    );


const refreshBtn =
    document.getElementById(
        "refreshBtn"
    );



/* =========================================================
   SIDE MENU
========================================================= */

function openMenu(){

    sideMenu?.classList.add(
        "active"
    );

    sideOverlay?.classList.add(
        "active"
    );

    document.body.classList.add(
        "menu-open"
    );

}


function closeMenu(){

    sideMenu?.classList.remove(
        "active"
    );

    sideOverlay?.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "menu-open"
    );

}


menuButton?.addEventListener(
    "click",
    () => {

        if(
            sideMenu?.classList.contains(
                "active"
            )
        ){

            closeMenu();

        }else{

            openMenu();

        }

    }
);


sideOverlay?.addEventListener(
    "click",
    closeMenu
);


refreshBtn?.addEventListener(
    "click",
    () => {

        window.location.reload();

    }
);



document
    .querySelectorAll(
        ".side-link"
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                () => {


                    document
                        .querySelectorAll(
                            ".side-link"
                        )
                        .forEach(
                            item => {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                    link.classList.add(
                        "active"
                    );


                    setTimeout(
                        closeMenu,
                        100
                    );

                }
            );

        }
    );



/* =========================================================
   CONTACT POPUP
========================================================= */

function closePopups(){

    document
        .querySelectorAll(
            ".contact-popup"
        )
        .forEach(
            popup => {

                popup.classList.remove(
                    "active"
                );

            }
        );


    document.body
        .classList
        .remove(
            "popup-open"
        );

}



document
    .querySelectorAll(
        "[data-popup]"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {


                    const popup =
                        document.getElementById(
                            button.dataset.popup
                        );


                    if(!popup){
                        return;
                    }


                    closePopups();


                    popup.classList.add(
                        "active"
                    );


                    document.body
                        .classList
                        .add(
                            "popup-open"
                        );

                }
            );

        }
    );



document
    .querySelectorAll(
        ".popup-close"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                closePopups
            );

        }
    );



document
    .querySelectorAll(
        ".popup-backdrop"
    )
    .forEach(
        backdrop => {

            backdrop.addEventListener(
                "click",
                closePopups
            );

        }
    );



document.addEventListener(
    "keydown",
    event => {

        if(
            event.key ===
            "Escape"
        ){

            closePopups();

            closeMenu();

        }

    }
);



/* =========================================================
   SOURCE DETECTION
========================================================= */

const params =
    new URLSearchParams(
        window.location.search
    );



function normalizeSource(
    value
){

    if(!value){

        return null;

    }


    const source =
        value
            .toLowerCase()
            .trim();



    if(
        source.includes(
            "facebook"
        ) ||
        source === "fb"
    ){

        return "facebook";

    }


    if(
        source.includes(
            "tiktok"
        ) ||
        source === "tt"
    ){

        return "tiktok";

    }


    if(
        source.includes(
            "instagram"
        ) ||
        source === "ig"
    ){

        return "instagram";

    }


    if(
        source.includes(
            "telegram"
        ) ||
        source === "tg"
    ){

        return "telegram";

    }


    if(
        source.includes(
            "youtube"
        ) ||
        source === "yt"
    ){

        return "youtube";

    }


    if(
        source.includes(
            "google"
        )
    ){

        return "google";

    }


    if(
        source === "direct"
    ){

        return "direct";

    }


    return "other";

}



/* =========================================================
   GET TRAFFIC SOURCE
========================================================= */

function detectTrafficSource(){

    /*
       Priority 1:
       utm_source
    */

    const utmSource =
        normalizeSource(
            params.get(
                "utm_source"
            )
        );


    if(utmSource){

        return utmSource;

    }



    /*
       Priority 2:
       Ads click IDs
    */

    if(
        params.has(
            "fbclid"
        )
    ){

        return "facebook";

    }


    if(
        params.has(
            "ttclid"
        )
    ){

        return "tiktok";

    }


    if(
        params.has(
            "gclid"
        )
    ){

        return "google";

    }



    /*
       Priority 3:
       document.referrer
    */

    const referrer =
        document.referrer
            .toLowerCase();



    if(
        referrer.includes(
            "facebook.com"
        ) ||
        referrer.includes(
            "fb.com"
        )
    ){

        return "facebook";

    }


    if(
        referrer.includes(
            "tiktok.com"
        )
    ){

        return "tiktok";

    }


    if(
        referrer.includes(
            "instagram.com"
        )
    ){

        return "instagram";

    }


    if(
        referrer.includes(
            "t.me"
        ) ||
        referrer.includes(
            "telegram"
        )
    ){

        return "telegram";

    }


    if(
        referrer.includes(
            "youtube.com"
        ) ||
        referrer.includes(
            "youtu.be"
        )
    ){

        return "youtube";

    }


    if(
        referrer.includes(
            "google."
        )
    ){

        return "google";

    }



    if(
        !referrer
    ){

        return "direct";

    }


    return "other";

}



const trafficSource =
    detectTrafficSource();



/* =========================================================
   UNIQUE SESSION TRACKING

   同一个 Tab / 浏览 Session
   只统计一次
========================================================= */

const sessionKey =
    "landing_traffic_counted_v1";


async function countVisitor(){

    if(
        sessionStorage.getItem(
            sessionKey
        )
    ){

        return;

    }



    try{


        /*
           traffic/facebook
           traffic/tiktok
           etc.
        */

        const sourceRef =
            ref(
                db,
                `traffic/${trafficSource}`
            );


        await runTransaction(

            sourceRef,

            current => {

                return (
                    Number(current) ||
                    0
                ) + 1;

            }

        );



        /*
           Save visit log
        */

        const visitsRef =
            ref(
                db,
                "trafficVisits"
            );


        const newVisit =
            push(
                visitsRef
            );


        await set(
            newVisit,
            {

                source:
                    trafficSource,

                utmSource:
                    params.get(
                        "utm_source"
                    ) || "",

                utmMedium:
                    params.get(
                        "utm_medium"
                    ) || "",

                utmCampaign:
                    params.get(
                        "utm_campaign"
                    ) || "",

                landingPage:
                    window.location.pathname,

                referrer:
                    document.referrer
                        .slice(
                            0,
                            300
                        ),

                timestamp:
                    serverTimestamp()

            }
        );



        sessionStorage.setItem(
            sessionKey,
            "1"
        );


    }catch(error){


        console.error(
            "Traffic tracking error:",
            error
        );


    }

}



countVisitor();



/* =========================================================
   REALTIME TRAFFIC DASHBOARD
========================================================= */

const trafficRef =
    ref(
        db,
        "traffic"
    );



onValue(
    trafficRef,
    snapshot => {


        const raw =
            snapshot.val() ||
            {};


        const traffic = {

            facebook:
                Number(
                    raw.facebook
                ) || 0,

            tiktok:
                Number(
                    raw.tiktok
                ) || 0,

            instagram:
                Number(
                    raw.instagram
                ) || 0,

            telegram:
                Number(
                    raw.telegram
                ) || 0,

            youtube:
                Number(
                    raw.youtube
                ) || 0,

            google:
                Number(
                    raw.google
                ) || 0,

            direct:
                Number(
                    raw.direct
                ) || 0,

            other:
                Number(
                    raw.other
                ) || 0

        };


        renderTraffic(
            traffic
        );

    }
);



/* =========================================================
   RENDER RANGE BARS
========================================================= */

function renderTraffic(
    traffic
){

    const entries =
        Object.entries(
            traffic
        );


    const total =
        entries.reduce(
            (
                total,
                [, count]
            ) => {

                return (
                    total +
                    count
                );

            },
            0
        );



    let topSource =
        "-";


    let topCount =
        -1;



    entries.forEach(
        (
            [
                source,
                count
            ]
        ) => {


            if(
                count >
                topCount
            ){

                topCount =
                    count;


                topSource =
                    source;

            }



            const percent =

                total > 0

                    ?

                    (
                        count /
                        total
                    ) * 100

                    :

                    0;



            const countEl =
                document.querySelector(
                    `[data-count="${source}"]`
                );


            const percentEl =
                document.querySelector(
                    `[data-percent="${source}"]`
                );


            const barEl =
                document.querySelector(
                    `[data-bar="${source}"]`
                );



            if(countEl){

                countEl.textContent =
                    count
                        .toLocaleString();

            }



            if(percentEl){

                percentEl.textContent =
                    `${percent.toFixed(1)}%`;

            }



            if(barEl){

                requestAnimationFrame(
                    () => {

                        barEl.style.width =
                            `${percent}%`;

                    }
                );

            }


        }
    );



    const totalVisitors =
        document.getElementById(
            "totalVisitors"
        );


    if(totalVisitors){

        totalVisitors.textContent =
            total
                .toLocaleString();

    }



    const topSourceEl =
        document.getElementById(
            "topSource"
        );


    if(topSourceEl){

        topSourceEl.textContent =
            capitalize(
                topSource
            );

    }

}



function capitalize(
    value
){

    if(!value){

        return "-";

    }


    return (

        value.charAt(0)
            .toUpperCase()

        +

        value.slice(1)

    );

}



/* =========================================================
   PASS TRACKING TO REFERRAL LINKS
========================================================= */

const trackingKeys = [

    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",

    "fbclid",
    "ttclid",
    "gclid",

    "clickid",
    "subid"

];



document
    .querySelectorAll(
        ".referral-link"
    )
    .forEach(
        link => {


            const original =
                link.getAttribute(
                    "href"
                );


            if(
                !original ||
                original.includes(
                    "YOUR-REFERRAL"
                )
            ){

                return;

            }



            try{


                const destination =
                    new URL(
                        original
                    );


                trackingKeys.forEach(
                    key => {


                        if(
                            params.has(
                                key
                            )
                        ){

                            destination
                                .searchParams
                                .set(

                                    key,

                                    params.get(
                                        key
                                    )

                                );

                        }

                    }
                );



                destination
                    .searchParams
                    .set(
                        "landing_source",
                        trafficSource
                    );


                link.href =
                    destination
                        .toString();


            }catch(error){


                console.warn(
                    "Invalid referral:",
                    original
                );


            }



            link.addEventListener(
                "click",
                async () => {


                    const company =
                        link.dataset
                            .company ||
                        "Unknown";


                    await saveClick(

                        "referral",

                        company,

                        link.href

                    );

                }
            );


        }
    );



/* =========================================================
   CONTACT TRACKING
========================================================= */

document
    .querySelectorAll(
        ".track-contact"
    )
    .forEach(
        link => {


            link.addEventListener(
                "click",
                async () => {


                    await saveClick(

                        "contact",

                        link.dataset
                            .channel ||
                            "Unknown",

                        link.href

                    );

                }
            );


        }
    );



/* =========================================================
   SAVE CLICK TO FIREBASE
========================================================= */

async function saveClick(
    type,
    name,
    destination
){

    try{


        const clickRef =
            push(
                ref(
                    db,
                    "clickEvents"
                )
            );


        await set(
            clickRef,
            {

                type:
                    type,

                name:
                    name,

                source:
                    trafficSource,

                destination:
                    destination,

                campaign:
                    params.get(
                        "utm_campaign"
                    ) || "",

                timestamp:
                    serverTimestamp()

            }
        );


    }catch(error){


        console.warn(
            "Click tracking failed:",
            error
        );


    }

}
