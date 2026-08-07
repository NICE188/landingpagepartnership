document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================================
           ELEMENTS
        ================================================= */

        const menuButton =
            document.getElementById(
                "menuButton"
            );


        const sideMenu =
            document.getElementById(
                "sideMenu"
            );


        const overlay =
            document.getElementById(
                "overlay"
            );


        const refreshBtn =
            document.getElementById(
                "refreshBtn"
            );


        const sideLinks =
            document.querySelectorAll(
                ".side-link"
            );


        const referralButtons =
            document.querySelectorAll(
                ".referral"
            );


        const loading =
            document.getElementById(
                "loading"
            );



        /* =================================================
           SIDE MENU
        ================================================= */

        function openMenu() {

            if (!sideMenu) {
                return;
            }


            sideMenu.classList.add(
                "active"
            );


            if (overlay) {

                overlay.classList.add(
                    "active"
                );

            }


            document.body.classList.add(
                "menu-open"
            );

        }



        function closeMenu() {

            if (!sideMenu) {
                return;
            }


            sideMenu.classList.remove(
                "active"
            );


            if (overlay) {

                overlay.classList.remove(
                    "active"
                );

            }


            document.body.classList.remove(
                "menu-open"
            );

        }



        function toggleMenu() {

            if (!sideMenu) {
                return;
            }


            if (
                sideMenu.classList.contains(
                    "active"
                )
            ) {

                closeMenu();

            } else {

                openMenu();

            }

        }



        if (menuButton) {

            menuButton.addEventListener(
                "click",
                toggleMenu
            );

        }



        if (overlay) {

            overlay.addEventListener(
                "click",
                closeMenu
            );

        }



        /*
         ESC CLOSE
        */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Escape"
                ) {

                    closeMenu();

                }

            }
        );



        /* =================================================
           MENU ACTIVE STATE
        ================================================= */

        sideLinks.forEach(
            function (link) {


                link.addEventListener(
                    "click",
                    function () {


                        sideLinks.forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        link.classList.add(
                            "active"
                        );


                        const href =
                            link.getAttribute(
                                "href"
                            );


                        /*
                          href="#" 不进行跳转
                        */

                        if (
                            href === "#"
                        ) {

                            return;

                        }


                        /*
                          手机点击菜单后关闭
                        */

                        if (
                            window.innerWidth <=
                            999
                        ) {

                            setTimeout(
                                closeMenu,
                                120
                            );

                        }

                    }
                );

            }
        );



        /* =================================================
           REFRESH BUTTON
        ================================================= */

        if (refreshBtn) {

            refreshBtn.addEventListener(
                "click",
                function () {

                    refreshBtn.classList.add(
                        "refreshing"
                    );


                    setTimeout(
                        function () {

                            window.location.reload();

                        },
                        150
                    );

                }
            );

        }



        /* =================================================
           URL PARAMETERS
        ================================================= */

        const currentParams =
            new URLSearchParams(
                window.location.search
            );


        const trackingParameters = [

            "utm_source",

            "utm_medium",

            "utm_campaign",

            "utm_term",

            "utm_content",

            "subid",

            "clickid",

            "fbclid",

            "gclid"

        ];



        /* =================================================
           REFERRAL LINKS
        ================================================= */

        referralButtons.forEach(
            function (button) {


                const originalUrl =
                    button.getAttribute(
                        "href"
                    );


                if (
                    !originalUrl ||
                    originalUrl.includes(
                        "YOUR-REFERRAL"
                    )
                ) {

                    return;

                }



                /*
                 ADD TRACKING PARAMETERS
                */

                try {


                    const referralUrl =
                        new URL(
                            originalUrl,
                            window.location.href
                        );


                    trackingParameters.forEach(
                        function (parameter) {


                            if (
                                currentParams.has(
                                    parameter
                                )
                            ) {


                                referralUrl
                                    .searchParams
                                    .set(

                                        parameter,

                                        currentParams.get(
                                            parameter
                                        )

                                    );

                            }

                        }
                    );


                    button.setAttribute(
                        "href",
                        referralUrl.toString()
                    );


                } catch (error) {


                    console.warn(
                        "Invalid referral URL:",
                        originalUrl
                    );


                }



                /* =================================================
                   CLICK EVENT
                ================================================= */

                button.addEventListener(
                    "click",
                    function (event) {


                        const destination =
                            button.href;


                        /*
                         如果还没换 Referral Link
                        */

                        if (
                            !destination ||
                            destination.includes(
                                "YOUR-REFERRAL"
                            )
                        ) {

                            event.preventDefault();

                            console.warn(
                                "Please replace your referral link."
                            );

                            return;

                        }



                        /*
                         LOCAL TRACKING
                        */

                        try {


                            const clickData = {


                                company:
                                    button.dataset.company ||
                                    "Unknown",


                                destination:
                                    destination,


                                sourcePage:
                                    window.location.href,


                                utmSource:
                                    currentParams.get(
                                        "utm_source"
                                    ) || "",


                                utmMedium:
                                    currentParams.get(
                                        "utm_medium"
                                    ) || "",


                                utmCampaign:
                                    currentParams.get(
                                        "utm_campaign"
                                    ) || "",


                                clickId:
                                    currentParams.get(
                                        "clickid"
                                    ) || "",


                                time:
                                    new Date()
                                    .toISOString()


                            };


                            localStorage.setItem(

                                "last_referral_click",

                                JSON.stringify(
                                    clickData
                                )

                            );



                            /*
                             Click counter
                            */

                            const currentClicks =
                                Number(

                                    localStorage.getItem(
                                        "referral_click_count"
                                    ) || 0

                                );


                            localStorage.setItem(

                                "referral_click_count",

                                String(
                                    currentClicks + 1
                                )

                            );


                        } catch (error) {


                            console.warn(
                                "Local tracking unavailable."
                            );


                        }



                        /* =================================================
                           GOOGLE ANALYTICS OPTIONAL
                        ================================================= */

                        if (
                            typeof window.gtag ===
                            "function"
                        ) {


                            window.gtag(

                                "event",

                                "referral_click",

                                {

                                    company:
                                        button.dataset.company ||
                                        "Unknown",

                                    utm_source:
                                        currentParams.get(
                                            "utm_source"
                                        ) || ""

                                }

                            );

                        }



                        /* =================================================
                           LOADING
                        ================================================= */

                        if (loading) {


                            loading.classList.add(
                                "active"
                            );


                            /*
                             避免返回网页后 Loading
                             一直显示
                            */

                            setTimeout(
                                function () {

                                    loading.classList.remove(
                                        "active"
                                    );

                                },
                                1800
                            );

                        }


                    }
                );


            }
        );



        /* =================================================
           RETURN FROM BACK BUTTON
        ================================================= */

        window.addEventListener(
            "pageshow",
            function () {


                if (loading) {

                    loading.classList.remove(
                        "active"
                    );

                }

            }
        );



    }
);
