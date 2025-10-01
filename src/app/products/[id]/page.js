import SwiperProducts from "./swiperProd"
import SimilarProdsCat from "./similarProdsCat";

const ProductPage = async function ({ params }) {
    const id = params.id;
    const res = await fetch(`https://dummyjson.com/products/${id}`,{
        cache:'no-store'
    });
    const product = await res.json();
    
    console.log(product);


    return(
        <div className="entire containerT">
            <h2 className='text-2xl text-blue-600 font-semibold mt-4 text-center'>Product Details</h2>
            <SwiperProducts images={product.images} />
            <div className="mt-4 mx-2 flex flex-col border-2 border-cyan-600 p-2 shadow-[0_0_10px_cyan] shadow-cyan-500 rounded-md gap-2">
                <p className="font-bold text-center text-cyan-500 text-xl">Product Description</p>
                <p className="font-semibold ">{product.description}</p>
                <p className="font-semibold text-amber-500"><strong>Brand:</strong>{product.brand}</p>
                <p className="text-cyan-700 font-bold">{product.rating} ⭐ out of 5</p>
                <p className="text-green-600 font-bold">{product.price} $</p>
            </div>
            <div className="border-2 rounded-md mx-2 mt-2">
                <h3 className="font-bold text-center text-xl text-cyan-600 mb-2">Reviews</h3>
                {product.reviews.map((review, index) => (
                    <div key={index} className="my-2 p-1">
                        <p>{review.reviewerName}: {review.comment}, {review.rating}⭐ out of 5</p>
                        <hr className="border-2" />
                    </div>
                ))}
            </div>
            <div className="otherDetails my-4 ">
                <table className="border-2 border-gray-300 shadow-[0_0_10px] shadow-amber-500 text-center w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Other Details</th>
                            <th className="border border-gray-300 px-4 py-2">Answers</th>
                        </tr>
                    </thead> 
                    <tbody className="bg-white">
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">Stock</td>
                            <td className="border border-gray-300 px-4 py-2">{product.stock}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">Warranty Information</td>
                            <td className="border border-gray-300 px-4 py-2">{product.warrantyInformation}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">Shipping Information</td>
                            <td className="border border-gray-300 px-4 py-2">{product.shippingInformation}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">Return Policy</td>
                            <td className="border border-gray-300 px-4 py-2">{product.returnPolicy}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex justify-around my-4">
                <button className="bg-green-600 p-2 rounded-md text-white">Add to Cart</button>
                <button className="bg-cyan-600 p-2 rounded-md text-white">Add to Wish list</button>
            </div>
            <hr />
            
            <h1 className="font-bold text-xl text-center my-4">Similar Products</h1>
            <SimilarProdsCat category={product.category}/>
        </div>
    );
}

export default ProductPage;