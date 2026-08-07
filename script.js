/* =========================================
   CONFIGURATION
========================================= */

// Your referral URL
const REFERRAL_URL = "https://YOUR-REFERRAL-LINK.com";

// Loading delay in milliseconds
const REDIRECT_DELAY = 500;


/* =========================================
   DOM ELEMENTS
========================================= */

const referralButton = document.querySelectorAll(".referral-button");
const loading = document.getElementById("loading");


/* =========================================
   GET URL PARAMETERS
========================================= */

function getUrlParameters() {

    const params = new URLSearchParams(
        window.location.search
    );

    return params;
}


/* =========================================
   BUILD REFERRAL URL
========================================= */

function buildReferralUrl() {

    const referralUrl = new URL(REFERRAL_URL);

    const currentParams = getUrlParameters();

    /*
     * Keep common tracking parameters
     */
    const trackingParameters = [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_term",
        "utm_content",
        "subid",
        "clickid"
    ];

    trackingParameters.forEach(function (parameter) {

        if (currentParams.has(parameter)) {

            referralUrl.searchParams.set(
                parameter,
                currentParams.get(parameter)
            );

        }

    });

    return referralUrl.toString();
}


/* =========================================
   LOCAL CLICK TRACKING
========================================= */

function recordClick() {

    try {

        const currentCount =
            parseInt(
                localStorage.getItem("referral_clicks") || "0",
                10
            );

        localStorage.setItem(
            "referral_clicks",
            currentCount + 1
        );

        localStorage.setItem(
            "last_referral_click",
            new Date().toISOString()
        );

    } catch (error) {

        console.warn(
            "Local tracking unavailable:",
            error
        );

    }
}


/* =========================================
   GOOGLE ANALYTICS EVENT
========================================= */

function sendAnalyticsEvent() {

    /*
     * If Google Analytics is installed,
     * send a referral click event.
     */

    if (
        typeof window.gtag === "function"
    ) {

        window.gtag(
            "event",
            "referral_click",
            {
                event_category: "Referral",
                event_label: "Referral Button"
            }
        );

    }

}


/* =========================================
   BUTTON CLICK
========================================= */

if (referralButton) {

    referralButton.addEventListener(
        "click",
        function (event) {

            /*
             * Prevent the default link temporarily
             */
            event.preventDefault();

            /*
             * Prevent multiple clicks
             */
            if (
                referralButton.dataset.clicked === "true"
            ) {
                return;
            }

            referralButton.dataset.clicked = "true";

            /*
             * Record click
             */
            recordClick();

            /*
             * Send analytics event
             */
            sendAnalyticsEvent();

            /*
             * Show loading screen
             */
            if (loading) {

                loading.classList.add("active");

            }

            /*
             * Build final referral URL
             */
            const finalUrl =
                buildReferralUrl();

            /*
             * Redirect
             */
            setTimeout(
                function () {

                    window.location.href =
                        finalUrl;

                },
                REDIRECT_DELAY
            );

        }
    );

}


/* =========================================
   INITIALIZE BUTTON URL
========================================= */

function initializeReferralButton() {

    if (!referralButton) {
        return;
    }

    try {

        const finalUrl =
            buildReferralUrl();

        referralButton.href =
            finalUrl;

    } catch (error) {

        console.warn(
            "Unable to initialize referral URL:",
            error
        );

    }

}


/* =========================================
   PAGE INITIALIZATION
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeReferralButton();

    }
);
