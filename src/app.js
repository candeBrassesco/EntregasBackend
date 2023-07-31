import express from 'express'
import productManager from './ProductManager.js';

const app = express()

app.use (express.json())
app.use(express.urlencoded({extended:true}))

app.get("/api/products", async (req, res) => {
    try {
        const {limit} = req.query
        if(limit){
            const products = await productManager.getProducts()
            const productsLimit = products.slice(0, limit)
            res.status(200).json({
               products: productsLimit
            })
            return products
        }
        const products = await productManager.getProducts()
        res.status(200).json({message:'Products', products})

    } catch(error){
        res.status(500).json({error})
    }
})

app.get("/api/products/:pid", async(req, res)=>{
    const {pid} = req.params
    try {
        const productById = await productManager.getProductById(+pid)
        res.status(200).json({message:'Product',productById})
    } catch (error){
        res.status(500).json({error})
    }
})

app.post('/api/products', async(req,res) => {
    try {
        const newProduct = await productManager.addProduct(req.body)
        res.status(200).json({message: 'Product added', product: newProduct})
    } catch (error) {
        res.status(500).json({error})
    }
})

app.delete('/api/products/:pid', async(req,res) => {
    const {pid} = req.params
    try {
        const response = await productManager.deleteProduct(+pid)
        res.status(200).json({message:'Product deleted'})
        return response
    } catch (error) {
        res.status(500).json({error})
    }
})

app.put('/api/products/:pid', async (req,res) => {
    const {pid} = req.params
    try {
        const productUpdated = await productManager.updateProduct(+pid, req.body)
        req.status(200).json({message:'Product updated'})
    } catch (error){
        res.status(500).json({error})
    }
})

// escucha solicitudes del puerto 8080
app.listen(8080, () => {
    console.log('Escuchando el puerto 8080 con servidor express')
})