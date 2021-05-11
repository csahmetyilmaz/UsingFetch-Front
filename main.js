const postList = document.querySelector('.posts-list');
const addPostForm = document.querySelector('.add-post-form');
const btnSubmit = document.querySelector('.btnSubmit');
const titleValue = document.getElementById("title-value");
const bodyValue = document.getElementById("body-value");
const url = "http://localhost:3000/posts";
let output = '';

const renderPosts = (posts) => {
    posts.forEach(post => {
        output += `
      <div class="card mt-4 col-md-6 bg-light">
            <div class="card-body" data-id=${post.id}>
                <h5 class="card-title">${post.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${post.id}</h6>
                <p class="card-text">${post.body}</p>
                <a href="#" class="card-link" id="edit-post">Edit</a>
                <a href="#" class="card-link" id="delete-post">Delete</a>
            </div>
        </div>
      `;
    });
    postList.innerHTML = output;
}

//Get - Read the posts
//Method: GET

fetch(url)
    .then(res => res.json())
    .then(data => renderPosts(data))


postList.addEventListener('click', (e) => {
    e.preventDefault();
    let delButtonIsPressed = e.target.id === 'delete-post';
    let editButtonIsPressed = e.target.id === 'edit-post';

    let id = e.target.parentElement.dataset.id;

    //Delete - Remove existing post
    //Method: DELETE
    if (delButtonIsPressed){
        console.log('remove post');
        fetch(`${url}/${id}`,{
            method:'DELETE',
        })
            .then(res => res.json())
            .then(()=>location.reload())
    }


    if (editButtonIsPressed){
        const parent = e.target.parentElement;
        let titleContent = parent.querySelector('.card-title').textContent;
        let bodyContent = parent.querySelector('.card-text').textContent;

        titleValue.value=titleContent;
        bodyValue.value=bodyContent;
    }
    //Update - update existing post
    //Method: PUT
    btnSubmit.addEventListener('click',(e)=>{
        e.preventDefault();
        fetch(`${url}/${id}`,{
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: titleValue.value,
                body: bodyValue.value
            })
        })
            .then(res => res.json())
            .then(() =>location.reload())

    })


})

//Create - Insert new post
//Method: POST
addPostForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log("form submitted");
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: titleValue.value,
            body: bodyValue.value
        })
    })
        .then(res => res.json())
        .then(data => {
            const dataArr = [];
            dataArr.push(data);
            renderPosts(dataArr);
        })
})