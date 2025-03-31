// Consent management functions
const CONSENT_COOKIE_NAME = 'xplore_consent';

function setConsentCookie(consent) {
    const date = new Date();
    date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000)); // 1 year
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${CONSENT_COOKIE_NAME}=${consent};${expires};path=/;SameSite=Strict`;
}

function getConsentCookie() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.split('=').map(c => c.trim());
        if (name === CONSENT_COOKIE_NAME) return value;
    }
    return null;
}

function acceptAll() {
    setConsentCookie('accepted');
    document.getElementById('cookie-consent-banner').style.display = 'none';
    loadAdSense();
}

function rejectAll() {
    setConsentCookie('rejected');
    document.getElementById('cookie-consent-banner').style.display = 'none';
}

function loadAdSense() {
    const script = document.createElement('script');
    script.async = true;
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6181842049927319";
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
}

// Check consent on page load
window.addEventListener('load', function() {
    const consent = getConsentCookie();
    if (!consent) {
        document.getElementById('cookie-consent-banner').style.display = 'block';
    } else if (consent === 'accepted') {
        loadAdSense();
    }
});