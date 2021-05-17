const logInSubmit = async () => {

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
            alert('Log In Failed');
        };
    };
};

const signUpSubmit = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#signUpName').value.trim();
    const email = document.querySelector('#signUpEmail').value.trim();
    const password = document.querySelector('#signUpPassword').value.trim();

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
            alert('Sign Up Failed');
        };
    };
};

document
.querySelector('#logInCard')
.addEventListener('click', (event) => {
    event.preventDefault();
    const target = event.target;
    if(target.matches('#logInBtn')){
        logInSubmit()
        //toggles to sign up card from log in card
    } else if(target.matches('#toSignUp')){
        document.querySelector('#logInCard').setAttribute('style', 'display: none');
        document.querySelector('#signUpCard').setAttribute('style', 'display: flex');
    }
});

document
.querySelector('#signUpBtn')
.addEventListener('click', signUpSubmit);


