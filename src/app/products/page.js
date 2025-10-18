"use client";
import { useState,useEffect } from 'react';
import ProductCard from "@/components/ProductCard"
import InfiniteScroll from 'react-infinite-scroll-component';
import FilterSection from '@/components/filterSection';

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
            const res = await fetch("https://dummyjson.com/products/categories");
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
            <h1 className="text-center text-2xl mt-4 text-pink-700 font-bold">Products</h1>      
            <FilterSection uniqBrands={brandsList} categoryList={categoriesList}/>
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