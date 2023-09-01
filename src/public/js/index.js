const socketClient = io()

const prodForm = document.getElementById("prodFrom")
const pid = document.getElementById("pid")

prodForm.onsubmit = (e) =>{
    e.preventDefault()
    let product = {
        id: pid.innerHTML
    }
    socketClient.emit("prodToCart", prod)
}
