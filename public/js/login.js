const logInSubmit = async (event) => {
    event.preventDefault();
    console.log('log in');

    const email = document.querySelector('#logInEmail').value.trim();
    const password = document.querySelector('#logInPassword').value.trim();
    
    if(email && password){
        const res = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password}),
            headers: { 
                'content-Type' : 'application/json'
            },
        });

        if(res.ok){
            document.location.replace('/');
        } else {
            //if time make a pop up
            alert('Log In Failed');
        };
    };
};

const signUpSubmit = async (event) => {
    event.preventDefault();
    console.log('sign up')

    const name = document.querySelector('#signUpName').value.trim();
    const email = document.querySelector('#signUpEmail').value.trim();
    const password = document.querySelector('#signUpPassword').value.trim();

    console.log(name, email, password)

    if(name && email && password){
        const res = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'content-type': 'application/json'
            },
        });

        if(res.ok){
            document.location.replace('/');
        } else {
            //if time make pop up
            alert('Sign Up Failed');
        };
    };
};

document
.querySelector('#logInBtn')
.addEventListener('click', logInSubmit);

document
.querySelector('#signUpBtn')
.addEventListener('click', signUpSubmit);


