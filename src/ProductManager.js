import fs from 'fs'

export default class ProductManager {
    constructor(path) {
       this.path = path
    }
    
// Método para leer el archivo de productos y devolverlo en forma de arreglo.
    async getProducts () {
        try {
            if (fs.existsSync(this.path)) {
                const archivedInfo = await fs.promises.readFile(this.path, 'utf-8')
                return JSON.parse(archivedInfo)
            } else {
                return []
            }
        } catch (error) {
            return error
        }
    }


    async addProduct (obj) {
        try {
            const productsPrev = await this.getProducts()

            let id 
            if (!productsPrev.length){
                id = 1
            } else {
                id = productsPrev[productsPrev.length - 1].id + 1
            }

            const codeExist = productsPrev.find(p => p.code === obj.code)

            // Verificacion de la existencia de todas las keys y repetición del value del code.
            if (!obj.title || !obj.description || !obj.price || !obj.thumbnail || !obj.code || !obj.stock) {
                throw new Error('Please enter all the parameters to add a new product: title, description, price, thumbnail, code and stock');
            }
            if (codeExist) {
                throw new Error(`The code: ${obj.code} already exists. Please enter another one!`)
            }

            productsPrev.push({...obj, id})
            await fs.promises.writeFile(this.path, JSON.stringify(productsPrev))
        } catch(error) {
            console.log(error)
            return error
        }
    }

    async getProductById (id) {
        try {
            const productsPrev = await this.getProducts()
            const product = productsPrev.find(p => p.id === id)
            if (!product) {
               return 'ID not found'
            } 
            return product
        } catch (error){
            return error
        }
    }

    async updateProduct (id, obj) {
        try {
            const productsPrev = await this.getProducts()
            const productIndex = productsPrev.findIndex(p => p.id === id)
            if (productIndex === -1) {
                return 'No product found with the ID setted'
            }
            const product = productsPrev[productIndex]
            productsPrev[productIndex] = { ...product, ...obj }
            await fs.promises.writeFile(this.path, JSON.stringify(productsPrev))
            
        } catch (error) {
            return error
        }
    }

    async deleteProduct (id) {
        try {
            const productsPrev = await this.getProducts()
            const newProductsArray = productsPrev.filter(p => p.id !== id)
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(newProductsArray)
            ) 
        } catch (error) {
            return error
        }
    }
}

const iphone12 = {
    title:'iPhone 12',
    description:'This is the iPhone 12',
    price: 749,
    thumbnail:'Sin imagen',
    code:'iphone12',
    stock:25    
}

const iphoneSE = {
    title:'iPhone SE',
    description:'This is the iPhone SE',
    price:579,
    thumbnail:'Sin imagen',
    code:'iphonese',
    stock:30
}

const iphone13Mini = {
    title:'iPhone 13 mini',
    description:'This is the iPhone 13 mini',
    price:599,
    thumbnail:'Sin imagen',
    code:'iphone13m',
    stock:45
}


const iphone13 = {
    title:'iPhone 13',
    description:'This is the iPhone 13',
    price:699,
    thumbnail:'Sin imagen',
    code:'iphone13',
    stock:30
}

const iphone14 = {
    title:'iPhone 14',
    description:'This is the iPhone 14',
    price:799,
    thumbnail:'Sin imagen',
    code:'iphone14',
    stock:34
}

const iphone14Plus = {
    title:'iPhone 14 Plus',
    description:'This is the iPhone 14 Plus',
    price:899,
    thumbnail:'Sin imagen',
    code:'iphone14pl',
    stock:39
}

const iphone14Pro = {
    title:'iPhone 14 Pro',
    description:'This is the iPhone 14 Pro',
    price:999,
    thumbnail:'Sin imagen',
    code:'iphone14pr',
    stock:67
}

const iphone14ProMax = {
    title:'iPhone 14 Pro Max',
    description:'This is the iPhone 14 Pro Max',
    price:1099,
    thumbnail:'Sin imagen',
    code:'iphone14prmx',
    stock:60
}

const ipadMini = {
    title:'iPad mini',
    description:'This is the iPad mini',
    price:499,
    thumbnail:'Sin imagen',
    code:'ipadmini',
    stock:62
}

const ipad = {
    title:'iPad',
    description:'This is the iPad',
    price:449,
    thumbnail:'Sin imagen',
    code:'ipad',
    stock:36
}

//async function test() {
    //const productManager = new ProductManager('products.json')
    //await productManager.addProduct(iphone12)
    //await productManager.addProduct(iphoneSE)
    //await productManager.addProduct(iphone13Mini)
    //await productManager.addProduct(iphone13)
    //await productManager.addProduct(iphone14)
    //await productManager.addProduct(iphone14Plus)
    //await productManager.addProduct(iphone14Pro)
    //await productManager.addProduct(iphone14ProMax)
    //await productManager.addProduct(ipadMini)
    //await productManager.addProduct(ipad)
//}

//test()

