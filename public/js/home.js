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
                // document.location.replace('/');
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

document
.querySelector('#cardContainer')
.addEventListener('click', (event) => {
    event.preventDefault(event);
    if(event.target.matches('.addCommentBtn')){
        addCommentFn(event)
    };
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

logInOutBtn = document.querySelectorAll('#logInBtn, #logOutBtn')

document.querySelector('#navBar').addEventListener('click', (event) => {
    if(event.target.matches('#homeBtn')){
        document.location.replace('/');
    } else if(event.target.matches('#logInBtn')){
        document.location.replace('/login');
    } else if(event.target.matches('#logOutBtn')){
        logOutFn();
    } else if(event.target.matches('#dashBtn')){
        document.location.replace('/dashboard');
    };
})
