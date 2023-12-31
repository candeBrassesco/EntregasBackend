import express from 'express'
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import productsViewRouter from './routes/productsView.router.js'
import viewsRouter from './routes/views.router.js'
import cartViewRouter from './routes/cartView.router.js'
import loginRouter from './routes/login.router.js'
import cartManager from './dao/mongoManagers/CartManager.js'
import handlebars from 'express-handlebars'
import {__dirname} from './utils.js'
import {Server} from "socket.io"
import './db/dbConfig.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'

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

//cookies
app.use(cookieParser('secreKeyCookies'))

//sessions
app.use(session({
    secret: 'Secret Session',
    cookies: {maxAge:60000}
}))

// routes
app.use("/api/products", productsRouter)
app.use("/api/cart", cartRouter)
app.use("api/login", loginRouter)

// handlebars routes
app.use("/api/views", viewsRouter)
app.use("/carts", cartViewRouter)
app.use("/products", productsViewRouter)


const PORT = 8080

// escucha solicitudes del puerto 8080
const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`)
})


const socketServer = new Server(httpServer)

socketServer.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`)
    socket.on("prodToCart", async product => {
        const addProduct = await cartManager.addProductToCart("64f8b03e9847f17bd96750e1", product.id)
        return addProduct
    })
    socket.on("disconnect", () => {
        console.log("Client disconnected")
    })  
})


