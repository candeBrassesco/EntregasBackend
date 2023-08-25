import { cartsModel } from "../../db/models/carts.model";
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
            const cart = await cartsModel.findById(id)
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
            const prodById = await productManager.getProductById(pid)
            const newProductToCart = {
                product: prodById.id,
                quantity: 1
            }
            const newCart = cartById
            const prodOnCart = cartById.products.find(p => p.id == pid)
            if (prodOnCart) {
                newProductToCart.quantity++
            }
        } catch (error) {
            return error
        }
    }

}
