const itemName=document.getElementById(`name`);
const itemImageUrl=document.getElementById(`image_url`);
const itemDescription=document.getElementById(`description`);
const itemType=document.getElementById(`type`);
const itemPrice=document.getElementById(`price`);
const itemLocation=document.getElementById(`location`);
const deleteBtn=document.getElementById(`delete-btn`)
const backToMainBtn=document.getElementById(`backToMain-btn`);

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

backToMainBtn.addEventListener(`click`,()=>{
    window.location.replace(`index.html`);
});
const fetchItemById= async()=>{
    try{
    const response= await fetch(`https://665f48b11e9017dc16f39e3c.mockapi.io/flowers/${id}`);
    const item=await response.json();
      itemImageUrl.src=item.image_url;
      itemName.textContent=item.name;
      itemPrice.textContent=`${item.price} ${`Eur`}`;
      itemType.textContent=item.type;
      itemDescription.textContent=item.description;
      itemLocation.textContent=item.location;   
    }catch(err){
        console.log(err);
    }
}; 
fetchItemById();

deleteBtn.addEventListener(`click`,()=>deleteItem(id)); 
const deleteItem=async(itemId)=>{
    try{
     const response= await fetch(`https://665f48b11e9017dc16f39e3c.mockapi.io/flowers/${itemId}`,
     {
     method: "DELETE",
     });
    const status=await response.json();
     alert(`Pasirinkta prekė ištrinta`);

    setTimeout(()=>{
        window.location.replace(`index.html`);
    }, 1000);
    }catch(err){
        console.log(err);
    }
};

const goBackToMain = (type) =>{
    let url = 'index.html';
    if (type) {
      url += `?type=${encodeURIComponent(type)}`;
    }
    window.location.href = url;
};    
    
