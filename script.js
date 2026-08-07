document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================================
           SIDE MENU
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


        function openMenu() {

            sideMenu?.classList.add(
                "active"
            );

            overlay?.classList.add(
                "active"
            );

            document.body.classList.add(
                "menu-open"
            );

        }


        function closeMenu() {

            sideMenu?.classList.remove(
                "active"
            );

            overlay?.classList.remove(
                "active"
            );

            document.body.classList.remove(
                "menu-open"
            );

        }


        function toggleMenu() {

            if (
                sideMenu?.classList.contains(
                    "active"
                )
            ) {

                closeMenu();

            } else {

                openMenu();

            }

        }


        menuButton?.addEventListener(
            "click",
            toggleMenu
        );


        overlay?.addEventListener(
            "click",
            closeMenu
        );


        refreshBtn?.addEventListener(
            "click",
            function () {

                window.location.reload();

            }
        );


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


                        if (
                            window.innerWidth <= 999
                        ) {

                            setTimeout(
                                closeMenu,
                                100
                            );

                        }

                    }
                );

            }
        );



        /* =================================================
           CONTACT POPUP
        ================================================= */

        const popupButtons =
            document.querySelectorAll(
                "[data-contact-popup]"
            );


        const contactPopups =
            document.querySelectorAll(
                ".contact-popup"
            );


        function openPopup(
            popupId
        ) {

            const popup =
                document.getElementById(
                    popupId
                );


            if (!popup) {
                return;
            }


            contactPopups.forEach(
                function (item) {

                    item.classList.remove(
                        "active"
                    );

                    item.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                }
            );


            popup.classList.add(
                "active"
            );


            popup.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.classList.add(
                "contact-popup-open"
            );

        }


        function closePopup(
            popup
        ) {

            if (!popup) {
                return;
            }


            popup.classList.remove(
                "active"
            );


            popup.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body.classList.remove(
                "contact-popup-open"
            );

        }


        popupButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        openPopup(
                            button.dataset
                                .contactPopup
                        );

                    }
                );

            }
        );


        contactPopups.forEach(
            function (popup) {

                const closeButton =
                    popup.querySelector(
                        ".contact-popup-close"
                    );


                const backdrop =
                    popup.querySelector(
                        ".contact-popup-backdrop"
                    );


                closeButton?.addEventListener(
                    "click",
                    function () {

                        closePopup(
                            popup
                        );

                    }
                );


                backdrop?.addEventListener(
                    "click",
                    function () {

                        closePopup(
                            popup
                        );

                    }
                );

            }
        );



        /* =================================================
           ESC CLOSE
        ================================================= */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key !== "Escape"
                ) {
                    return;
                }


                const activePopup =
                    document.querySelector(
                        ".contact-popup.active"
                    );


                if (activePopup) {

                    closePopup(
                        activePopup
                    );

                    return;
                }


                closeMenu();

            }
        );



        /* =================================================
           URL TRACKING
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
           REFERRAL
        ================================================= */

        const referralButtons =
            document.querySelectorAll(
                ".referral"
            );


        const loading =
            document.getElementById(
                "loading"
            );


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


                try {

                    const referralUrl =
                        new URL(
                            originalUrl,
                            window.location.href
                        );


                    trackingParameters.forEach(
                        function (key) {

                            if (
                                currentParams.has(
                                    key
                                )
                            ) {

                                referralUrl
                                    .searchParams
                                    .set(

                                        key,

                                        currentParams.get(
                                            key
                                        )

                                    );

                            }

                        }
                    );


                    button.href =
                        referralUrl.toString();


                } catch (error) {

                    console.warn(
                        "Invalid referral URL:",
                        originalUrl
                    );

                }


                button.addEventListener(
                    "click",
                    function () {

                        try {

                            const clickData = {

                                company:
                                    button.dataset.company ||
                                    "Unknown",

                                destination:
                                    button.href,

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


                            const currentCount =
                                Number(

                                    localStorage.getItem(
                                        "referral_click_count"
                                    ) || 0

                                );


                            localStorage.setItem(

                                "referral_click_count",

                                String(
                                    currentCount + 1
                                )

                            );


                        } catch (error) {

                            console.warn(
                                "Referral tracking unavailable"
                            );

                        }


                        loading?.classList.add(
                            "active"
                        );


                        setTimeout(
                            function () {

                                loading?.classList.remove(
                                    "active"
                                );

                            },
                            1600
                        );

                    }
                );

            }
        );



        /* =================================================
           CONTACT TRACKING
        ================================================= */

        const contactAccounts =
            document.querySelectorAll(
                ".contact-account-item"
            );


        contactAccounts.forEach(
            function (account) {

                account.addEventListener(
                    "click",
                    function () {

                        try {

                            localStorage.setItem(

                                "last_contact_click",

                                JSON.stringify({

                                    type:
                                        account.dataset
                                            .contactType ||
                                        "",

                                    name:
                                        account.dataset
                                            .contactName ||
                                        "",

                                    destination:
                                        account.href,

                                    sourcePage:
                                        window.location.href,

                                    utmSource:
                                        currentParams.get(
                                            "utm_source"
                                        ) || "",

                                    time:
                                        new Date()
                                            .toISOString()

                                })

                            );


                        } catch (error) {

                            console.warn(
                                "Contact tracking unavailable"
                            );

                        }

                    }
                );

            }
        );



        /* =================================================
           BACK BUTTON FIX
        ================================================= */

        window.addEventListener(
            "pageshow",
            function () {

                loading?.classList.remove(
                    "active"
                );

            }
        );


    }
);
