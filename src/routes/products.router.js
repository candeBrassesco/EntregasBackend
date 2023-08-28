import {Router} from 'express'
/*import productManager from '../dao/fileManagers/ProductManager.js';*/
import productManager from '../dao/mongoManagers/ProductManager.js'

const router = Router()

router.get("/", async (req, res) => {
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

router.get("/:pid", async (req, res)=>{
    const {pid} = req.params
    try {
        const productById = await productManager.getProductById(pid)
        res.status(200).json({message:'Product', productById})
    } catch (error){
        res.status(500).json({error})
    }
})

router.post('/', async(req,res) => {
    try {
        const newProduct = await productManager.addProduct(req.body)
        res.status(200).json({message: 'Product added', product: newProduct})
    } catch (error) {
        res.status(500).json({error})
    }
})

router.delete('/:pid', async(req,res) => {
    const {pid} = req.params
    try {
        const response = await productManager.deleteProduct(pid)
        res.status(200).json({message:'Product deleted', product: response})
    } catch (error) {
        res.status(500).json({error})
    }
})

router.put('/:pid', async (req,res) => {
    const productUpdate = req.body
    const {pid} = req.params
    productUpdate.id = pid
    try {
        const productUpdated = await productManager.updateProduct(productUpdate)
        req.status(200).json({message:'Product updated', product: productUpdated})
    } catch (error){
        res.status(500).json({error})
    }
})

export default router

