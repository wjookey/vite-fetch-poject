const apiKey = 'live_4JTshuO2ZUy1FNrYNgHmOhm6hsYECjgaLmGWnIb3JsYlFrmgfFVvhTYVX6sd5g9m';

const selectBreed = document.getElementById('breedSelect');
const showPhotoButton = document.getElementById('showPhoto');

async function fetchBreeds() {
    try {
        const response = await fetch('https://api.thecatapi.com/v1/breeds', {
            headers: {
                'x-api-key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error("Could not fetch resourse");
        }
        const data = await response.json();

        data.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.textContent = breed.name;
            selectBreed.appendChild(option);
        });
    }
    catch (error) {
        console.error(error);
    }
}

function randomNum(len) {
    return Math.floor(Math.random() * len);
}

async function fetchImageByImageID(imgID, img) {
    try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/${imgID}`, {
            headers: {
                'x-api-key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error("Could not fetch resourse");
        }
        const data = await response.json();

        const url = data.url;
        img.src = `${url}`;
    }
    catch (error) {
        console.error(error);
    }
}

async function fetchImageByBreedID(breedID, img) {
    try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedID}`, {
            headers: {
                'x-api-key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error("Could not fetch resourse");
        }
        const data = await response.json();

        const url = data[0].url;
        img.src = `${url}`;
    }
    catch (error) {
        console.error(error);
    }
}

selectBreed.addEventListener("change", async event => {
    try {
        const breedID = document.getElementById("breedSelect").value;
        const response = await fetch(`https://api.thecatapi.com/v1/breeds/${breedID}`, {
            headers: {
                'x-api-key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }
        const data = await response.json();

        const breedInfo = document.getElementById('breedInfo');
        breedInfo.innerHTML = '';
        const header = document.createElement('h3');
        header.textContent = data.name;
        header.classList.add("breedName");
        breedInfo.appendChild(header);
        const img = document.createElement('img');
        fetchImageByImageID(data.reference_image_id, img);
        img.style = "max-width:300px; border-radius: 8px;";
        img.classList.add("breedImg")
        breedInfo.appendChild(img);

        const list = document.createElement('ul');
        list.classList.add("list");
        const li1 = document.createElement('li');
        li1.textContent = `Origin: ${data.origin}`;
        li1.classList.add("breedFact");
        const li2 = document.createElement('li');
        li2.textContent = `Life span: ${data.life_span} years`;
        li2.classList.add("breedFact");
        const li3 = document.createElement('li');
        li3.textContent = `Temperament: ${data.temperament}`;
        li3.classList.add("breedFact");
        const li4 = document.createElement('li');
        li4.textContent = `Description: ${data.description}`;
        li4.classList.add("breedFact");
        const li5 = document.createElement('li');
        const a = document.createElement('a');
        a.href = `${data.wikipedia_url}`;
        a.textContent = 'wikipedia';
        a.target = '_blank';
        a.classList.add("link");
        li5.textContent = `You can read more here on `;
        li1.classList.add("breedFact");
        li5.appendChild(a);
        list.appendChild(li1);
        list.appendChild(li2);
        list.appendChild(li3);
        list.appendChild(li4);
        list.appendChild(li5);

        breedInfo.appendChild(list);
    }
    catch (error) {
        console.error(error);
    }
});

showPhotoButton.addEventListener("click", async event => {
    try {
        const response = await fetch("https://api.thecatapi.com/v1/breeds", {
            headers: {
                'x-api-key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }
        const data = await response.json();
        let breedItems = [];
        const breed1 = data[randomNum(data.length)];
        let tmp = data[randomNum(data.length)];
        if (breed1 === tmp) {
            while (breed1 === tmp) {
                tmp = data[randomNum(data.length)];
            }
        }
        const breed2 = tmp;
        correct = Math.random() < 0.5 ? breed1 : breed2;
        const quizPart = document.getElementById("quizPart");
        quizPart.innerHTML = '';
        const img = document.createElement("img");
        fetchImageByBreedID(correct.id, img);
        img.style = "max-width:300px; border-radius: 8px;";
        img.classList.add("breedImg");
        quizPart.appendChild(img);
        const button1 = document.createElement("button");
        button1.value = breed1.id;
        button1.textContent = breed1.name;
        button1.id = "buttonBreed1";
        button1.classList.add("breedButton");
        const button2 = document.createElement("button");
        button2.value = breed2.id;
        button2.textContent = breed2.name;
        button2.id = "buttonBreed2";
        button2.classList.add("breedButton");
        quizPart.appendChild(button1);
        quizPart.appendChild(button2);
        const p = document.createElement('p');
        p.classList.add("result");
        button1.addEventListener("click", event => {
            if (button1.value === correct.id) {
                button1.disabled = true;
                button2.disabled = true;
                p.textContent = "You're right!";
                quizPart.appendChild(p);
            } else {
                button1.disabled = true;
                button2.disabled = true;
                p.textContent = "You're wrong!";
                quizPart.appendChild(p);
            }
        });
        button2.addEventListener("click", event => {
            if (button2.value === correct.id) {
                button1.disabled = true;
                button2.disabled = true;
                p.textContent = "You're right!";
                quizPart.appendChild(p);
            } else {
                button1.disabled = true;
                button2.disabled = true;
                p.textContent = "You're wrong!";
                quizPart.appendChild(p);
            }
        });
    }
    catch (error) {
        console.error(error);
    }
});



fetchBreeds();
