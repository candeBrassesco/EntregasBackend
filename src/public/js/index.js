const socketClient = io()

const formAdd = document.getElementById("formAdd")
const inputTitle = document.getElementById("prodTitle")
const inputDesc = document.getElementById("prodDesc")
const inputPrice = document.getElementById("prodPrice")
const inputThumb = document.getElementById("prodThumb")
const inputCode = document.getElementById("prodCode")
const inputStock = document.getElementById("prodStock")
const formDelete = document.getElementById("formDelete")
const inputId = document.getElementById("prodId")
const div = document.getElementById("div")

//Add products
formAdd.onsubmit = (e) => {
    e.preventDefault()
    let obj = {
        title: inputTitle.value,
        description: inputDesc.value,
        price: inputPrice.value,
        thumbnail: inputThumb.value || " ",
        code: inputCode.value,
        stock: inputStock.value
    }
    socketClient.emit("object", obj)
}

socketClient.on("products", (addProductsToList) => {
    let addProductToHTML = ""
    addProductsToList.forEach(p => {
        addProductToHTML += `<li id="title">${p.title}</li>`
        div.innerHTML = addProductToHTML
    })
})

socketClient.on("addProductToHTML",(addProductsToList)=>{
    let addProductToHTML = "";
    addProductsToList.forEach(p => {
        addProductToHTML += `<li id="title">${p.title}</li>`;
        div.innerHTML = addProductToHTML;
    })
})

//Delete products
formDelete.onsubmit = (e) => {
    e.preventDefault()
    let id = inputId.value
    socketClient.emit("id", id)
}

socketClient.on ("deleteProductOfHTML", (newList) => {
    let addProductToHTML = "";
    newList.forEach(p => {
        addProductToHTML += `<li id="title">${p.title}</li>`;
        div.innerHTML = addProductToHTML;
    })
})

