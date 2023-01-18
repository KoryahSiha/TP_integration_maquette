const contactForm = document.getElementById("contactForm");

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // // récupère les éléments par leur id  
    // const nameInput = document.getElementById("name");
    // const emailInput = document.getElementById("email");
    // const phoneInput = document.getElementById("phone");
    // const passwordInput = document.getElementById("password");
    

    const formData = new FormData(contactForm);
    
    
    const errors = {
        firstName: document.getElementById('firstNameError'),
        lastName: document.getElementById('lastNameError'),
        email: document.getElementById('emailError'),
        phone: document.getElementById('phoneError'),
        message: document.getElementById('messageError'),
    }


    let error = false;

    const userData = {}
    

    const firstNameRegex = /^[a-zA-Z ]+$/;
    const lastNameRegex = /^[a-zA-Z ]+$/;
    const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    const messageRegex = /.*/;
    

    formData.forEach((value, key) => {
        if (!value) {
            error = true;
            errors[key].style.display = 'block';
        } else {
            if (key === 'firstName' && !firstNameRegex.test(value)) {
                error = true;
                return errors[key].style.display = 'block';
            } else if (key === 'lastName' && !lastNameRegex.test(value)) {
                error = true;
                return errors[key].style.display = 'block';
            } else if (key === 'email' && !emailRegex.test(value)) {
                error = true;
                return errors[key].style.display = 'block';
            } else if (key === 'phone' && !phoneRegex.test(value)) {
                error = true;
                return errors[key].style.display = 'block';
            } else if (key === 'message' && !messageRegex.test(value)) {
                error = true;
                return errors[key].style.display = 'block';
            }

            error = false;
            errors[key].style.display = 'none';
            userData[key] = value;
        }
    });

    if (!error) {
        /* Si pas d'erreur, ça envoie les données au serveur */
        axios.post('http://212.83.176.255:3030/contact', userData)
            // Récupération de la réponse en cas de succès.
            .then((response) => {
                console.log(response.data);
            // Récupération de l'error en cas d'erreur.
            }).catch((error) => {
                console.error(error);
            });
        console.log(formData)
        contactForm.reset()
    }
});