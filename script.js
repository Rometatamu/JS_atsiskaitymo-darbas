const addNewItem=document.getElementById(`add-item-btn`);
const cardsWrapper=document.getElementById(`cards-wrapper`);
const liveFilterBtn=document.getElementById(`live-btn`);
const artificialFilterBtn=document.getElementById(`artificial-btn`);
const stabilisedFilterBtn=document.getElementById(`stabilised-btn`);
const allItemFilterBtn=document.getElementById(`all-items-btn`);
const liveFooterLi=document.getElementById(`live-li`);
const artificialFooterLi=document.getElementById(`artificial-li`);
const stabilisedFooterLi=document.getElementById(`stabilised-li`);
const allItemsFooterLi=document.getElementById(`all-items-li`);
const mobileMeniuBtn=document.getElementById(`mobile-meniu-btn`);
const mobileNav=document.getElementById(`mobile-nav`);
const liveNavLink=document.getElementById(`live-link`);
const artificialNavLink=document.getElementById(`artificial-link`);
const stabilisedNavLink=document.getElementById(`stabilised-link`);
const allItemsNavLink=document.getElementById(`all-items-link`);
let flowers=[];


const buildCards = (flowers) => {
    cardsWrapper.innerHTML=``;
    flowers.forEach((f)=>{
        const card=document.createElement(`div`);
        card.setAttribute(`class`, `card`);
        const photo=document.createElement(`img`);
        photo.setAttribute(`class`, `card-image`);
        photo.src=f.image_url;
        const name=document.createElement(`h2`);
        name.textContent=f.name;
        const price=document.createElement(`h3`);
        price.textContent=`${f.price} ${`Eur`}`;   
        card.append(photo, name, price);
        cardsWrapper.append(card);
        card.addEventListener(`click`,()=>goToItem(f.id));
      }); 
}; 
const goToItem = (id) => window.location.replace(`item.html?id=${id}`);


const fetchAllFlowers= async()=>{
    try{
    const response= await fetch(`https://665f48b11e9017dc16f39e3c.mockapi.io/flowers`);
    flowers=await response.json();
    flowers.sort((a, b) => a.price - b.price);
    buildCards(flowers);
    }catch(err){
        console.log(err);
    }
}; 
fetchAllFlowers();  

const handleButtonClick = (type) => {
    const filteredFlowers = type ? flowers.filter((f) => f.type == type) : flowers;
    buildCards(filteredFlowers);
};

liveFilterBtn.addEventListener('click', () =>handleButtonClick("Puokštės"));
liveFooterLi.addEventListener('click', () => handleButtonClick("Puokštės"));
liveNavLink.addEventListener('click', () => handleButtonClick("Puokštės"));
artificialFilterBtn.addEventListener('click', () => handleButtonClick("Dirbtinės"));
artificialFooterLi.addEventListener('click', () => handleButtonClick("Dirbtinės"));
artificialNavLink.addEventListener('click', () => handleButtonClick("Dirbtinės"));
stabilisedFilterBtn.addEventListener('click', () => handleButtonClick("Stabilizuotos"));
stabilisedFooterLi.addEventListener('click', () => handleButtonClick("Stabilizuotos"));
stabilisedNavLink.addEventListener('click', () => handleButtonClick("Stabilizuotos"));
allItemFilterBtn.addEventListener('click', () => handleButtonClick());
allItemsFooterLi.addEventListener('click', () => handleButtonClick());
allItemsNavLink.addEventListener('click', () => handleButtonClick());


addNewItem.addEventListener(`click`,()=>{
 window.location.replace(`newitem.html`);
});
mobileMeniuBtn.addEventListener(`click`,(e)=>{
 mobileNav.classList.toggle(`active`);
 e.stopPropagation();
});
mobileNav.addEventListener(`click`,(e)=>{
 mobileNav.classList.remove(`active`);
 e.stopPropagation();
});
document.addEventListener('click', () => {
    mobileNav.classList.remove('active');
});


document.addEventListener('DOMContentLoaded', async(event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get(`type`);
    await fetchAllFlowers();
    if (type){
        handleButtonClick(type);
    } else{
        buildCards(flowers)   
    }
});

