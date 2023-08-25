import { productsModel } from "../../db/models/products.model";

class ProductManager {
    async getProducts(){
        try {
            const products = await productsModel.find({})
            return products

        } catch (error) {
            return error
        }
    }
    async addProduct(obj) {
        try {
            const newProduct = await productsModel.create(obj)
            return newProduct
        } catch (error) {
            return error
        }
    }
    async getProductById(id) {
        try {
            const product = await productsModel.findById(id)
            return product
        } catch (error) {
            return error
        }
    }
    async updateProduct(obj) {
        try {
            const productUpdate = await productsModel.findById(obj.id)
            const newProd = {
                title: obj.title ? obj.title : productUpdate.title,
                description: obj.description ? obj.description : productUpdate.description,
                price: obj.price ? obj.price : productUpdate.price,
                stock: obj.stock ? obj.stock : productUpdate.stock,
                code: obj.code ? obj.code : productUpdate.code,
                category: obj.category ? obj.category : productUpdate.category,
                status: true,
                thumbnails: obj.thumbnails ? obj.thumbnails : productUpdate.thumbnails || " ",
                id: obj.id
            }
            return newProd
        } catch (error) {
            return error
        }
    }
    async deleteProducts(id) {
        try {
            const deleteProduct = await productsModel.findByIdAndDelete(id)
            return deleteProduct
        } catch (error) {
            return error
        }
    }
}

const productManager = new ProductManager()
export default productManager