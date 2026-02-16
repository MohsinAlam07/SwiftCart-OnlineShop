const loadCatagories = () => {
    const url = "https://fakestoreapi.com/products/categories";
    fetch(url)
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        displayCatagories(data);
    });
    
}

const displayCatagories = (categories) => {
    console.log(categories);

    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = "";

    categories.forEach(category => {
        const btnDiv=document.createElement("div");
        btnDiv.innerHTML=`
        
        <button class="btn  rounded-2xl">${category}</button>`
        productContainer.append(btnDiv);
    });
}

loadCatagories();