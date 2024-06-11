require('dotenv').config()
const express = require('express');
const cors = require('cors')
require('./helpers/init_mongodb')
const bodyParser = require('body-parser')
const path = require("path");

const AuthRoute = require('./Routes/Auth.route')
const EmployeeRoute = require('./Routes/Employee.route')
// const RoleNamesRoute = require('./Routes/RoleNames.Route')
// const RoleListRoute = require('./Routes/RoleList.Route')
// const UnitRoute = require('./Routes/Unit.Route')
const BrandRoute = require('./Routes/Brand.Route')
const CategoryRoute = require('./Routes/Category.Route')
const SupplierRoute = require('./Routes/Supplier.Route')
const ProductRoute = require('./Routes/Product.Route')
const CustomerRoute = require('./Routes/Customer.Route')
// const ShopRoute = require('./Routes/Shop.Route')
const OrderRoute = require('./Routes/Order.Route')
const InvoiceRoute = require('./Routes/Invoice.Route')
// const StatRoute = require('./Routes/Stats.Route')

const app = express();

// Middleware
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000
  
app.get('/', (req, res) => {
    res.send('Hello from server');
});

app.use('/auth', AuthRoute)
app.use('/employee', EmployeeRoute)
// app.use('/role_names', RoleNamesRoute)
// app.use('/role_list', RoleListRoute)
// app.use('/unit', UnitRoute)
app.use('/brand', BrandRoute)
app.use('/category', CategoryRoute)
app.use('/supplier', SupplierRoute)
app.use('/product', ProductRoute)
app.use('/customer', CustomerRoute)
// app.use('/shop', ShopRoute)
app.use('/order', OrderRoute)
app.use('/invoice', InvoiceRoute)
// app.use('/stats', StatRoute)

app.use((err, req, res, next ) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    })
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
