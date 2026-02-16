const loadCatagories = () => {
    const url = "https://fakestoreapi.com/products/categories";
    fetch(url)
    .then(res => res.json())
    .then(data => {
        displayCatagories(data)
    });
    
}
const loadProducts = (category="all") => {

    let url;

    if(category==="all"){
        url="https://fakestoreapi.com/products";
    }
    else{
        url=`https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`;
    }

    fetch(url)
    .then(res=>res.json())
    .then(data=>showProducts(data));
}
const showProducts = (products)=>{

const container=document.getElementById("product-container");

container.innerHTML="";

container.className =
"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6";

products.forEach(p=>{

const div=document.createElement("div");

div.className="bg-white rounded-xl shadow p-4 flex flex-col";

div.innerHTML=`

<!-- IMAGE BOX -->
<div class="bg-gray-100 rounded-lg p-6 h-52 flex items-center justify-center w-11/12 mx-auto">
<img src="${p.image}" class="h-40 object-contain">
</div>

<!-- CATEGORY + RATING -->
<div class="flex justify-between items-center mt-3">

<span class="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">
${p.category}
</span>

<span class="text-sm text-gray-500 flex items-center gap-1">
<span class="text-yellow-400"><i class="fa-solid fa-star"></span></i>${p.rating.rate} (${p.rating.count})
</span>

</div>

<!-- TITLE -->
<h3 class="font-semibold mt-2 line-clamp-2 min-h-[48px]">
${p.title}
</h3>

<!-- PRICE -->
<p class="font-bold text-lg mt-1">
$${p.price}
</p>

<!-- BUTTONS -->
<div class="flex gap-2 mt-3">

<button onclick="showDetails(${p.id})" class="flex-1 border rounded-lg py-2 text-sm hover:bg-gray-100">
<i class="fa-solid fa-eye"></i> Details
</button>

<button class="flex-1 bg-indigo-600 text-white rounded-lg py-2 text-sm hover:bg-indigo-700">
<i class="fa-solid fa-cart-shopping"></i> Add
</button>

</div>

`;

container.appendChild(div);

});

}
const displayCatagories = (categories) => {
    

const container = document.getElementById("category-container");
container.innerHTML="";

// add ALL button
const allBtn=document.createElement("button");
allBtn.innerText="All";
allBtn.className="cat-btn btn rounded-2xl";
allBtn.onclick=(e)=>{ setActive(e.target); loadProducts("all"); };
container.appendChild(allBtn);


categories.forEach(category => {

const btn=document.createElement("button");

btn.innerText=category;
btn.className="cat-btn btn rounded-2xl";
btn.onclick=(e)=>{ setActive(e.target); loadProducts(category); };
// btn.className="btn rounded-2xl";

// btn.onclick=()=>loadProducts(category);

container.appendChild(btn);

});

}
function setActive(btn){

document.querySelectorAll(".cat-btn").forEach(b=>{
    b.classList.remove("bg-indigo-600","text-white");
});

btn.classList.add("bg-indigo-600","text-white");

}
const loadTrending = () => {

fetch("https://fakestoreapi.com/products")
.then(res=>res.json())
.then(products=>{

const topRated = products
.sort((a,b)=>b.rating.rate - a.rating.rate)
.slice(0,3);

showTrending(topRated);

});

};
const showTrending = (products)=>{

const container=document.getElementById("trending-container");
container.innerHTML="";

products.forEach(p=>{

const div=document.createElement("div");

div.className="bg-white rounded-xl shadow p-4 flex flex-col";

div.innerHTML=`

<div class="bg-gray-100 rounded-lg p-6 h-52 flex items-center justify-center">
<img src="${p.image}" class="h-40 object-contain">
</div>

<div class="flex justify-between items-center mt-3">
<span class="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">
${p.category}
</span>

<span class="text-sm text-gray-500">
<span class="text-yellow-400"><i class="fa-solid fa-star"></span></i> ${p.rating.rate} (${p.rating.count})
</span>
</div>

<h3 class="font-semibold mt-2 line-clamp-2 min-h-[48px]">
${p.title}
</h3>

<p class="font-bold text-lg">$${p.price}</p>

<div class="flex gap-2 mt-3">

<button onclick="showDetails(${p.id})" class="flex-1 border rounded-lg py-2 text-sm hover:bg-gray-100">
<i class="fa-solid fa-eye"></i> Details
</button>


<button class="flex-1 bg-indigo-600 text-white rounded-lg py-2 text-sm hover:bg-indigo-700">
<i class="fa-solid fa-cart-shopping"></i> Add
</button>

</div>
`;

container.appendChild(div);

});

};
//modal
function showDetails(id){

fetch(`https://fakestoreapi.com/products/${id}`)
.then(res=>res.json())
.then(product=>{

document.getElementById("modal-title").innerText=product.title;
document.getElementById("modal-img").src=product.image;
document.getElementById("modal-desc").innerText=product.description;
document.getElementById("modal-price").innerText="$"+product.price;

document.getElementById("product-modal").classList.remove("hidden");

});

}
function closeModal(){
document.getElementById("product-modal").classList.add("hidden");
}
// Home and product

function showSection(id){

    document.getElementById("bydefault").classList.add("hidden");
    document.getElementById("our-products").classList.add("hidden");

    document.getElementById(id).classList.remove("hidden");
}

loadTrending();

loadCatagories();
