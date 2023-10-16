const express = require('express');
const cors = require('cors');
const connectDatabase = require('./config/DBconfig');
const categoriesRouter = require('./routes/Category.route');
const productsRouter = require('./routes/Product.route');
const singleProductRouter = require('./routes/SingleProduct.route');
const addToCartRouter = require('./routes/Cart.route');
const checkOutRouter = require('./routes/Users.route');
const enquiryRouter = require('./routes/Enquiry.route');
const adminRouter = require('./routes/Admin.route');
const attributeRouter = require('./routes/Attribute.route');
const shippingRouter = require('./routes/Shipping.route');
const blogRouter = require('./routes/Blog.route');
const galleryRouter = require('./routes/Gallery.route');
const singleAttributeRouter = require('./routes/AttributeValues.route');
const freeShippingRouter = require('./routes/FreeShipping.route');
const upsShippingRouter = require('./routes/UPS.route');
const path = require('path')
const cloudinary = require('cloudinary')

if(process.env.NODE_ENV === 'developement'){
    require('dotenv').config();
}

const app = express();
const PORT = process.env.PORT || 4321;

connectDatabase();

app.set("view engine", "ejs");
app.use(express.json({limit: '50mb'}));
app.use(cors());
          
cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

app.get('/', (req, res) => {
    res.json({
        msg: 'Api Created Successfully',
    })
})

app.use(express.static(path.join(__dirname, 'images')));

app.get('/api/image/:filename', (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, 'images', filename);

  res.sendFile(imagePath, (err) => {
      if (err) {
          res.status(404).send('File not found');
      }
  });
});

app.use('/api', categoriesRouter);
app.use('/api', productsRouter);
app.use('/api', singleProductRouter);
app.use('/api', addToCartRouter);
app.use('/api', checkOutRouter);
app.use('/api', enquiryRouter);
app.use('/api', adminRouter);
app.use('/api', attributeRouter);
app.use('/api', shippingRouter);
app.use('/api', blogRouter);
app.use('/api', galleryRouter);
app.use('/api', singleAttributeRouter);
app.use('/api', freeShippingRouter);
app.use('/api', upsShippingRouter);

app.listen(PORT, (error) => {
    if (error) {
       console.log(error); 
    }
    console.log(`Server Running on http://localhost:${PORT}`);
})
