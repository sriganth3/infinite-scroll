const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

const count = 10;
const apiKey = '';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

function imageLoaded(){
    console.log('images Loaded')
    imagesLoaded++;
    console.log(totalImages);
    console.log(imagesLoaded);
    if(imagesLoaded == totalImages){
        ready = true;
        console.log('ready= ', ready);
        loader.hidden = true;
    }
}

function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos(){
    totalImages = photosArray.length;
    imagesLoaded = 0;

    photosArray.forEach((photo) => {
        // create link to unSplash
        const item = document.createElement('a');

        setAttributes(item, {
            'href': photo.links.html,
            'target': '_blank'
        });

        // create image for photo
        const img = document.createElement('img');

        setAttributes(img, {
            'src': photo.urls.regular,
            'alt' : photo.alt_description,
            'title': photo.alt_description
        })

        img.addEventListener('load', imageLoaded);
        
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function getPhotos(){
    try {
        const response = await fetch(apiUrl);

        photosArray = await response.json();
        displayPhotos();
    }catch(error){
        console.error("error", error);
    }
}


window.addEventListener('scroll', () => {
    console.log('scrolled');
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000
            && ready){
        ready = false;
        getPhotos();
        console.log('load more');
    }
})

getPhotos();