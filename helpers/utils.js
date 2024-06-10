const calculateOrderDeatils = (products, items) => {
    let order_amount = 0, total_tax = 0, discount = 0, product=[]
    products.forEach((item, index) => {
        order_amount += item.selling_price * items[index].qtn;
        total_tax += item.tax * items[index].qtn;
        discount += item.discount * items[index].qtn;
        product.push(item._id)
    });
    return {
        order_amount: order_amount.toFixed(2), 
        total_tax: total_tax.toFixed(2), 
        discount: discount.toFixed(2),
        paid_amount: ( parseFloat(order_amount)+parseFloat(total_tax)-parseFloat(discount) ).toFixed(2),
        product
    }
};

module.exports = { calculateOrderDeatils }