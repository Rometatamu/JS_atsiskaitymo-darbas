const imageUrl = document.getElementById('image_url');
const type = document.getElementById('type');
const description = document.getElementById('description');
const itemName = document.getElementById('name');
const price = document.getElementById('price');
const itemLocation=document.getElementById(`location`);
const addItemBtn = document.getElementById('add-item-btn');
const backBtn=document.getElementById(`backToMain-btn`);
const successMessage=document.getElementById(`success-message`);
const descriptionRegex=/^.{50,}$/;
const priceRegex = /^\d+$/;
const typeRegex = /^.+$/;
const imageUrlRegex = /^https:\/\/.{10,}.jpg$/;

const createNewItem=()=> {
    return {
        type: type.value,
        image_url: imageUrl.value,
        description: description.value,
        name: itemName.value,
        price: price.value,
        location: itemLocation.value
    };
};

const sendNewItem= async(item)=> {
    try {
        const response = await fetch('https://665f48b11e9017dc16f39e3c.mockapi.io/flowers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(item),
        });
        const result = await response.json();
        successMessage.textContent=`Jūsų prekė įkelta sėkmingai.`;

        setTimeout(() => {
            window.location.replace('index.html');
        }, 3000);
    } catch (error) {
        console.error('Error adding new item:', error);
        alert('Įvyko klaida pridedant prekę.');
    }
};

backBtn.addEventListener(`click`,()=>{
    window.location.replace(`index.html`);
});

addItemBtn.addEventListener('click', () => {
    const newItem = createNewItem();
    if(!typeRegex.test(newItem.type)) {
        alert('Turite pasirinkti gėlių tipą.');
        return;
    }
    if (!imageUrlRegex.test(newItem.image_url)) {
        alert('Nuotrauka turi būti formatu https://klsųhdjdk.jpg.');
        return; 
    }
    if (!descriptionRegex.test(newItem.description)) {
        alert('Aprašyme turi būti bent 50 simbolių.');
        return; 
    }
    if(!priceRegex.test(newItem.price)) {
        alert('Kaina turi būti skaičius (pvz.: 99.99).');
        return;
    }
    sendNewItem(newItem);
});

const goBackToMain = (type) =>{
    let url = 'index.html';
    if (type) {
      url += `?type=${encodeURIComponent(type)}`;
    }
    window.location.href = url;
};    

    