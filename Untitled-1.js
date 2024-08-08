// description the title
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let submit = document.getElementById('submit');
let category = document.getElementById('category');
let count = document.getElementById('count');
let title = document.getElementById('title');
let search = document.getElementById('search');
let btndelete = document.getElementById('btndelete');

let mood = 'creat';
let idx ;


 //calculate the total
function getTotal(){
    if(price.value != ''){
 let result = (+price.value + +taxes.value + +ads.value ) - +discount.value ;
 total.innerHTML = result;
total.style.background = '#040';
    }  else {
         total.innerHTML = ''
        total.style.background = '#a00d02';

     }

}

//creat product

let datapro = [];
if (localStorage.product != null){
datapro = JSON.parse(localStorage.product) ;
} else{
datapro = [];
}


//save localstorage
submit.onclick = function(){
    let NewPro = {
        title:title.value.toUpperCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toUpperCase(),
      
    }


// add new product



if(mood === "creat"){

    if(NewPro.count > 1 ){
for ( let i = 0  ; i < NewPro.count ; i++ ){
 datapro.push(NewPro);
}
    } else{
        datapro.push(NewPro);
    }


} else {

 datapro[idx ] = NewPro;
 mood = 'creat';
 count.style.display='block';
 submit.innerHTML = 'creat';
}

  
   
   localStorage.setItem(  'product', JSON.stringify(datapro)           );
   clearData();
   readData();
}
// clean inputs when you subment
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
   total.innerHTML=''
    count.value = '';
    category.value = '';
};
// show data in table
function readData(){
    getTotal();
    let table ;
    for (i = 0 ; i < datapro.length ; i++ ){
        table += `

        <tbody>
        <tr>
        <td> ${i} </td>
        <td> ${datapro[i].title}</td>
        <td> ${datapro[i].price}</td>
        <td> ${datapro[i].taxes}</td>
        <td> ${datapro[i].ads}</td>
        <td> ${datapro[i].discount}</td>
        <td> ${datapro[i].category}</td>
        <td> <button id="ubdate"  onclick="ubdateItem(${i}) ">ubdate</button> </td>
        <td> <button onclick="deleteData(${i})" id="delete">delete</button> </td>
        
        </tr>
         </tbody>
         
        
         `;
}
 // show delete all button
    document.getElementById('tbody').innerHTML = table;
let btndelete = document.getElementById('deleteAll');
    if(datapro.length > 0){
        btndelete.innerHTML = `
        <button  onclick="DeleteAll()" >    Delete all     </button>
       
        `
     }
    
    else {
       btndelete.innerHTML = '';


    }

};





readData()

// delete 

function deleteData(i){
datapro.splice(i,1);
localStorage.product = JSON.stringify(datapro);
readData()
}



function DeleteAll(){

    localStorage.clear();
     readData();
  
    datapro.splice(0);
   
    }
   


// ubdate data


function ubdateItem(i){
title.value = datapro[i].title;
price.value = datapro[i].price;
taxes.value = datapro[i].taxes;
ads.value = datapro[i].ads;
discount.value = datapro[i].discount;
category.value = datapro[i].category;

getTotal();

count.style.display='none';
submit.innerHTML = 'ubdate';
mood = 'ubdate'
idx = i;
scroll({  
    top:0,
    behavior:'smooth',
 });
}




// search 
let searchMood = 'title';

function searching(id){
if(id === 'searchByTitle' ){
    searchMood = 'title';
    search.placeholder = 'search by title';
}else{
    searchMood = 'category'; 
    search.placeholder=  'search by category';
}
search.focus();

}


let table;
function getSearch(value){
    let table = '';

if(searchMood == 'title'){
 for(let i=0 ; i< datapro.length ; i++){
if(datapro[i].title.includes(value.toUpperCase())){
    table += `

    <tbody>
    <tr>
    <td> ${i} </td>
    <td> ${datapro[i].title}</td>
    <td> ${datapro[i].price}</td>
    <td> ${datapro[i].taxes}</td>
    <td> ${datapro[i].ads}</td>
    <td> ${datapro[i].discount}</td>
    <td> ${datapro[i].category}</td>
    <td> <button id="ubdate"  onclick="ubdateItem(${i}) ">ubdate</button> </td>
    <td> <button onclick="deleteData(${i})" id="delete">delete</button> </td>
    
    </tr>
     </tbody>
     
    
     `;
}
 }
}










else{
    for(let i=0 ; i< datapro.length ; i++){
        if(datapro[i].category.includes(value.toUpperCase())){
            table += `
        
            <tbody>
            <tr>
            <td> ${i} </td>
            <td> ${datapro[i].title}</td>
            <td> ${datapro[i].price}</td>
            <td> ${datapro[i].taxes}</td>
            <td> ${datapro[i].ads}</td>
            <td> ${datapro[i].discount}</td>
            <td> ${datapro[i].category}</td>
            <td> <button id="ubdate"  onclick="ubdateItem(${i}) ">ubdate</button> </td>
            <td> <button onclick="deleteData(${i})" id="delete">delete</button> </td>
            
            </tr>
             </tbody>
             
            
             `;
        }
         }
}
document.getElementById('tbody').innerHTML = table;
}












