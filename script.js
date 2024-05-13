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
    // console.log('photos array', photosArray);
    totalImages = photosArray.length;
    imagesLoaded = 0;

    photosArray.forEach((photo) => {
        // create link to unSplash
        const item = document.createElement('a');
        
        // console.info(photo.links.html);
        
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');

        setAttributes(item, {
            'href': photo.links.html,
            'target': '_blank'
        });


        // create image for photo
        const img = document.createElement('img');

        // console.log(photo.alt_description);
        
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);

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
        // const pics = await response.json();
        // console.log(pics);
        // photosArray.push(... pics);

        photosArray = await response.json();
        console.log(photosArray);
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