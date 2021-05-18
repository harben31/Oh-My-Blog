//sending post information to the server to create post
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
            document.location.replace('/dashboard');
        } else {
            alert('something went wrong');
        };
    };
};

//delegating event listener on the createPost element
if(document.querySelector('#createPostForm')){
    document
    .querySelector('#postContainer')
    .addEventListener('click', (event) => {
        event.preventDefault();
        const target = event.target;

        if(target.matches('#toggleCreate')){
            // toggles the title and text input to display
            document.querySelector('#createPostWrap').setAttribute('style', 'display: flex');
            document.querySelector('#toggleCreate').setAttribute('style', 'display: none');
        } else if(target.matches('#postSubBtn')){
            postSubmit(event);
        }
    });
};

//adding comment
const addCommentFn = async (event) => {

    const commentArr = document.querySelectorAll('.commentMain');
    //the post PK is attached to the post element as a data- attribute
    const post_id = event.target.dataset.post_id;
    let comment_main_text;

    //loops through the posts to find the post that was clicked on
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
            if(document.location.pathname === '/'){
                document.location.replace('/');
            } else if(document.location.pathname === '/dashboard'){
                document.location.replace('/dashboard');
            };
        } else {
            alert('something went wrong');
        }
    }
};

//deleting post
const deletePost = async (event) => {
    const post_id = event.target.dataset.post_id;
    
    //passes the stored id from the html element to the end of the url
    const res = await fetch(`/api/posts/${post_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    if(res.ok){
        document.location.replace('/dashboard');
    } else {
        alert('something went wrong');
    };
};

//update post
const updatePost = async (event, main_text) => {
    const post_id = event.target.dataset.post_id;

    //passes the stored id from the html element to the end of the url
    const res = await fetch(`api/posts/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({ main_text }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(res.ok){
        document.location.replace('/dashboard');
    } else {
        alert('something went wrong');
    }
};

//turns the whole post element to have a pointer curser only if the user is on their dashboard page indicating it is clickable
if(document.location.pathname === '/dashboard'){
    const cards = document.querySelectorAll('.card');

    cards.forEach((card) => {
        card.setAttribute('style', 'cursor: pointer');
    })
}

//delegates event listener on the div that contains all posts
document
.querySelector('#cardContainer')
.addEventListener('click', (event) => {
    event.preventDefault(event);

    const target = event.target;
   
    //making all elements of the card trigger the function only if the user is on their dashboard
    if((target.matches('.card') 
    || target.matches('.cardHeader') 
    || target.matches('.postTextArea')) 
    && document.location.pathname === '/dashboard'){
        const cards = document.querySelectorAll('.card');

        //using dom traversal get to the element that the data-post_id is stored  
        cards.forEach((card) => {
            if(target.dataset.post_id === card.getAttribute('data-post_id') 
            || target.parentNode.dataset.post_id === card.getAttribute('data-post_id')
            || target.parentNode.parentNode.dataset.post_id === card.getAttribute('data-post_id')){
                //toggles the edit and delete buttons and unsets the cursor pointer so the user is not confused about about where to click
                card.childNodes[5].setAttribute('style', 'display: flex');
                card.setAttribute('style', 'cursor: unset');
            }
        });
        //toggles the comment text input and submit button when clicked
    } else if(target.matches('.addCommentToggle') || target.matches('.addCommentToggleHome')){
        //depending on the page the elements are arranged differently
        if(document.location.pathname === '/dashboard') {
            target.parentNode.childNodes[11].setAttribute('style', 'display: flex');
        } else if (document.location.pathname === '/'){
            target.parentNode.childNodes[9].setAttribute('style', 'display: flex');
        }
        target.setAttribute('style', 'display: none');
        //submit comment
    } else if(target.matches('.addCommentBtn')){
        addCommentFn(event);
        //delete post
    } else if(target.matches('.deletePost')){
        deletePost(event);
        //toggle post to become editable
    } else if(target.matches('.updatePost')){
        target.setAttribute('style', 'display: none');
        target.nextElementSibling.setAttribute('style', 'display: block');
        target.parentNode.previousElementSibling.firstElementChild.setAttribute('contenteditable', 'true');
        target.nextElementSibling.setAttribute('style', 'display: block');
        //submit edit 
    } else if(target.matches('.sendUpdatePost')){
        updatePost(event, target.parentNode.previousElementSibling.firstElementChild.innerText);
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

//navbar functionality
const modalWrap = document.querySelector('#modalWrap');
const logInCard = document.querySelector('#logInCard');
const signUpCard = document.querySelector('#signUpCard');
const card = document.querySelectorAll('.card');

document.querySelector('#navBar').addEventListener('click', (event) => {
    const target = event.target;
    
    //sends user to home page when clicked
    if(target.matches('#homeBtn')){
        document.location.replace('/');

        //brings the log in modal onto the page
    } else if(target.matches('#logInNavBtn')){
        logInCard.setAttribute('style', 'display: block');
        signUpCard.setAttribute('style', 'display: none');
        card.forEach((card) => {
            card.setAttribute('style', 'z-index: -1')
        });
        modalWrap.setAttribute('style', 'background: rgba(100, 100, 100, .6)');

        //brings sign in modal onto page
    } else if(target.matches('#signUpNavBtn')){
        signUpCard.setAttribute('style', 'display: block');
        logInCard.setAttribute('style', 'display: none');
        card.forEach((card) => {
            card.setAttribute('style', 'z-index: -1')
        });
        modalWrap.setAttribute('style', 'background: rgba(100, 100, 100, .6)');

        //logs user out
    } else if(target.matches('#logOutNavBtn')){
        logOutFn();

        //redirects user to their dash board
    } else if(target.matches('#dashBtn')){
        document.location.replace('/dashboard');
    };
});
