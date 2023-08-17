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
})

formChat.onsubmit = (e) => {
    e.preventDefault()
    const infoMessage = {
        name:user,
        message: inputMessage.value
    }
    socketClient.submit("message", infoMessage)
}