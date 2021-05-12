const logOutFn = async () => {
    const res = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(res.ok){
        document.location.replace('/')
    } else {
        alert('something went wrong')
    };
};

document.querySelector('#navBar').addEventListener('click', (event) => {
    if(event.target.matches('#homeBtn')){
        document.location.replace('/');
    } else if(event.target.matches('#logInBtn')){
        document.location.replace('/login');
    } else if(event.target.matches('#logOutBtn')){
        logOutFn();
    };
});