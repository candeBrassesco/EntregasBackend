import express from 'express'
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import {__dirname} from './utils.js'

const app = express()


app.use (express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))

// routes
app.use("/api/products", productsRouter)
app.use("/api/cart", cartRouter)

// escucha solicitudes del puerto 8080
app.listen(8080, () => {
    console.log('Escuchando el puerto 8080 con servidor express')
})