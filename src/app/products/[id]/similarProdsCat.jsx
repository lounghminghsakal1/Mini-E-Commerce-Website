import ProductCard from "@/components/ProductCard";

const SimilarProdsCat = async function({ category }) {
    
    const res = await fetch(`https://dummyjson.com/products/category/${category}`)
    const products = await res.json();

    return (
        <div className="grid grid-cols-2 gap-4 mx-4 sm:grid-cols-3 md:grid-cols-4">
            {products.products.map((product, index) => (
                <ProductCard product={product} key={index} />
            ))}
        </div>
    );

}

export default SimilarProdsCat;