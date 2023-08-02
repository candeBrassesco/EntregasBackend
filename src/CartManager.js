import fs from 'fs'
import productManager from './ProductManager.js'


class CartManager {
     constructor (path) {
        this.path = path
     }

     async getCarts() {
        try {
            if (fs.existsSync(this.path)) {
                const carts = await fs.promises.readFile(this.path,'utf-8')
                return JSON.parse(carts)
            } else {
                return []
            }
        } catch (error) {
            console.log(error)
            return error
        }
     }

     async getCartsById(id) {
        try {
            const cartsPrev = await this.getCarts()
            const cart = cartsPrev.find(p => p.id === id)
            if (!cart) {
                return 'Cart Id not found'
            }
            return cart
        } catch(error) {
            console.log(error)
            return error
        }
     }

     async addCart(obj) {
        try {
            const cartsPrev = await this.getCarts()
            let id 
            if (!cartsPrev.length){
                id = 1
            } else {
                id = cartsPrev[cartsPrev.length - 1].id + 1
            }
            const newCart = {...obj, id}
            cartsPrev.push(newCart)
            await fs.promises.writeFile(this.path, JSON.stringify(cartsPrev))
            return newCart
        } catch (error) {
            console.log(error)
            return error
        }
     }
    
     async addProductToCart(cid, pid) {
        try {
            const cartsPrev = await this.getCarts()
            const cartById = await this.getCartsById(cid)
            const productById = await productManager.getProductById(pid)
            const newProductToCart = {
                product: productById.id,
                quantity: 1
            }
            const productOnCart = cartById.find(p => p.id === pid)
            if (productOnCart){
            //incremento en una unidad en que caso de que haya un producto con ese ID
                productOnCart.quantity++  
                return await fs.promises.writeFile(this.path, JSON.stringify(cartsPrev))
            }
            cartById.push(newProductToCart)
            await fs.promises.writeFile(this.path, JSON.stringify(cartsPrev))
        } catch (error) {
            console.log(error)
            return error
        }
     }
}

const cartManager = new CartManager('cart.json')
export default cartManager