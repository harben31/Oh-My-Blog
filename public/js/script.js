const logInSubmit = async (event) => {
    event.preventDefault();
    console.log('log in')

    const email = document.querySelector('#logInEmail');
    const password = document.querySelector('#logInPassword');

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
            alert('Log In Failed')
        };
    };
};

const signUpSubmit = async (event) => {
    event.preventDefault();
    console.log('sign up')

    const name = document.querySelector('#signUpName');
    const email = document.querySelector('#signUPEmail');
    const password = document.querySelector('#signUpPassword');

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
            alert('Sign Up Failed')
        };
    };
};

document
.querySelector('#logInBtn')
.addEventListener('submit', logInSubmit);

document
.querySelector('#signUpBtn')
.addEventListener('submit', signUpSubmit);

// document.querySelector('#logInBackground').addEventListener('submit', event => {
//     if(event.target.id === '#logInBtn'){
//         console.log('logIn')
//         logInSubmit();
//     };
//     if(event.target.id === '#signUpBtn'){
//         console.log('signIn')
//         signUpSubmit();
//     }
// });