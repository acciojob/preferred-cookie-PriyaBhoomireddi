document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('preferenceForm');
    const fontSizeInput = document.getElementById('fontsize');
    const fontColorInput = document.getElementById('fontcolor');

    if (form && fontSizeInput && fontColorInput) {
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
            fontSizeInput.value = savedFontSize;
            applyPreferences(savedFontSize, savedFontColor || '#000000');
        }

        if (savedFontColor) {
            fontColorInput.value = savedFontColor;
        }

        // Save preferences when the form is submitted
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const fontSize = fontSizeInput.value;
            const fontColor = fontColorInput.value;

            setCookie("fontsize", fontSize, 365); // Save for 1 year
            setCookie("fontcolor", fontColor, 365);

            applyPreferences(fontSize, fontColor);
            alert("Preferences saved!");
        });
    } else {
        console.error('Form or input elements not found.');
    }
});
