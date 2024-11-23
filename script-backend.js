const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

let imagesCount = 10;
const apiUrl = `http://localhost:8080/images/random?count=${imagesCount}`;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

function imageLoaded() {
    console.log('images Loaded');
    imagesLoaded++;
    console.log(totalImages);
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        console.log('ready= ', ready);
        imagesCount = 20;
        loader.hidden = true;
    }
}

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
    totalImages = photosArray.length;
    imagesLoaded = 0;

    photosArray.forEach((photo) => {
        // Create a link (if needed)
        const item = document.createElement('a');
        setAttributes(item, {
            'href': '#', // You can update this to a valid link if needed
            'target': '_blank'
        });

        // Create the image element
        const img = document.createElement('img');
        setAttributes(img, {
            'src': `data:image/jpeg;base64,${photo.content}`, // Use Base64 content
            'alt': photo.fileName,
            'title': photo.fileName
        });

        img.addEventListener('load', imageLoaded);

        // Append the image to the link, then append to the container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);

        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.error("error", error);
    }
}

window.addEventListener('scroll', () => {
    console.log('scrolled');
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000
        && ready) {
        ready = false;
        getPhotos();
        console.log('load more');
    }
});

getPhotos();
