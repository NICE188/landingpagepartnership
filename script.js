document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =====================================================
           OPENING LOADER
        ====================================================== */

        const openingLoader =
            document.getElementById(
                "openingLoader"
            );


        window.addEventListener(
            "load",
            () => {

                setTimeout(
                    () => {

                        openingLoader?.classList.add(
                            "hide"
                        );

                    },
                    650
                );

            }
        );



        /* =====================================================
           SIDE MENU
        ====================================================== */

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


        const sideLinks =
            document.querySelectorAll(
                ".side-link"
            );



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



        sideLinks.forEach(
            link => {

                link.addEventListener(
                    "click",
                    () => {


                        sideLinks.forEach(
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



        /* =====================================================
           POPUPS
        ====================================================== */

        const popupButtons =
            document.querySelectorAll(
                "[data-popup]"
            );


        const popups =
            document.querySelectorAll(
                ".contact-popup"
            );



        function closeAllPopups(){

            popups.forEach(
                popup => {

                    popup.classList.remove(
                        "active"
                    );

                }
            );


            document.body.classList.remove(
                "popup-open"
            );

        }



        popupButtons.forEach(
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


                        closeAllPopups();


                        popup.classList.add(
                            "active"
                        );


                        document.body.classList.add(
                            "popup-open"
                        );

                    }
                );

            }
        );



        popups.forEach(
            popup => {


                popup
                    .querySelector(
                        ".popup-close"
                    )
                    ?.addEventListener(
                        "click",
                        closeAllPopups
                    );


                popup
                    .querySelector(
                        ".popup-backdrop"
                    )
                    ?.addEventListener(
                        "click",
                        closeAllPopups
                    );

            }
        );



        document.addEventListener(
            "keydown",
            event => {

                if(
                    event.key !==
                    "Escape"
                ){
                    return;
                }


                const activePopup =
                    document.querySelector(
                        ".contact-popup.active"
                    );


                if(activePopup){

                    closeAllPopups();

                }else{

                    closeMenu();

                }

            }
        );



        /* =====================================================
           SCROLL REVEAL
        ====================================================== */

        const reveals =
            document.querySelectorAll(
                ".reveal"
            );


        const revealObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(
                        entry => {

                            if(
                                entry.isIntersecting
                            ){

                                entry.target
                                    .classList
                                    .add(
                                        "visible"
                                    );


                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },

                {
                    threshold:.12
                }

            );


        reveals.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );



        /* =====================================================
           COUNTER
        ====================================================== */

        const counters =
            document.querySelectorAll(
                ".counter"
            );


        let counterStarted =
            false;


        function startCounters(){

            if(counterStarted){
                return;
            }


            counterStarted =
                true;


            counters.forEach(
                counter => {


                    const target =
                        Number(
                            counter.dataset.target
                        );


                    const duration =
                        1500;


                    const startTime =
                        performance.now();



                    function updateCounter(
                        now
                    ){

                        const progress =
                            Math.min(
                                (
                                    now -
                                    startTime
                                ) /
                                duration,
                                1
                            );


                        const eased =
                            1 -
                            Math.pow(
                                1 - progress,
                                3
                            );


                        const value =
                            Math.floor(
                                target *
                                eased
                            );


                        counter.textContent =
                            value.toLocaleString();


                        if(
                            progress < 1
                        ){

                            requestAnimationFrame(
                                updateCounter
                            );

                        }

                    }


                    requestAnimationFrame(
                        updateCounter
                    );

                }
            );

        }



        const statsSection =
            document.getElementById(
                "stats"
            );


        if(statsSection){

            const statObserver =
                new IntersectionObserver(

                    entries => {

                        if(
                            entries[0]
                                .isIntersecting
                        ){

                            startCounters();

                            statObserver.disconnect();

                        }

                    },

                    {
                        threshold:.3
                    }

                );


            statObserver.observe(
                statsSection
            );

        }



        /* =====================================================
           CARD 3D TILT
        ====================================================== */

        const tiltCards =
            document.querySelectorAll(
                ".tilt-card"
            );


        const canTilt =
            window.matchMedia(
                "(pointer:fine)"
            ).matches;



        if(canTilt){

            tiltCards.forEach(
                card => {


                    card.addEventListener(
                        "mousemove",
                        event => {


                            const rect =
                                card.getBoundingClientRect();


                            const x =
                                event.clientX -
                                rect.left;


                            const y =
                                event.clientY -
                                rect.top;


                            const centerX =
                                rect.width / 2;


                            const centerY =
                                rect.height / 2;


                            const rotateX =
                                (
                                    centerY - y
                                ) /
                                28;


                            const rotateY =
                                (
                                    x - centerX
                                ) /
                                28;


                            card.style.transform =

                                `perspective(900px)
                                 rotateX(${rotateX}deg)
                                 rotateY(${rotateY}deg)
                                 translateY(-5px)`;

                        }
                    );



                    card.addEventListener(
                        "mouseleave",
                        () => {

                            card.style.transform =
                                "";

                        }
                    );

                }
            );

        }



        /* =====================================================
           MOUSE GLOW
        ====================================================== */

        const mouseGlow =
            document.getElementById(
                "mouseGlow"
            );


        if(
            mouseGlow &&
            canTilt
        ){

            document.addEventListener(
                "mousemove",
                event => {

                    mouseGlow.style.left =
                        `${event.clientX}px`;


                    mouseGlow.style.top =
                        `${event.clientY}px`;


                    mouseGlow.style.opacity =
                        "1";

                }
            );

        }



        /* =====================================================
           PARTICLES
        ====================================================== */

        const canvas =
            document.getElementById(
                "particleCanvas"
            );


        if(canvas){

            const ctx =
                canvas.getContext(
                    "2d"
                );


            let width = 0;

            let height = 0;

            let particles = [];



            function resizeCanvas(){

                const dpr =
                    Math.min(
                        window.devicePixelRatio ||
                        1,
                        2
                    );


                width =
                    window.innerWidth;


                height =
                    window.innerHeight;


                canvas.width =
                    width * dpr;


                canvas.height =
                    height * dpr;


                canvas.style.width =
                    `${width}px`;


                canvas.style.height =
                    `${height}px`;


                ctx.setTransform(
                    dpr,
                    0,
                    0,
                    dpr,
                    0,
                    0
                );

            }



            function createParticles(){

                const count =
                    Math.min(
                        45,
                        Math.max(
                            18,
                            Math.floor(
                                width / 35
                            )
                        )
                    );


                particles =
                    Array.from(
                        {
                            length:count
                        },
                        () => ({

                            x:
                                Math.random() *
                                width,

                            y:
                                Math.random() *
                                height,

                            r:
                                Math.random() *
                                1.3 +
                                .3,

                            speed:
                                Math.random() *
                                .18 +
                                .05,

                            alpha:
                                Math.random() *
                                .30 +
                                .08

                        })
                    );

            }



            function animateParticles(){

                ctx.clearRect(
                    0,
                    0,
                    width,
                    height
                );


                particles.forEach(
                    particle => {


                        particle.y -=
                            particle.speed;


                        if(
                            particle.y <
                            -5
                        ){

                            particle.y =
                                height + 5;


                            particle.x =
                                Math.random() *
                                width;

                        }


                        ctx.beginPath();


                        ctx.arc(
                            particle.x,
                            particle.y,
                            particle.r,
                            0,
                            Math.PI * 2
                        );


                        ctx.fillStyle =
                            `rgba(
                                190,
                                226,
                                241,
                                ${particle.alpha}
                            )`;


                        ctx.fill();

                    }
                );


                requestAnimationFrame(
                    animateParticles
                );

            }



            resizeCanvas();

            createParticles();

            animateParticles();



            window.addEventListener(
                "resize",
                () => {

                    resizeCanvas();

                    createParticles();

                }
            );

        }



        /* =====================================================
           BACK TO TOP
        ====================================================== */

        const backToTop =
            document.getElementById(
                "backToTop"
            );


        window.addEventListener(
            "scroll",
            () => {


                if(
                    window.scrollY >
                    450
                ){

                    backToTop
                        ?.classList
                        .add(
                            "show"
                        );

                }else{

                    backToTop
                        ?.classList
                        .remove(
                            "show"
                        );

                }

            }
        );


        backToTop?.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top:0,

                    behavior:
                        "smooth"

                });

            }
        );



        /* =====================================================
           SOURCE / UTM TRACKING
        ====================================================== */

        const params =
            new URLSearchParams(
                window.location.search
            );


        const trackingKeys = [

            "utm_source",
            "utm_medium",
            "utm_campaign",
            "utm_content",
            "utm_term",

            "fbclid",
            "gclid",

            "ttclid",

            "clickid",
            "subid"

        ];



        const trafficData = {

            page:
                window.location.href,

            referrer:
                document.referrer,

            timestamp:
                new Date()
                    .toISOString()

        };



        trackingKeys.forEach(
            key => {

                if(
                    params.has(key)
                ){

                    trafficData[key] =
                        params.get(key);

                }

            }
        );



        try{

            localStorage.setItem(

                "landing_traffic",

                JSON.stringify(
                    trafficData
                )

            );

        }catch(error){

            console.warn(
                "Local tracking unavailable"
            );

        }



        /* =====================================================
           PASS UTM TO REFERRAL LINKS
        ====================================================== */

        const referralLinks =
            document.querySelectorAll(
                ".referral"
            );


        referralLinks.forEach(
            link => {


                const rawUrl =
                    link.getAttribute(
                        "href"
                    );


                if(
                    !rawUrl ||
                    rawUrl.includes(
                        "YOUR-REFERRAL"
                    )
                ){

                    return;

                }


                try{

                    const destination =
                        new URL(
                            rawUrl,
                            window.location.href
                        );


                    trackingKeys.forEach(
                        key => {

                            if(
                                params.has(key)
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


                    link.href =
                        destination.toString();


                }catch(error){

                    console.warn(
                        "Referral URL error",
                        rawUrl
                    );

                }



                link.addEventListener(
                    "click",
                    () => {


                        const eventData = {

                            type:
                                "referral_click",

                            company:
                                link.dataset.company ||
                                "Unknown",

                            destination:
                                link.href,

                            source:
                                params.get(
                                    "utm_source"
                                ) ||
                                "direct",

                            campaign:
                                params.get(
                                    "utm_campaign"
                                ) ||
                                "",

                            timestamp:
                                new Date()
                                    .toISOString()

                        };


                        saveClickEvent(
                            eventData
                        );


                        /*
                          GA4 event
                        */

                        if(
                            typeof window.gtag ===
                            "function"
                        ){

                            window.gtag(

                                "event",

                                "referral_click",

                                {

                                    company:
                                        eventData.company,

                                    destination:
                                        eventData.destination

                                }

                            );

                        }


                        /*
                          Meta Pixel event
                          如果以后安装 fbq
                        */

                        if(
                            typeof window.fbq ===
                            "function"
                        ){

                            window.fbq(

                                "trackCustom",

                                "ReferralClick",

                                {

                                    company:
                                        eventData.company

                                }

                            );

                        }


                        /*
                          TikTok Pixel event
                          如果以后安装 ttq
                        */

                        if(
                            window.ttq &&
                            typeof window.ttq.track ===
                            "function"
                        ){

                            window.ttq.track(

                                "ClickButton",

                                {

                                    content_name:
                                        eventData.company

                                }

                            );

                        }

                    }
                );

            }
        );



        /* =====================================================
           CONTACT CLICK TRACKING
        ====================================================== */

        document
            .querySelectorAll(
                ".track-contact"
            )
            .forEach(
                link => {


                    link.addEventListener(
                        "click",
                        () => {


                            saveClickEvent({

                                type:
                                    "contact_click",

                                channel:
                                    link.dataset.channel ||
                                    "Unknown",

                                destination:
                                    link.href,

                                source:
                                    params.get(
                                        "utm_source"
                                    ) ||
                                    "direct",

                                timestamp:
                                    new Date()
                                        .toISOString()

                            });


                            if(
                                typeof window.gtag ===
                                "function"
                            ){

                                window.gtag(

                                    "event",

                                    "contact_click",

                                    {

                                        channel:
                                            link.dataset.channel

                                    }

                                );

                            }

                        }
                    );

                }
            );



        /* =====================================================
           LOCAL EVENT LOG
        ====================================================== */

        function saveClickEvent(
            eventData
        ){

            try{

                const current =
                    JSON.parse(

                        localStorage.getItem(
                            "landing_click_events"
                        ) ||

                        "[]"

                    );


                current.push(
                    eventData
                );


                /*
                  防止 localStorage 无限增大
                */

                const limited =
                    current.slice(
                        -100
                    );


                localStorage.setItem(

                    "landing_click_events",

                    JSON.stringify(
                        limited
                    )

                );


            }catch(error){

                console.warn(
                    "Unable to save event"
                );

            }

        }



        /* =====================================================
           PAGE RESTORE
        ====================================================== */

        window.addEventListener(
            "pageshow",
            () => {

                document.body
                    .classList
                    .remove(
                        "menu-open",
                        "popup-open"
                    );

            }
        );


    }
);
