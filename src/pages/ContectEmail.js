function toggleDetails(button) {
    const moreDetails = button.parentElement.previousElementSibling;

    if (moreDetails.classList.contains('hidden')) {
        moreDetails.classList.remove('hidden');
        button.innerText = 'Read Less';  
    } else {
        moreDetails.classList.add('hidden');
        button.innerText = 'Read More';
    }
}

function sendMail(event) {
    event.preventDefault(); 

    let params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("textarea").value
    };

    emailjs.send("service_foq71a3", "template_z2comz3", params)
        .then(function(response) {
            console.log('Main email sent successfully!', response.status, response.text);
            alert("Email sent successfully");
            document.getElementById("name").value = '';
            document.getElementById("email").value = '';
            document.getElementById("subject").value = '';
            document.getElementById("textarea").value = '';
        })
        .catch(function(error) {
            console.error('Failed to send main email.', error);
            alert('Failed to send the email. Please try again later.');
        });
}
