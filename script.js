// Elemek
let inputItemName = document.getElementById("itemName");
let inputItemCount = document.getElementById("itemCount");
let inputItemBasePrice = document.getElementById("itemBasePrice");
let buttonAdd = document.getElementById("buttonAdd");
let ulItemList = document.getElementById("itemList");
let spanSum = document.getElementById("sum");
let spanItemNames = document.getElementById("itemNames");

// Változók
let itemNameList = ["kenyér", "vaj", "tej"];
let itemCountList = [3, 2, 5];
let itemBasePriceList = [200, 300, 190];

// Feliratkozás
buttonAdd.addEventListener("click", OnClick_ButtonAdd)

// Eseménykezelők
function OnClick_ButtonAdd() {
    // Validálás: üres nem lehet
    if (!inputItemName.value || !inputItemCount.value || !inputItemBasePrice.value) return;

    // console.log("Átment");

    // Árú hozzáadása
    itemNameList.push(inputItemName.value);
    itemCountList.push(inputItemCount.value);
    itemBasePriceList.push(inputItemBasePrice.value);

    // input ürítés
    inputItemName.value = null;
    inputItemCount.value = null;
    inputItemBasePrice.value = null;

    RenderList();
}

// Üzleti logika
// A kosár listája
RenderList()
function RenderList() {
    ulItemList.innerText = "";

    let mappedItemList = itemNameList.map(function (element, index) {
        let osszar = itemCountList[index] * itemBasePriceList[index];
        return `${element} - ${itemCountList[index]}db - ${itemBasePriceList[index]}Ft - (${osszar}Ft)`;
    })

    mappedItemList.forEach(element => {
        let newli = document.createElement("li");
        newli.innerText = element;
        ulItemList.appendChild(newli);
    });

    // Összegek kezelése
    spanSum.innerText = GetSum();
    spanItemNames.innerText = GetNames();
}

function GetSum() {
    let sum = itemNameList.reduce(function (acc, name, i) {
        return acc + itemCountList[i] * itemBasePriceList[i];
    }, 0);

    return sum;
}

function GetNames() {
    return itemNameList.join(", ");
}