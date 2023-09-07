const socketClient = io()

const prodForm = document.getElementById("prodForm")
const pid = document.getElementById("pid")

prodForm.onsubmit = (e) =>{
    e.preventDefault()
    setTimeout(() => {
        const product = {
            id: pid.innerHTML
        }
        socketClient.emit("prodToCart", product)
    }, 500)
}
