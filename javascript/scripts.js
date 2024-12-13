// Get the parameters that are passed in
function getQueryParams() {
    const params = {};
    window.location.search.slice(1).split('&').forEach(param => {
        const [key, value] = param.split('=');
        params[key] = decodeURIComponent(value);
    });
    return params;
}

// Page 1 - Load the Onboard Page Typeform iFrame
function loadTypeform() {
    const params = getQueryParams();
    const { email, unlock } = params;

    if (email && unlock === 'true') {
        // Email is provided and unlock is true
        const typeformURL = `https://manutelehealth.typeform.com/to/kpjUAQ7p#email=${encodeURIComponent(email)}`;
        const iframe = document.getElementById('typeform-embed');
        iframe.src = typeformURL;
        iframe.style.display = 'block';
        sessionStorage.setItem('completedOnboarding', 'true'); // Set completedOnboarding to true
    } else if (email) {
        // Email is provided but no unlock parameter, proceed with just the email
        const typeformURL = `https://manutelehealth.typeform.com/to/kpjUAQ7p#email=${encodeURIComponent(email)}`;
        const iframe = document.getElementById('typeform-embed');
        iframe.src = typeformURL;
        iframe.style.display = 'block';
        sessionStorage.setItem('completedOnboarding', 'true'); // Set completedOnboarding to true
    } else if (unlock === 'true') {
        // Unlock is true but no email, proceed without the email parameter
        const typeformURL = `https://manutelehealth.typeform.com/to/kpjUAQ7p`;
        const iframe = document.getElementById('typeform-embed');
        iframe.src = typeformURL;
        iframe.style.display = 'block';
        sessionStorage.setItem('completedOnboarding', 'true'); // Set completedOnboarding to true
    } else {
        // No valid parameters, show error
        const errorMessage = document.getElementById('errorMessage');
        const buttonContainer = document.getElementById('buttonContainer');
        errorMessage.style.display = 'block';
        buttonContainer.style.display = 'block';
    }
}


// Page 2 - Load the Appointment Page Booking iFrame
function loadAppointmentForm() {
    const params = getQueryParams();
    const first_name = params.first_name;
    const last_name = params.last_name;
    const email = params.email;
    const phone = params.phone;
    const language = params.language;
    const unlock = params.unlock;


    const completedOnboarding = sessionStorage.getItem('completedOnboarding');


    if (first_name && last_name && email && phone && language === 'English' && completedOnboarding === 'true') {
        // Default Flow
        const iframe = document.getElementById('ghl-embed');
        iframe.src = `https://api.leadconnectorhq.com/widget/booking/bMUAlKXLhbydQEkPwJwO?first_Name=${encodeURIComponent(first_name)}&last_Name=${encodeURIComponent(last_name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}`;
        iframe.style.display = 'block';
        sessionStorage.setItem('visitedAppointments', 'true'); // Set visitedAppointments to true
    } else if (first_name && last_name && email && phone && language === 'Español' && completedOnboarding === 'true') {
        // Default Flow
        const iframe = document.getElementById('ghl-embed');
        iframe.src = `https://api.leadconnectorhq.com/widget/booking/orzSRO2qbmDIw3K9tYfv?first_Name=${encodeURIComponent(first_name)}&last_Name=${encodeURIComponent(last_name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}`;
        iframe.style.display = 'block';
        sessionStorage.setItem('visitedAppointments', 'true'); // Set visitedAppointments to true
    } else if (first_name && last_name && email && phone && language === 'English' && unlock === 'true') {
        // Allow access if the unlock parameter is present and true
        const iframe = document.getElementById('ghl-embed');
        iframe.src = `https://api.leadconnectorhq.com/widget/booking/bMUAlKXLhbydQEkPwJwO?first_Name=${encodeURIComponent(first_name)}&last_Name=${encodeURIComponent(last_name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}`;
        iframe.style.display = 'block';
        sessionStorage.setItem('visitedAppointments', 'true'); // Set visitedAppointments to true
    } else if (first_name && last_name && email && phone && language === 'Español' && unlock === 'true') {
        // Allow access if the unlock parameter is present and true
        const iframe = document.getElementById('ghl-embed');
        iframe.src = `https://api.leadconnectorhq.com/widget/booking/orzSRO2qbmDIw3K9tYfv?first_Name=${encodeURIComponent(first_name)}&last_Name=${encodeURIComponent(last_name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}`;
        iframe.style.display = 'block';
        sessionStorage.setItem('visitedAppointments', 'true'); // Set visitedAppointments to true
    } else if (unlock === 'true') {
        // Allow access if the unlock parameter is present and true
        const iframe = document.getElementById('ghl-embed');
        iframe.src = `https://api.leadconnectorhq.com/widget/booking/bMUAlKXLhbydQEkPwJwO`;
        iframe.style.display = 'block';
        sessionStorage.setItem('visitedAppointments', 'true'); // Set visitedAppointments to true
    } else {
        const errorMessage = document.getElementById('errorMessage');
        const buttonContainer = document.getElementById('buttonContainer');
        errorMessage.style.display = 'block';
        buttonContainer.style.display = 'block';
    }
}


