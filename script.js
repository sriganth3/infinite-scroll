const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

const count = 10;
const apiKey = '';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function displayPhotos(){
    photosArray.forEach((photo) => {
        // create link to unSplash
        const item = document.createElement('a');
        console.log(photo.links.html);
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');


        // create image for photo
        const img = document.createElement('img');
        // console.log(photo.alt_description);
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();
    }catch(error){
        console.error("error", error);
    }
}

getPhotos();