import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
      },
      description:{
        type: String,
        required: true,
        unique: true
      },
      price:{
        type: Number,
        required: true
      },
      stock:{
        type: Number,
        required: true
      },
      code:{
        type: Number,
        required: true,
        unique: true
      },
      category:{
        type: String,
        required: true
      },
      status:{
        
      },
      thumbnails:{
        type: String
      }
})

export const productsModel = mongoose.model('Products', productsSchema)