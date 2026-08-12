import { DrinksItems , FoodItems } from "./data/allitemdata.js";
let Drinks=JSON.parse(localStorage.getItem("ALLDRINKSITEMS"));
let foodItems=JSON.parse(localStorage.getItem("ALLFOODITEMS"));
if(!Drinks){
  Drinks = DrinksItems;
};

if(!foodItems){
  foodItems = FoodItems;
};

let maindiv = document.getElementById("main-div");
//category and actegoryof ask must be global
let category = { foodItems, Drinks };
let selectionElement = document.getElementById("category");
for (let cat in category) {
  let opt = document.createElement("option");
  opt.value = cat;
  opt.textContent = cat;
  selectionElement.appendChild(opt);
}
let ask = "foodItems";
let selectedItems = category[ask];
selectionElement.addEventListener("change", () => {
  selectedItems = category[selectionElement.value];
  console.log(selectionElement.value);
  defaultrun(selectedItems);
});

defaultrun(selectedItems);
function defaultrun(selectedItems) {
  maindiv.innerHTML = "";
  for (let i in selectedItems) {
    let itemname = i;
    let itemprice = selectedItems[i].price;
    let imageaddress = selectedItems[i].image;
    let quantity = selectedItems[i].quantity;
    let addbutton = i + "-addItem";
    let subdiv = i + "-div";
    let minus = i + "-minus";
    let idquantity = i + "-quantity";
    let plus = i + "-plus";
    let itemDiv = document.createElement("div");
    itemDiv.className = "item-div";

    let img = document.createElement("img");
    img.className = "foodimage";
    img.src = imageaddress;

    let name = document.createElement("p");
    name.className = "item-name";
    name.innerHTML = itemname;

    let price = document.createElement("p");
    price.className = "item-cost";
    price.innerHTML = "$" + itemprice;

    let addItemButton = document.createElement("button");
    addItemButton.className = "add-item-button";
    addItemButton.id = addbutton;
    addItemButton.innerHTML = "ADD ITEM";
    addItemButton.onclick = function () {
      addToCart(i);
    };


    let addingItemDiv = document.createElement("div");
    addingItemDiv.className = "adding-item-div";
    addingItemDiv.id = subdiv;
    let minusButton = document.createElement("button");
    minusButton.className = "added-item-button-minus";
    minusButton.id = minus;

    let minusImg = document.createElement("img");
    minusImg.className = "minus";
    minusImg.src = "images/minus-sign.png";
    minusImg.alt = "---";

    minusButton.appendChild(minusImg);

    let quantityButton = document.createElement("button");
    quantityButton.className = "item-quantity";
    quantityButton.id = idquantity;
    quantityButton.innerHTML = quantity;

    let plusButton = document.createElement("button");
    plusButton.className = "added-item-button-plus";
    plusButton.id = plus;

    let plusImg = document.createElement("img");
    plusImg.className = "plus";
    plusImg.src = "images/plus-sign.png";
    plusImg.alt = "-|-";
    if (quantity > 0) 
    {
        addItemButton.style.display="none";
        addingItemDiv.style.display="flex";
    }

    plusButton.appendChild(plusImg);


    addingItemDiv.appendChild(minusButton);
    addingItemDiv.appendChild(quantityButton);
    addingItemDiv.appendChild(plusButton);

    itemDiv.appendChild(img);
    itemDiv.appendChild(name);
    itemDiv.appendChild(price);
    itemDiv.appendChild(addItemButton);
    itemDiv.appendChild(addingItemDiv);

    maindiv.appendChild(itemDiv);
  }
  let minusbuttons = document.querySelectorAll(".added-item-button-minus");
  for (let button of minusbuttons) {
    let buttonid = button.id.replaceAll("-minus", "-quantity");
    button.addEventListener("click", () => {
      decrease(buttonid);
    });
  }
  let plusbuttons = document.querySelectorAll(".added-item-button-plus");
  for (let button of plusbuttons) {
    let buttonid = button.id.replaceAll("-plus", "-quantity");
    button.addEventListener("click", () => {
      increase(buttonid);
    });
  }
}
function decrease(buttonid) {
  let itemname = buttonid.replaceAll("-quantity", "");
  let button = document.getElementById(buttonid);
  let currentquantity = Number(button.innerHTML);
  if (currentquantity == 1) {
    let add = itemname + "-addItem";
    document.getElementById(add).style.display = "block";
    let subdiv = itemname + "-div";
    document.getElementById(subdiv).style.display = "none";
  }
  currentquantity -= 1;
  button.innerHTML = currentquantity;
  selectedItems[itemname].quantity -= 1;
  update();
}
function increase(buttonid) {
  let itemname = buttonid.replaceAll("-quantity", "");
  let button = document.getElementById(buttonid);
  let currentquantity = Number(button.innerHTML);
  currentquantity += 1;
  button.innerHTML = currentquantity;
  selectedItems[itemname].quantity += 1;
  update();
}
function addToCart(itemname) {
  let divname = itemname + "-div";
  let addItem = itemname + "-addItem";
  document.getElementById(divname).style.display = "flex";
  document.getElementById(addItem).style.display = "none";
  increase(itemname + "-quantity");
}
function update(){
  localStorage.setItem("ALLFOODITEMS",JSON.stringify(foodItems));
  localStorage.setItem("ALLDRINKSITEMS",JSON.stringify(Drinks));
}


