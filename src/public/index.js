const socketClient = io()

const form = document.getElementById("form")
const inputTitle = document.getElementById("prodTitle")
const inputDesc = document.getElementById("prodDesc")
const inputPrice = document.getElementById("prodPrice")
const inputThumb = document.getElementById("prodThumb")
const inputCode = document.getElementById("prodCode")
const inputStock = document.getElementById("prodStock")
const div = document.getElementById("div")


form.onsubmit = (e) => {
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

socketClient.on("addProductToHTML",(addProductsList)=>{
    let addProductToHTML = ""
    addLiProducts.forEach(p=>{
        addProductToHTML +=  `<li id="title">${p.title}</li>`
        div.innerHTML = addProductToHTML
    })
})