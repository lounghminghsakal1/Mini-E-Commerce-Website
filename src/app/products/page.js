"use client";
import { useState,useEffect } from 'react';
import ProductCard from "@/components/ProductCard"
import InfiniteScroll from 'react-infinite-scroll-component';


const ProductsPage = function () {
    
    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [searchProductName, setSearchProductName] = useState("");
    const limit = 12;

    const fetchData = async function () {
        const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
        const data = await res.json();
        
        setProducts((prev) => [...prev, ...data.products]);
        setSkip((prev) => prev + limit);

        if (products.length + data.products.length >= data.total){
            setHasMore(false);
        } 
    };

    useEffect(() => {
        fetchData();
    },[]);

    const [filters, setFilters] = useState({
        category: "",
        brand: "",
        priceRange: [0,Infinity],
        rating: 0
    });

    const [sortBy, setSortBy] = useState("relevance");

    const [filteredProducts, setFilteredproducts] = useState(products);

    async function applyFiltersAndSearch() {

        let results = [...products];

        if (searchProductName.trim()) {
            results = results.filter((product) => product.title.toLowerCase().includes(searchProductName.trim().toLowerCase()));
        }

        if (filters.category) {
            let res = await fetch(`https://dummyjson.com/products/category/${filters.category}?limit=100`).then((data) => data.json());
            results = res.products.filter((product) => product.category === filters.category);
            setHasMore(false);
        }

        if (filters.brand) {
            let res = await fetch("https://dummyjson.com/products?limit=100");
            let data = await res.json();
            results = data.products.filter((product) => product.brand === filters.brand);
            setHasMore(false);
        }

        results = results.filter(
            (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
        );

        if (filters.rating > 0) {
            results = results.filter((product) => product.rating >= filters.rating);
        }

        switch (sortBy) {
            case "Price: Low to High": {
                results = results.sort((a,b) => a.price - b.price);
                break;
            }
            case "Price: High to Low": {
                results = results.sort((a,b) => b.price - a.price);
                break;
            }
            case "Newest": {
                results = results.sort((a,b) => b.id - a.id);
                break;
            }
            default:{
                break;
            }
        }

        setFilteredproducts(results);
    }

    useEffect(() => {
        applyFiltersAndSearch();
    },[products,filters,sortBy,searchProductName]);
    
    const [categoriesList, setCategoriesList] = useState([]);

    useEffect(() => {
        async function getCategoriesList() {
            const res = await fetch("https://dummyjson.com/products/categories").then((data) => data.json());
            setCategoriesList(res);
        }
        getCategoriesList();
    },[]);

    let [brandsList, setBrandsList] = useState([]);

    useEffect(() => {
        async function getBrands() {
            const res = await fetch("https://dummyjson.com/products?limit=100");
            const data = await res.json();
          
            let uniqueBrands = Array.from(new Set(data.products.map((product) => product.brand)));
            setBrandsList(uniqueBrands);
        }
        getBrands();
    },[]);

    return (
        <section className='bg-gray-100 rounded-sm'>
            <h1 className="text-center text-2xl mt-4 text-emerald-700 font-bold">Products</h1>
            <div className='flex gap-10 justify-center items-center my-4'>
                <input type='text' placeholder='Search for Products ...' className='border-2 p-2 rounded-md' onChange={(e) => setSearchProductName(e.target.value)}/>
                {/* <button onClick={applyFiltersAndSearch} className='border-2 p-2 rounded-md bg-green-600 text-white hover:bg-green-500 cursor-pointer'>Search</button> */}
            </div>
            
            <div className='flex flex-col items-center border-2 border-teal-500 shadow-teal-100 shadow-lg  rounded-lg mx-2'>
                <h2 className='text-xl text-teal-800 font-semibold my-2'>Filterations</h2>
                <div className='flex gap-2 items-center'>
                    <p className='font-bold text-teal-500'>Filter by Categories: </p>
                    <select className='border-2 p-2 rounded-lg my-2' onChange={(e) => setFilters({...filters,category:e.target.value})}>
                        <option value="">All Categories</option>
                        {categoriesList.map((cat,index) => (
                            <option value={`${cat.slug}`} key={index}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className='flex gap-2 items-center '>
                    <p className='font-bold text-teal-500'>Filter by Brand: </p>
                    <select className='border-2 p-2 rounded-lg' onChange={(e) => setFilters({...filters,brand:e.target.value})}>
                        <option value="">All Brands</option>
                        {brandsList.map((brand,index)=> (
                            <option value={brand} key={index}>{brand}</option>
                        ))}
                    </select>
                </div>
                <div className='flex flex-col sm:flex-row items-center my-2 gap-2'>
                    <p className='font-bold mr-2 text-teal-500'>Filter by Price: </p>
                    <input placeholder='min price' type="number" className='border-2 p-2 rounded-md' onChange={(e) => setFilters({...filters,priceRange:[e.target.value ? Number(e.target.value):0,filters.priceRange[1]]})}/>
                    <input placeholder='max price' type="number" className='border-2 p-2 rounded-md' onChange={(e) => setFilters({...filters,priceRange:[filters.priceRange[0], e.target.value ? Number(e.target.value) : Infinity]})}/>
                </div>
                <div className='flex items-center my-2 gap-2'>
                    <p className='font-bold text-teal-500'>Filter by Rating: </p>
                    <select className='border-2 p-2 rounded-lg' onChange={(e) => setFilters({...filters,rating:Number(e.target.value)})}>
                        <option value={0}>All Ratings</option>
                        <option value={4}>⭐ 4 & up</option>
                        <option value={3}>⭐ 3 & up</option>
                        <option value={2}>⭐ 2 & up</option>
                        <option value={1}>⭐ 1 & up</option>
                    </select>
                </div>
                <div className='flex items-center gap-2'>
                    <p className='font-bold text-teal-500'>Sort by: </p>
                    <select className='border-2 p-2 rounded-lg my-2' onChange={(e) => setSortBy(e.target.value)}>
                        <option value="Price: Low to High">Price: Low to High</option>
                        <option value="Price: High to Low">Price: High to Low</option>
                        <option value="Newest">Newest</option>
                    </select>
                </div>
            </div>

            <InfiniteScroll
                dataLength={filteredProducts.length}
                next={fetchData}
                hasMore={hasMore}
                loader={<h3 className='text-center font-bold text-lg my-4'>Loading ... </h3>}
                endMessage={<p className='text-center font-bold text-lg my-4'>No more products</p>}
            >
                <div className="m-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {filteredProducts.map((product,index) => (
                        <ProductCard product={product} key={index} />
                    ))}
                </div>
            </InfiniteScroll>
        </section>
    );
}

export default ProductsPage;