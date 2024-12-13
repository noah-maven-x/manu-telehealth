// Get the parameters that are passed in
function getQueryParams() {
    const params = {};
    window.location.search.slice(1).split('&').forEach(param => {
        const [key, value] = param.split('=');
        params[key] = decodeURIComponent(value);
    });
    return params;
}

// Load the Plans Page Typeform iFrame
function loadTypeform() {
    const params = getQueryParams();
    const { firstname, lastname, email, address, unlock } = params;
    const completedOnboarding = sessionStorage.getItem('completedOnboarding');

    if (firstname && lastname && email && address) {
        const typeformURL = `https://oxnd0gt94hj.typeform.com/to/dVNpNZfL#firstname=${encodeURIComponent(firstname)}&lastname=${encodeURIComponent(lastname)}&email=${encodeURIComponent(email)}&address=${encodeURIComponent(address)}`;

        const iframe = document.getElementById('typeform-embed');
        iframe.src = typeformURL;
        iframe.style.display = 'block';
    } else if (unlock === 'true') {
        // Allow access if the unlock parameter is present and true
        const typeformURL = `https://oxnd0gt94hj.typeform.com/to/dVNpNZfL`;
        const iframe = document.getElementById('typeform-embed');
        iframe.src = typeformURL;
        iframe.style.display = 'block';
    } else {
        const errorMessage = document.getElementById('errorMessage');
        const buttonContainer = document.getElementById('buttonContainer');
        errorMessage.style.display = 'block';
        buttonContainer.style.display = 'block';
    }
}

// Load the Appointment Page Booking iFrame
function loadAppointmentForm() {
    const params = getQueryParams();
    const firstname = params.firstname;
    const lastname = params.lastname;
    const email = params.email;
    const phone = params.phone;
    const unlock = params.unlock;

    const completedOnboarding = sessionStorage.getItem('completedOnboarding');
    const visitedPlans = sessionStorage.getItem('visitedPlans');

    if (unlock === 'true' || (completedOnboarding === 'true' && visitedPlans === 'true')) {
        const iframe = document.getElementById('ghl-embed');
        iframe.src = `https://api.leadconnectorhq.com/widget/booking/j68KTGV472uwOS60jGnA?first_Name=${encodeURIComponent(firstname)}&last_Name=${encodeURIComponent(lastname)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}`;
        iframe.style.display = 'block';
    } else {
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

// Get the user email from text box
function loadEmail() {
    const params = getQueryParams();
    const { email } = params;
    if (email) {
        document.getElementById('userEmail').value = email;
    }
}

// Send the trigger to recover application
function submitEmail() {
    const email = document.getElementById('userEmail').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && emailPattern.test(email)) {
        const webhookURL = `https://hook.us1.make.com/wqanohm1js3rh2f68r8vyee6bku2g8ad?email=${encodeURIComponent(email)}`;
        fetch(webhookURL)
            .then(response => {
                if (response.ok) {
                    alert('If your email matches our patient record, a link will be sent to your email and SMS on file to resume your application. If no messages are received, please start your application over.');
                    setTimeout(function () {
                        window.location.href = 'https://manutelehealth.com';
                    }, 50);
                } else {
                    alert('There was an error processing your request. Please send an email to info@manutelehealth.com for assistance.');
                }
            })
            .catch(error => {
                alert('There was an error processing your request. Please send an email to info@manutelehealth.com for assistance.');
            });
    } else {
        alert('Please enter a valid email address.');
    }
}

// Progress bar
document.addEventListener('DOMContentLoaded', function () {
    loadAppointmentForm();
    loadEmail();
    document.getElementById('submitEmailButton').addEventListener('click', submitEmail);

    const progressBar = document.getElementById('progress-bar');
    const encouragementText = document.getElementById('encouragement-text');
    const disclaimer = document.getElementById('disclaimer');

    let progress = 0;
    let message = '';
    let color = '#39bad8'; // default color

    if (window.location.pathname.includes('onboard')) {
        progress = 25;
        message = "Welcome! Let's get started with your onboarding.";
    } else if (window.location.pathname.includes('plans')) {
        progress = 50;
        message = "You're halfway there! Choose the plan that suits you best.";
    } else if (window.location.pathname.includes('appointment')) {
        progress = 75;
        message = "You're just about done! Let's set up your appointment.";
    }

    progressBar.style.width = progress + '%';
    progressBar.textContent = progress + '%';
    progressBar.style.backgroundColor = color; // Set the background color
    encouragementText.textContent = message;
    
    // Check disclaimer status
    checkDisclaimer();
    
});

// Application recovery listener
document.addEventListener('DOMContentLoaded', function() {
    loadTypeform();
    loadEmail();
    document.getElementById('submitEmailButton').addEventListener('click', submitEmail);
});