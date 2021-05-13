const postSubmit = async (event) => {

    const title = document.querySelector('#postTitle').value;
    const main_text = document.querySelector('#postContent').value;

    if(!title || !main_text){
        alert('Can\'t post and empty post, buddy!');
    } else {
        const res = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, main_text }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        if(res.ok){
            console.log('!!!!!!!! home.js!!!!!!!!', res, '!!!!!!!!!!');
            if(document.location.pathname === '/'){
                document.location.replace('/');
            } else if(document.location.pathname === 'dashboard'){
                document.location.replace('/dashboard');
            };
   
        } else {
            alert('something went wrong')
        };
    };
}

if(document.querySelector('#createPostForm')){
    document
    .querySelector('#postSubBtn')
    .addEventListener('click', (event) => {
        event.preventDefault();
        postSubmit(event);
    });
};

//adding comment
const addCommentFn = async (event) => {

    const commentArr = document.querySelectorAll('.commentMain');
    const post_id = event.target.dataset.post_id;
    let comment_main_text;

    commentArr.forEach((comment) => {
        if(comment.getAttribute('data-post_id')===post_id ){
            comment_main_text = comment.value;
        };
    });

    if(!comment_main_text){
        alert('cant post an empty comment, guy!');
    } else {
        const res = await fetch('/api/posts/comments', {
            method: 'POST',
            body: JSON.stringify({ comment_main_text, post_id }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(res.ok){
            document.location.replace('/');
        } else {
            alert('something went wrong');
        }
    }
};


const deletePost = async (event) => {
    const post_id = event.target.dataset.post_id;
    
    const res = await fetch(`/api/posts/${post_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log( '!!!!!!!!res del!!!!!', res);
    if(res.ok){
        console.log('what the hell');
        document.location.replace('/');
    } else {
        alert('something went wrong');
    };
};

document
.querySelector('#cardContainer')
.addEventListener('click', (event) => {
    event.preventDefault(event);
    if(event.target.matches('.addCommentBtn')){
        addCommentFn(event)
    } else if(event.target.matches('.deletePost')){
        deletePost(event)
    }
});

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

// const logInOutBtn = document.querySelectorAll('#logInBtn, #logOutBtn')
const main = document.querySelector('main');
console.log('!!!main!!!!', main)
const logInCard = document.querySelector('#logInCard');
const signUpCard = document.querySelector('#signUpCard');
card = document.querySelectorAll('.card');

document.querySelector('#navBar').addEventListener('click', (event) => {
    console.log(event.target);
    if(event.target.matches('#homeBtn')){
        document.location.replace('/');
    } else if(event.target.matches('#logInNavBtn')){
        // document.location.replace('/login');
        //need to toggle this when login route is hit
        logInCard.setAttribute('style', 'display: block');
        signUpCard.setAttribute('style', 'display: none');
        card.forEach((card) => {
            card.setAttribute('style', 'z-index: -1')
        });
        main.setAttribute('style', 'background: rgba(100, 100, 100, .6)');
    } else if(event.target.matches('#signUpNavBtn')){
        signUpCard.setAttribute('style', 'display: block');
        logInCard.setAttribute('style', 'display: none');
        card.forEach((card) => {
            card.setAttribute('style', 'z-index: -1')
        });
        main.setAttribute('style', 'background: rgba(100, 100, 100, .6)');
    } else if(event.target.matches('#logOutNavBtn')){
        logOutFn();
    } else if(event.target.matches('#dashBtn')){
        document.location.replace('/dashboard');
    };
});
