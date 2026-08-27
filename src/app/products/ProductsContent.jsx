"use client";
import { useState, useEffect, useCallback, useMemo } from 'react';
import ProductCard from "@/components/ProductCard";
import InfiniteScroll from 'react-infinite-scroll-component';
import FilterSection from '@/components/filterSection';

const LIMIT = 12;

const ProductsPage = function () {
    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [searchProductName, setSearchProductName] = useState("");
    const [categoriesList, setCategoriesList] = useState([]);
    const [brandsList, setBrandsList] = useState([]);

    const [filters, setFilters] = useState({
        category: "",
        brand: "",
        priceRange: [0, Infinity],
        rating: 0
    });

    const [sortBy, setSortBy] = useState("relevance");

    // 1. Memoize fetchData with useCallback to resolve missing dependency warning
    const fetchData = useCallback(async () => {
        try {
            const res = await fetch(`https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`);
            const data = await res.json();

            setProducts((prev) => [...prev, ...data.products]);
            setSkip((prev) => prev + LIMIT);

            if (products.length + data.products.length >= data.total) {
                setHasMore(false);
            }
        } catch (err) {
            console.error("Failed to fetch products:", err);
        }
    }, [skip, products.length]);

    useEffect(() => {
        fetchData();
    }, []); // Initial mount

    // 2. Fetch Categories & Brands
    useEffect(() => {
        async function fetchInitialData() {
            try {
                const [catRes, prodRes] = await Promise.all([
                    fetch("https://dummyjson.com/products/categories"),
                    fetch("https://dummyjson.com/products?limit=100")
                ]);

                const catData = await catRes.json();
                const prodData = await prodRes.json();

                // DummyJSON categories can be objects ({ slug, name, url }) or strings
                setCategoriesList(catData);

                const uniqueBrands = Array.from(
                    new Set(prodData.products.map((p) => p.brand).filter(Boolean))
                );
                setBrandsList(uniqueBrands);
            } catch (err) {
                console.error("Initial data fetch failed:", err);
            }
        }

        fetchInitialData();
    }, []);

    // 3. Compute filtered products synchronously with useMemo (Eliminates second useEffect)
    const filteredProducts = useMemo(() => {
        let results = [...products];

        if (searchProductName.trim()) {
            const query = searchProductName.trim().toLowerCase();
            results = results.filter((product) =>
                product.title.toLowerCase().includes(query)
            );
        }

        if (filters.category) {
            results = results.filter((product) => product.category === filters.category);
        }

        if (filters.brand) {
            results = results.filter((product) => product.brand === filters.brand);
        }

        results = results.filter(
            (product) =>
                product.price >= filters.priceRange[0] &&
                product.price <= filters.priceRange[1]
        );

        if (filters.rating > 0) {
            results = results.filter((product) => product.rating >= filters.rating);
        }

        switch (sortBy) {
            case "Price: Low to High":
                results.sort((a, b) => a.price - b.price);
                break;
            case "Price: High to Low":
                results.sort((a, b) => b.price - a.price);
                break;
            case "Newest":
                results.sort((a, b) => b.id - a.id);
                break;
            default:
                break;
        }

        return results;
    }, [products, searchProductName, filters, sortBy]);

    return (
        <section className="bg-gray-100 rounded-sm">
            <h1 className="text-center text-2xl mt-4 text-pink-700 font-bold">Products</h1>
            <FilterSection
                uniqBrands={brandsList}
                categoryList={categoriesList}
                filters={filters}
                setFilters={setFilters}
                sortBy={sortBy}
                setSortBy={setSortBy}
                searchProductName={searchProductName}
                setSearchProductName={setSearchProductName}
            />
            <InfiniteScroll
                dataLength={filteredProducts.length}
                next={fetchData}
                hasMore={hasMore}
                loader={<h3 className="text-center font-bold text-lg my-4">Loading ... </h3>}
                endMessage={<p className="text-center font-bold text-lg my-4">No more products</p>}
            >
                <div className="m-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {filteredProducts.map((product) => (
                        <ProductCard product={product} key={product.id} />
                    ))}
                </div>
            </InfiniteScroll>
        </section>
    );
};

export default ProductsPage;