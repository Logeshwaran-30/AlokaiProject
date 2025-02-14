import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
  SfButton,
  SfRating,
  SfCounter,
  SfLink,
  SfIconShoppingCart,
  SfIconCheckCircle
} from '@storefront-ui/react';
import { useCart } from '../CartContext'; // Import the useCart hook

const ProductCard = () => {
  const { category } = useParams(); // Get category from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertProductId, setAlertProductId] = useState(null);
  const { addToCart } = useCart(); // Access addToCart function from context
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  // Scroll to top whenever currentPage changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Filter products by category
  const getCategoryProducts = () => {
    if (!category) return products;
    if (category === 'mens-clothing') return products.filter((p) => p.category === "men's clothing");
    if (category === 'womens-clothing') return products.filter((p) => p.category === "women's clothing");
    if (category === 'electronics') return products.filter((p) => p.category === "electronics");
    if (category === 'jewellery') return products.filter((p) => p.category === "jewelery");
    return [];
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate which products to display based on the current page
  const currentProducts = getCategoryProducts().slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(getCategoryProducts().length / itemsPerPage);

  const handleAddToCart = (product) => {
    addToCart(product); // Add product to cart
    setAlertProductId(product.id); // Set product ID for alert
    setShowAlert(true); // Show the success alert
    setTimeout(() => setShowAlert(false), 5000); // Hide alert after 5 seconds
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="border border-neutral-200 rounded-md hover:shadow-lg max-w-[300px] animate-pulse">
            {/* Image Placeholder */}
            <div className="relative">
              <div className="bg-neutral-200 rounded-md w-full h-64"></div>
            </div>

            {/* Content Placeholder */}
            <div className="p-4 border-t border-neutral-200">
              {/* Title Placeholder */}
              <div className="bg-neutral-200 rounded w-3/4 h-4 mb-2"></div>

              {/* Rating and Counter Placeholders */}
              <div className="flex items-center pt-1">
                <div className="bg-neutral-200 w-16 h-4 mr-2"></div>
                <div className="bg-neutral-200 w-12 h-4"></div>
              </div>

              {/* Price Placeholder */}
              <span className="block pb-2 bg-neutral-200 w-20 h-4 mt-2"></span>

              {/* Add to Cart Button Placeholder */}
              <div className="w-full">
                <div className="bg-neutral-200 rounded-md w-3/4 h-8"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {/* Show success alert */}
      {showAlert && alertProductId && (
        <div
          role="alert"
          className="fixed top-0 right-10 flex items-center justify-between shadow-md max-w-[600px] bg-positive-100 pr-2 pl-4 mb-2 ring-1 ring-positive-200 typography-text-sm md:typography-text-base py-1 rounded-md z-50 mt-16"
        >
          <SfIconCheckCircle className="mr-2 text-positive-700" />
          <p className="py-2 mr-2">
            Product has been added to the cart!
            <Link
              to={`/addtocart/${alertProductId}`} // Link to the details page
              className="ml-2 text-blue-600 hover:text-blue-800"
            >
              View Details
            </Link>
          </p>
        </div>
      )}

      {/* Total number of products */}
      <div className="mb-4 -mt-10">
        <h1 className="text-4xl font-bold mb-10 -mt-16 ml-8">
          Products in {category ? category.replace("-", " ") : "All Categories"}:
        </h1>
        <span className="font-bold text-2xl md:text-3xl">{getCategoryProducts().length} Products</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentProducts.map((product) => (
          <div key={product.id} className="border border-neutral-200 rounded-md hover:shadow-lg max-w-[300px]">
            <div className="relative">
              <Link to={`/Productdetails/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-cover h-auto rounded-md aspect-square"
                  width="250"
                  height="250"
                />
              </Link>
            </div>
            <div className="p-4 border-t border-neutral-200">
              <Link to={`/Productdetails/${product.id}`}>
                <h3>{product.title}</h3>
              </Link>
              <p className="text-sm text-gray-500">{product.category}</p> 
              <div className="flex items-center pt-1">
                <SfRating size="xs" value={Math.floor(product.rating?.rate || 0)} max={5} />
                <SfLink href="#" variant="secondary" className="pl-1 no-underline">
                  <SfCounter size="xs">{product.rating?.count || 0}</SfCounter>
                </SfLink>
              </div>
              <span className="block pb-2 font-bold typography-text-lg">${product.price}</span>
              <div className="w-full">
                <SfButton
                  size="sm"
                  slotPrefix={<SfIconShoppingCart size="sm" />}
                  onClick={() => handleAddToCart(product)}
                >
                  Add to cart
                </SfButton>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-l-md"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'} mx-1 rounded-md`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ProductCard;
