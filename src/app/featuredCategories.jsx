

const FeaturedCategories = async function () {

    const getCategories = async function () {
        
        const productsList = await fetch("https://dummyjson.com/products?limit=100").then((data) => data.json()).then((data) => data.products);

        const categoryMap = {};

        productsList.forEach((product) => {

            if (!categoryMap[product.category]) {
                categoryMap[product.category] = product.thumbnail;
            }
        });

        return Object.entries(categoryMap).map(([name,image]) => ({
            name,
            image,
        }));
    }

    const categories = await getCategories();
    
    return (
        <div className="grid grid-cols-3 gap-4 p-2 mx-2 mt-4 sm:grid-cols-4 lg:grid-cols-5">
            {categories.map((cat,index) => (
                <div className="border-2 rounded-md flex flex-col shadow-xl" key={index}>
                    <img src={cat.image} alt={cat.name} />
                    <h3 className="text-center font-semibold text-blue-800">{cat.name}</h3>
                </div>
            ))}
        </div>
    );
    

}

export default FeaturedCategories;