import ProductCard from "@/components/ProductCard";

const TrendingProducts = function () {

    const trendingProducts = [
        {title:"Laptop",brand:"Lenovo",rating:"4.7",price: 999.99, thumbnail:"images/laptopImg.jpg"},
        {title:"Mobile Phone",brand:"Lenovo",rating:"4.1",price: 609.99, thumbnail:"images/laptopImg.jpg"},
        {title:"Clothes",brand:"Lenovo",rating:"4.2",price: 60.99, thumbnail:"images/laptopImg.jpg"},
        {title:"Electronics",brand:"Lenovo",rating:"4.9",price: 799.99, thumbnail:"images/laptopImg.jpg"},
    ];

    return(
        <section>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mx-2">
                {trendingProducts.map((product,index) => (
                  <ProductCard product={product} key={index} />  
                ))}
            </div>
        </section>
    );
}

export default TrendingProducts;