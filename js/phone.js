const loadPhone = async (searchText , isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data;
    displayPhones(phones,isShowAll);
}

const displayPhones = (phones,isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';
    // display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }

    // console.log('is show all', isShowAll);
    // display only twelve phones if not show all
   if(!isShowAll){
    phones = phones.slice(0,12);
   }


    // console.log(phones.length);
    // console.log(phones);
    phones.forEach(phone => {

    //    console.log(phone);

        //2. create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card bg-gray-200 p-4';
        //3.set inner html
        phoneCard.innerHTML = `
        <figure>
         <img
           src="${phone.image}"
           alt="Shoes" />
       </figure>
       <div class="card-body text-center">
         <h2 class="text-2xl font-semibold">${phone.phone_name}</h2>
         <p>If a dog chews shoes whose shoes does he choose?</p>
         <div onclick = "handleShowDetail('${phone.slug}')" class="card-actions justify-center">
           <button class="btn btn-primary">Show details</button>
         </div>
       </div>

        `;
        
        //4.append child

        phoneContainer.appendChild(phoneCard);

    });

    // hide loading spinner
    toggleLoadingSpinner(false);
}


const handleShowDetail = async(id) =>{
    // console.log('click show details', id);
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) =>{
    console.log(phone)
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');

    showDetailContainer.innerHTML = `
      <img class = "my-4" src="${phone.image}" alt="">
    <p><span class = "font-bold" >Storage : </span> ${phone?.mainFeatures?.storage}</p>
    <p><span class = "font-bold" >Display Size : </span> ${phone?.mainFeatures?.displaySize}</p>
    <p><span class = "font-bold" >Chipset : </span> ${phone?.mainFeatures?.chipSet}</p>
    <p><span class = "font-bold" >Memory : </span> ${phone?.mainFeatures?.memory}</p>
    <p><span class = "font-bold" >Slug : </span> ${phone?.slug}</p>
    <p><span class = "font-bold" >Release Date : </span> ${phone?.releaseDate}</p>
    <p><span class = "font-bold" >Brand : </span> ${phone?.brand}</p>
    <p><span class = "font-bold" >GPS : </span> ${phone?.others?.GPS || 'No GPS Available'}</p>


    `



    // show the modal
    show_details_modal.showModal()
}



 const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
//   console.log(searchText);
  loadPhone(searchText,isShowAll);
 }




//  handle search recap
//  const handleSearch2 = () => {
//     toggleLoadingSpinner(true);
//   const searchField = document.getElementById('search-field2');
//   const searchText = searchField.value;
// //   console.log(searchText);
//   loadPhone(searchText);
//  }

const toggleLoadingSpinner = (isloading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isloading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

// handle show all

const handleShowAll = () =>{
    handleSearch(true);
}



// loadPhone();