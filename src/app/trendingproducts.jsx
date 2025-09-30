import ProductCard from "@/components/ProductCard";

const TrendingProducts = function () {

    const trendingProducts = [
        {title:"Laptop", thumbnail:"images/laptopImg.jpg"},
        {title:"Mobile Phone", thumbnail:"images/laptopImg.jpg"},
        {title:"Clothes", thumbnail:"images/laptopImg.jpg"},
        {title:"Furnitures", thumbnail:"images/laptopImg.jpg"},
    ];

    return(
        <section>
            <div className="grid grid-cols-2 gap-4 mx-2">
                {trendingProducts.map((product,index) => (
                  <ProductCard product={product} key={index} />  
                ))}
            </div>
        </section>
    );
}

export default TrendingProducts;