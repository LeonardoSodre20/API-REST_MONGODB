const productsFilter = (products, search) => {
    // const letters = `${search}`.split("");

    const filtredProducts = products.filter(product => isProductIcluded(product.name));
    
};

const isProductIcluded = (productName, search) => productName.includes(search);

module.exports = { productsFilter };

