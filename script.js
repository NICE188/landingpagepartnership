/* =========================================================
   FIREBASE IMPORTS
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

   换成你自己的 Firebase Config
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
   CONTACT POPUPS
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

        }

    }
);


/* =========================================================
   URL PARAMETERS
========================================================= */

const params =
    new URLSearchParams(
        window.location.search
    );


/* =========================================================
   NORMALIZE SOURCE
========================================================= */

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
        source.includes("facebook") ||
        source === "fb"
    ){
        return "facebook";
    }


    if(
        source.includes("tiktok") ||
        source === "tt"
    ){
        return "tiktok";
    }


    if(
        source.includes("instagram") ||
        source === "ig"
    ){
        return "instagram";
    }


    if(
        source.includes("telegram") ||
        source === "tg"
    ){
        return "telegram";
    }


    if(
        source.includes("youtube") ||
        source === "yt"
    ){
        return "youtube";
    }


    if(
        source.includes("google")
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
   DETECT SOURCE
========================================================= */

function detectTrafficSource(){

    const utmSource =
        normalizeSource(
            params.get(
                "utm_source"
            )
        );


    if(utmSource){
        return utmSource;
    }


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


    const referrer =
        document.referrer
            .toLowerCase();


    if(
        referrer.includes("facebook.com") ||
        referrer.includes("fb.com")
    ){
        return "facebook";
    }


    if(
        referrer.includes("tiktok.com")
    ){
        return "tiktok";
    }


    if(
        referrer.includes("instagram.com")
    ){
        return "instagram";
    }


    if(
        referrer.includes("t.me") ||
        referrer.includes("telegram")
    ){
        return "telegram";
    }


    if(
        referrer.includes("youtube.com") ||
        referrer.includes("youtu.be")
    ){
        return "youtube";
    }


    if(
        referrer.includes("google.")
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
   COUNT VISITOR

   每一个 browser session 只统计一次
========================================================= */

const sessionKey =
    "traffic_counted_v2";


async function countVisitor(){

    if(
        sessionStorage.getItem(
            sessionKey
        )
    ){
        return;
    }


    try{


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
   REALTIME TRAFFIC
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
                Number(raw.facebook) || 0,

            tiktok:
                Number(raw.tiktok) || 0,

            instagram:
                Number(raw.instagram) || 0,

            telegram:
                Number(raw.telegram) || 0,

            youtube:
                Number(raw.youtube) || 0,

            google:
                Number(raw.google) || 0,

            direct:
                Number(raw.direct) || 0,

            other:
                Number(raw.other) || 0

        };


        renderTraffic(
            traffic
        );

    }
);


/* =========================================================
   RENDER TRAFFIC
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
                sum,
                [, count]
            ) => {

                return (
                    sum +
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

                    ? (
                        count /
                        total
                    ) * 100

                    : 0;


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
                    count.toLocaleString();

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
            total.toLocaleString();

    }


    const topSourceElement =
        document.getElementById(
            "topSource"
        );


    if(topSourceElement){

        topSourceElement.textContent =
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

        value
            .charAt(0)
            .toUpperCase()

        +

        value.slice(1)

    );

}


/* =========================================================
   TRACKING PARAMETERS
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


/* =========================================================
   REFERRAL LINKS
========================================================= */

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
                    "Invalid referral URL:",
                    original
                );

            }


            link.addEventListener(
                "click",
                () => {


                    saveClick(

                        "referral",

                        link.dataset.company ||
                        "Unknown",

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
                () => {


                    saveClick(

                        "contact",

                        link.dataset.channel ||
                        "Unknown",

                        link.href

                    );

                }
            );


        }
    );


/* =========================================================
   SAVE CLICK EVENT
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
