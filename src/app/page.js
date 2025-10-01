
import ProductCard from "@/components/ProductCard";
import FeaturedCategories from "./featuredCategories";
import TrendingProducts from "./trendingproducts";

export default async function Home() {

  try{
    const res = await fetch("https://dummyjson.com/products?limit=12");
  const productsList = await res.json();
  

  return(
    <div>
      <div className="w-full h-[50vh] border-2 border-teal-500 shadow-teal-100 rounded-lg mt-1 shadow">
        <img src="images/homebannerImg.jpg" alt="Hero Banner" className="w-full h-full "/>
      </div>
      <section className="mt-1 bg-gray-200 rounded-sm">
        <h2 className="text-center font-bold text-emerald-600 text-2xl pt-2">Featured Categories</h2>
        <div>
          <FeaturedCategories/>
        </div>
      </section>
      <section className="mt-1 bg-gray-100 rounded-sm mb-4">
        <h2 className="text-center mb-4 font-bold pt-4 text-emerald-600 text-xl">Trending Products</h2>
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
