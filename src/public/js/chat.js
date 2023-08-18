const socketClient = io()

const nameh3 = document.getElementById("name")
const formChat = document.getElementById("formChat")
const inputMessage = document.getElementById("message")
const divChat = document.getElementById("chat")

let user

Swal.fire ({
    title: "Welcome",
    text: "Enter your name",
    input: "text",
    inputValidator: (value) => {
        if (!value) {
            return "Please enter your name"
        }
    }
}).then(name => {
    user = name.value
    nameh3.innerText = `Hi ${user}`
    socketClient.emit('newUser', user)
})

formChat.onsubmit = (e) => {
    e.preventDefault()
    const infoMessage = {
        name:user,
        message: inputMessage.value
    }
    socketClient.submit("message", infoMessage)
}

socketClient.on("chat", messages =>{
    const chat = messages.map(objMessage => {
        return `<p>${objMessage.name}: ${objMessage.message}</p>`
    }).join(' ')
    divChat.innerHTML = chat
})

socketClient.on("brodcast", user => {
    Toastify({
        text: `${user} is connected`,
        duration: 5000,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast()
})