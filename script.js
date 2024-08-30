//your JS code here. If required.
document.addEventListener('DOMContentLoaded', function () {
    // Function to set the body's font size and color based on the provided values
    function applyPreferences(fontSize, fontColor) {
        document.documentElement.style.setProperty('--fontsize', fontSize + 'px');
        document.documentElement.style.setProperty('--fontcolor', fontColor);
    }

    // Function to set a cookie
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    // Function to get a cookie
    function getCookie(name) {
        const cname = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArr = decodedCookie.split(';');
        for (let i = 0; i < cookieArr.length; i++) {
            let cookie = cookieArr[i].trim();
            if (cookie.indexOf(cname) === 0) {
                return cookie.substring(cname.length, cookie.length);
            }
        }
        return "";
    }

    // Apply saved preferences when the page loads
    const savedFontSize = getCookie("fontsize");
    const savedFontColor = getCookie("fontcolor");

    if (savedFontSize) {
        document.getElementById('fontsize').value = savedFontSize;
        applyPreferences(savedFontSize, savedFontColor || '#000000');
    }

    if (savedFontColor) {
        document.getElementById('fontcolor').value = savedFontColor;
    }

    // Save preferences when the form is submitted
    document.getElementById('preferenceForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const fontSize = document.getElementById('fontsize').value;
        const fontColor = document.getElementById('fontcolor').value;

        setCookie("fontsize", fontSize, 365); // Save for 1 year
        setCookie("fontcolor", fontColor, 365);

        applyPreferences(fontSize, fontColor);
        alert("Preferences saved!");
    });
});
