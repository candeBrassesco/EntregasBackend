import mongoose from 'mongoose'

//mongoose
const URI = 'mongodb+srv://candebrassesco:Candux99@ecommerce.1swaqtu.mongodb.net/ecommerce?retryWrites=true&w=majority'
mongoose.connect(URI)
.then(() => console.log('Connected to the data base'))
.catch( (error) => console.log(error) )
