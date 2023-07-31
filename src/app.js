import express from 'express'
import ProductManager from './ProductManager.js';

const app = express()

const productManager = new ProductManager('products.json')

app.get("/products", async (req, res) => {
    const limit = req.query.limit

    if(limit){
        const products = await productManager.getProducts()
        const productsLimit = products.slice(0, limit)
        res.send({
           products: productsLimit
        })
        return productsLimit
    }
    const products = await productManager.getProducts()
    res.send({products})
})

app.get("/products/:pid", async(req, res)=>{
    const pid = req.params.pid
    const productById = await productManager.getProductById(parseInt(pid))
    res.send({productById})
})

// escucha solicitudes del puerto 8080
app.listen(8080, () => {
    console.log('Escuchando el puerto 8080 con servidor express')
})