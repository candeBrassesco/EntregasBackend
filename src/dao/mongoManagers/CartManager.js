import { cartsModel } from "../../db/models/carts.model.js";
import productManager from "./ProductManager.js";

class CartManager {

    async getCarts() {
        try {
            const carts = await cartsModel.find({})
            return carts
        } catch (error){
            return error
        }
    }

    async getCartsById(id) {
        try {
            const cart = await cartsModel.findById(id).populate('products')
            return cart
        } catch (error) {
            return error
        }
    }

    async addCart() {
        try {
            const newCart = await cartsModel.create({})
            return newCart
        } catch (error) {
            return error
        }
    }

    async addProductToCart(cid, pid) {
        try {
            const cartById = await cartsModel.findById(cid)
            
            let newProduct = {
                pid: pid,
                quantity: 1,
                }
    
            const prodOnCart = cartById.products.find(p=>p.pid == pid)
            console.log(prodOnCart)
            
            if (!prodOnCart) {
                let newCart = cartById
                newCart.products.push(newProduct)
                return await cartById.updateOne(newCart)
            } else {
                    prodOnCart.quantity++
                    let newProduct = {
                        pid: pid,
                        quantity: prodOnCart.quantity
                    }
                    const indexFindProdOnCart = cartById.products.indexOf(prodOnCart)
                    cartById.products.splice(indexFindProdOnCart, 1)
                    let newCart = cartById
                    newCart.products.push(newProduct)
                    return await cartById.updateOne(newCart)
            }
        } catch (error) {
          console.log(error);
          return error;
        }
    }

    async deleteCart(id) {
        try {
            const cartDelete = await cartsModel.findByIdAndDelete(id)
            return cartDelete
        } catch (error) {
            return error
        }
    }

    async deleteProductOnCart(cid, pid) {
        try {
            const cart = await cartsModel.findById(cid)
            if (!cart) {
                throw new Error ('Cart not found')
            }
            const response = await cartsModel.updateOne({_id: cid}, {$pull:{products:{pid: pid}}})
            return response
        } catch (error) {
            return error
        }
    }

}

const cartManager = new CartManager()
export default cartManager
