const stores = require("./stores.js");
const axios = require('axios');

const getProductsByStore = (url) => axios.get(`${url}products.json?limit=250`, {
    headers: {
        "accept-encoding": null
    }
   }).then(response => response.data.products);

const getProductsFromStores = async () => {
    var allProducts = [];
    for (let i in stores) {
        allProducts.push(await getProductsByStore(stores[i]))
    }
    return allProducts.flat();
};

const scrape = async () => {
    const newArray = [];
    const allProducts = await getProductsFromStores();
    
    allProducts.forEach(product => {
        const { vendor, title, product_type, variants } = product;
        variants.forEach(vari => {
            newArray.push({
                id: vari.id,
                vendor,
                title,
                product_type,
                variant: vari.title,
                sku: vari.sku,
                price: vari.price,
                compare_at_price: vari.compare_at_price,
                product_id: vari.product_id,
                created_at: vari.created_at,
                updated_at: vari.updated_at
            })
        })
    });
    return newArray;
};

module.exports = scrape;