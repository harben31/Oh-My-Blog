const postSubmit = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#postTitle').value;
    const mainText = document.querySelector('#postContent').value;

    // console.log();

    if(!title || !mainText){
        alert('Can\'t post and empty post, buddy!');
    } else {
        const res = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, mainText }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        console.log('!!!re!!!', res);
        if(res.ok){
            // document.location.replace('/');
        } else {
            alert('something went wrong')
        };
    };
}

document
.querySelector('#postSubBtn')
.addEventListener('click', postSubmit);