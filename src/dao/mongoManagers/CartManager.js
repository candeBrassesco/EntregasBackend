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
            const cart = await cartsModel.findOneAndUpdate ({_id: cid}, {
                $push: {
                    products: {
                        _id: pid, 
                        // se incrementa en una unidad si el producto existe
                        quantity: { $inc: { $cond: [ { $eq: [ { _id: pid }, { quantity: { $exists: true } } ] }, 1, 0 ] }}
                    }
                }, 
            }, {upsert: true});
            return cart
        } catch (error) {
            return error
        }
    }

}
