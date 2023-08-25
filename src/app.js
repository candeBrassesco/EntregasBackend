import express from 'express'
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import chatRouter from './routes/chat.router.js'
import viewsRouter from './routes/views.router.js'
import realTimeProductsRouter from './routes/realTimeProducts.router.js'
import handlebars from 'express-handlebars'
import {__dirname} from './utils.js'
import productManager from './dao/fileManagers/ProductManager.js'
import {Server} from "socket.io"
import './db/dbConfig.js'


const app = express()

app.use (express.json())
app.use(express.urlencoded({extended:true}))

//__dirname
app.use(express.static(__dirname + '/public', {
    mimeTypes: {
      '/js/index.js': 'application/javascript'
    }
  }));

//handlebars setting
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');

// routes
app.use("/api/products", productsRouter)
app.use("/api/cart", cartRouter)

// handlebars routes
app.use("/api/views", viewsRouter)
app.use("/api/realtimeproducts", realTimeProductsRouter)
app.use("/api/chat", chatRouter)

const PORT = 8080

// escucha solicitudes del puerto 8080
const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`)
})

const products = await productManager.getProducts()

let addProductsToList = [...products]

const messages = []

const socketServer = new Server(httpServer)

socketServer.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`)
    //realtimeproducts
    socket.emit("products", addProductsToList)
    socket.on("object", (obj) => {
        productManager.addProduct(obj)
        let addList = {title: obj.title}
        addProductsToList.push(addList)
        socketServer.emit("addProductToHTML", addProductsToList)
    });
    socket.on("id", async (id) => {
        let product = await productManager.getProductById(id)
        console.log(product)
        if (product) {
            let title = product.title
            let newList = addProductsToList.filter(p => p.title !== title)
            socketServer.emit("deleteProductOfHTML", newList) 
        } 
        productManager.deleteProduct(id)
    })
    //chat 
    socket.on("message", infoMessage => {
        messages.push(infoMessage)
        socketServer.emit("chat", messages)
    })
    //emitir notificación de que se conectó un usuario a los demás
    socket.on("newUser", user=> {
        socket.broadcast.emit('broadcast', user)
    })
    socket.on("disconnect", () => {
        console.log("Client disconnected")
    })  
})


