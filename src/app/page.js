
import ProductCard from "@/components/ProductCard";
import FeaturedCategories from "./featuredCategories";
import TrendingProducts from "./trendingproducts";

export default async function Home() {

  try{
    const res = await fetch("https://dummyjson.com/products?limit=12");
  const productsList = await res.json();
  

  return(
    <div>
      <div className="w-full h-[50vh] border-2 border-gray-500 rounded-md mt-2 shadow ">
        <img src={productsList.products[0].thumbnail} alt="Hero Banner" className="w-full h-full "/>
      </div>
      <section className="mt-4">
        <h2 className="text-center font-bold text-blue-600 text-2xl">Featured Categories</h2>
        <div>
          <FeaturedCategories/>
        </div>
      </section>
      <section className="my-10">
        <h2 className="text-center mb-4 font-semibold text-red-800 text-xl">Trending Products</h2>
        <TrendingProducts/>
      </section>
    </div>
  );
  }
  catch(err){
    return(
      <div>
        <h2>Error in fetching dataaa</h2>
      </div>
    )
  }
  
  
}
