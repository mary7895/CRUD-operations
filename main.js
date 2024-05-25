var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var addBtn = document.getElementById("addBtn");
var inputes = document.getElementsByClassName("input1");
var searchInput = document.getElementById("search");
var products = [];

searchInput.onkeyup = function () {
  searchProducts();
};

addBtn.onclick = function () {
  addProducts();
  displayProducts();
  clear();
};

function addProducts() {
  var product = {
    name: productName.value,
    price: productPrice.value,
    cat: productCategory.value,
    desc: productDescription.value,
  };
  products.push(product);
}

function displayProducts() {
  var trs = "";
  for (var i = 0; i < products.length; i++) {
    trs += `
          <tr>
            <td>${i + 1}</td>
            <td>${products[i].name}</td>
            <td>${products[i].price}</td>
            <td>${products[i].cat}</td>
            <td>${products[i].desc}</td>
            <td><button onclick="deleteProduct(${i})" class="delbottom">Delete</button></td>
            <td><button onclick="updateProduct(${i})" class="addbottom">Update</button></td>
          </tr>
        `;
  }
  document.getElementById("data").innerHTML = trs;
}

function clear() {
  for (var i = 0; i < inputes.length; i++) {
    inputes[i].value = "";
  }
}

function deleteProduct(index) {
  products.splice(index, 1);
  displayProducts();
}

function updateProduct(index) {
  var updatedName = prompt("Enter updated name:", products[index].name);
  if (updatedName !== null) {
    products[index].name = updatedName;
    displayProducts();
  }
}

function searchProducts() {
  var searchTerm = searchInput.value.toLowerCase();
  var filteredProducts = products.filter(function (product) {
    return (
      product.name.toLowerCase().includes(searchTerm) ||
      product.cat.toLowerCase().includes(searchTerm) ||
      product.desc.toLowerCase().includes(searchTerm)
    );
  });
  displayFilteredProducts(filteredProducts);
}

function displayFilteredProducts(filteredProducts) {
  var trs = "";
  for (var i = 0; i < filteredProducts.length; i++) {
    trs += `
          <tr>
            <td>${i + 1}</td>
            <td>${filteredProducts[i].name}</td>
            <td>${filteredProducts[i].price}</td>
            <td>${filteredProducts[i].cat}</td>
            <td>${filteredProducts[i].desc}</td>
            <td><button onclick="deleteProduct(${i})" class="delbottom">Delete</button></td>
            <td><button onclick="updateProduct(${i})" class="addbottom">Update</button></td>
          </tr>
        `;
  }
  document.getElementById("data").innerHTML = trs;
}
// Check if there is any data in local storage
var storedProducts = localStorage.getItem("products");

// If there is, parse the JSON data and assign it to the products array
if (storedProducts) {
  products = JSON.parse(storedProducts);
}

// Now your products array contains data from local storage or is an empty array if no data was found
saveToLocalStorage();

function saveToLocalStorage() {
  // Convert the products array to JSON and store it in local storage
  localStorage.setItem("products", JSON.stringify(products));
}
