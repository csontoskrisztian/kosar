// Elemek
let inputItemName = document.getElementById("itemName");
let inputItemCount = document.getElementById("itemCount");
let inputItemBasePrice = document.getElementById("itemBasePrice");
let buttonAdd = document.getElementById("buttonAdd");
// let ulItemList = document.getElementById("itemList");
let tableItems = document.getElementById("itemTable");
let spanSum = document.getElementById("sum");
let spanItemNames = document.getElementById("itemNames");

// Változók
// let itemNameList = ["kenyér", "vaj", "tej"];
// let itemCountList = [3, 2, 5];
// let itemBasePriceList = [200, 300, 190];

let objektumTomb = [
    {
        name: "kenyér",
        count: 3,
        baseprice: 200
    },
    {
        name: "vaj",
        count: 2,
        baseprice: 300
    },
    {
        name: "tej",
        count: 5,
        baseprice: 190
    }
]

// Feliratkozás
buttonAdd.addEventListener("click", OnClick_ButtonAdd)

// Eseménykezelők
function OnClick_ButtonAdd() {
    // Validálás: üres nem lehet
    if (!inputItemName.value || !inputItemCount.value || !inputItemBasePrice.value) return;

    // console.log("Átment");

    // Árú hozzáadása
    // itemNameList.push(inputItemName.value);
    // itemCountList.push(inputItemCount.value);
    // itemBasePriceList.push(inputItemBasePrice.value);

    objektumTomb.push({
        name: inputItemName.value,
        count: inputItemCount.value,
        baseprice: inputItemBasePrice.value,
    });

    // input ürítés
    inputItemName.value = null;
    inputItemCount.value = null;
    inputItemBasePrice.value = null;

    RenderList();
}

function OnClick_ButtonDelete() {
    let tr = this.parentNode.parentNode;
    
    let index = Array.prototype.indexOf.call(tableItems.childNodes, tr);
    objektumTomb.splice(index - 1, 1);
    
    RenderList();
}

// Üzleti logika
// A kosár listája
RenderList()
function RenderList() {
    tableItems.innerText = "";
    let cim_tr = document.createElement("tr");
    let name_th = document.createElement("th");
    let count_th = document.createElement("th");
    let price_th = document.createElement("th");
    let osszar_th = document.createElement("th");

    name_th.innerText = "Termék neve";
    count_th.innerText = "Darabszám";
    price_th.innerText = "Egységár";
    osszar_th.innerText = "Össz ár";

    cim_tr.appendChild(name_th);
    cim_tr.appendChild(count_th);
    cim_tr.appendChild(price_th);
    cim_tr.appendChild(osszar_th);
    tableItems.appendChild(cim_tr);
    // ulItemList.innerText = "";

    // let mappedItemList = itemNameList.map(function (element, index) {
    //     let osszar = itemCountList[index] * itemBasePriceList[index];
    //     return `${element} - ${itemCountList[index]}db - ${itemBasePriceList[index]}Ft - (${osszar}Ft)`;
    // })

    // let mappedItemList = objektumTomb.map(function (e) {
    //     let osszar = e.count * e.baseprice;
    //     return `${e.name} - ${e.count}db - ${e.baseprice}Ft - (${osszar}Ft)`;
    // });

    // mappedItemList.forEach(element => {
    //     let newli = document.createElement("li");
    //     newli.innerText = element;
    //     ulItemList.appendChild(newli);
    // });

    objektumTomb.forEach(e => {
        let new_tr = document.createElement("tr");
        let osszar = e.count * e.baseprice;

        let name_td = document.createElement("td");
        let count_td = document.createElement("td");
        let price_td = document.createElement("td");
        let osszar_td = document.createElement("td");
        let delete_td = document.createElement("td");

        // Törlés gomb létrehozása
        let new_button = document.createElement("button");
        new_button.innerText = "Törlés";
        new_button.addEventListener("click", OnClick_ButtonDelete);

        name_td.innerText = e.name;
        count_td.innerText = e.count;
        price_td.innerText = e.baseprice;
        osszar_td.innerText = osszar;

        new_tr.appendChild(name_td);
        new_tr.appendChild(count_td);
        new_tr.appendChild(price_td);
        new_tr.appendChild(osszar_td);
        new_tr.appendChild(delete_td);

        delete_td.appendChild(new_button);

        tableItems.appendChild(new_tr);
    })

    // Összegek kezelése
    spanSum.innerText = GetSum();
    spanItemNames.innerText = GetNames();
}

function GetSum() {
    // let sum = itemNameList.reduce(function (acc, name, i) {
    //     return acc + itemCountList[i] * itemBasePriceList[i];
    // }, 0);

    let sum = objektumTomb.reduce(function (acc, e) {
        return acc + e.count * e.baseprice;
    }, 0);

    return sum;
}

function GetNames() {
    // return itemNameList.join(", ");

    return objektumTomb.map(e => e.name).join(", ")
}