// Page 3 - Load the Plans Page Typeform iFrame
function loadTypeform() {
    const params = getQueryParams();
    const { firstname, lastname, email, unlock } = params;
    const visitedAppointments = sessionStorage.getItem('visitedAppointments'); // Check if appointments page was visited


    if (firstname && lastname && email && visitedAppointments === 'true') {
        // Default Flow
        const typeformURL = `https://manutelehealth.typeform.com/to/dVNpNZfL#firstname=${encodeURIComponent(firstname)}&lastname=${encodeURIComponent(lastname)}&email=${encodeURIComponent(email)}`;

        const iframe = document.getElementById('typeform-embed');
        iframe.src = typeformURL;
        iframe.style.display = 'block';
        sessionStorage.setItem('visitedPlans', 'true'); // Set visitedPlans to true
    } else if (firstname && lastname && email && unlock === 'true') {
        // Allow access if the unlock parameter is present and true
        const typeformURL = `https://manutelehealth.typeform.com/to/dVNpNZfL#firstname=${encodeURIComponent(firstname)}&lastname=${encodeURIComponent(lastname)}&email=${encodeURIComponent(email)}`;
        const iframe = document.getElementById('typeform-embed');
        iframe.src = typeformURL;
        iframe.style.display = 'block';
        sessionStorage.setItem('visitedPlans', 'true'); // Set visitedPlans to true
    }  else if (unlock === 'true') {
        // Allow access if the unlock parameter is present and true
        const typeformURL = `https://manutelehealth.typeform.com/to/dVNpNZfL`;
        const iframe = document.getElementById('typeform-embed');
        iframe.src = typeformURL;
        iframe.style.display = 'block';
        sessionStorage.setItem('visitedPlans', 'true'); // Set visitedPlans to true
    }  else {
        const errorMessage = document.getElementById('errorMessage');
        const buttonContainer = document.getElementById('buttonContainer');
        errorMessage.style.display = 'block';
        buttonContainer.style.display = 'block';
    }
}


// Disclaimer close function
function closeDisclaimer() {
    document.getElementById('disclaimer').style.display = 'none';
    localStorage.setItem('disclaimerClosedTime', new Date().getTime());
}


// Check Disclaimer status
function checkDisclaimer() {
    const disclaimerClosedTime = localStorage.getItem('disclaimerClosedTime');
    const now = new Date().getTime();


    if (disclaimerClosedTime && (now - disclaimerClosedTime < 24 * 60 * 60 * 1000)) {
        document.getElementById('disclaimer').style.display = 'none';
    }
}

// Progress bar
document.addEventListener('DOMContentLoaded', function () {
    const pathname = window.location.pathname;


    // Load specific functions based on the current page
    if (pathname.includes('onboard')) {
        setupOnboardPage();
    } else if (pathname.includes('plans')) {
        loadTypeform();
        setupProgressBar(50, "You're halfway there! Choose the plan that suits you best.");
    } else if (pathname.includes('appointment')) {
        loadAppointmentForm();
        setupProgressBar(75, "You're just about done! Let's set up your intial appointment.");
    } else if (pathname.includes('complete')) {
        setupCompletePage();
    }


    // Common functionality
    loadEmail();
    document.getElementById('submitEmailButton').addEventListener('click', submitEmail);
    checkDisclaimer();
});


// Function to setup the progress bar and encouragement text
function setupProgressBar(progress, message) {
    const progressBar = document.getElementById('progress-bar');
    const encouragementText = document.getElementById('encouragement-text');
    const color = '#39bad8'; // default color


    progressBar.style.width = progress + '%';
    progressBar.textContent = progress + '%';
    progressBar.style.backgroundColor = color; // Set the background color
    encouragementText.textContent = message;
}


// Function to setup the Onboard page
function setupOnboardPage() {
    setupProgressBar(25, "Welcome! Let's get started with your onboarding.");
}

// Typeform Listener
document.addEventListener('DOMContentLoaded', function() {
    loadTypeform();
    document.getElementById('submitEmailButton').addEventListener('click', submitEmail);
});

document.getElementById('home-link').addEventListener('click', function(event) {
    event.preventDefault();
    const confirmation = confirm("Navigating away may cause you to lose the information you've entered. Do you want to proceed to the homepage?");
    if (confirmation) {
        window.location.href = 'https://manutelehealth.com';
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const enableNotificationBar = false; // Set to false to disable the notification bar
    const enableNotificationButton = true; // Set to false to disable the button in the notification bar


    // Function to show the notification bar
    function showNotificationBar(message, linkText = '', linkUrl = '') {
        if (!enableNotificationBar) return;


        const notificationBar = document.getElementById('notification-bar');
        const notificationMessage = document.getElementById('notification-message');
        const notificationLink = document.getElementById('notification-link');


        notificationMessage.innerHTML = message;
        
        if (enableNotificationButton && linkText && linkUrl) {
            notificationLink.textContent = linkText;
            notificationLink.href = linkUrl;
            notificationLink.target = '_blank'; // Open link in a new tab
            notificationLink.style.display = 'inline-block';
        } else {
            notificationLink.style.display = 'none';
        }


        notificationBar.classList.add('active');
        notificationBar.classList.remove('inactive');
        notificationBar.style.display = 'block';
    }


    // Function to hide the notification bar
    function hideNotificationBar() {
        const notificationBar = document.getElementById('notification-bar');
        notificationBar.classList.remove('active');
        notificationBar.classList.add('inactive');
        setTimeout(() => {
            notificationBar.style.display = 'none';
        }, 300);
    }


    // Add event listener to close button
    document.getElementById('close-notification').addEventListener('click', function () {
        hideNotificationBar();
    });


    // Example usage
    showNotificationBar('<b>Note:</b> This is a beta test page. <u>Do not</u> enter patient information. Patients, please do not provide your information.', 'Add Your Feedback', 'https://airtable.com/appdx3KDBxznZR5zE/pagP2A8PrcmnvEeaY/form');
});