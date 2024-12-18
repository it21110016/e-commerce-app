import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { Player } from "@lottiefiles/react-lottie-player";
import { Products } from "../data/Products";

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const [loading, setLoading] = useState(false);

  const filteredProducts = Products.filter((product) => {
    const matchesName = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesName && matchesCategory && matchesPrice;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePreviousPage = () => {
    setLoading(true);
    if (currentPage > 1) {
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setLoading(false);
      }, 1500);
    } else {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    setLoading(true);
    if (currentPage < totalPages) {
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setLoading(false);
      }, 1500);
    } else {
      setLoading(false);
    }
  };

  const handleCategoryChange = (e) => {
    setLoading(true);
    const selectedValue = e.target.value;
    setTimeout(() => {
      setSelectedCategory(selectedValue);
      setLoading(false);
      setCurrentPage(1);
    }, 1500);
  };

  const handlePriceChange = (e) => {
    const newMaxValue = parseInt(e.target.value);
    setLoading(true);
    setTimeout(() => {
      setPriceRange([priceRange[0], newMaxValue]);
      setLoading(false);
      setCurrentPage(1);
    }, 500);
  };

  return (
    <div className="container mx-auto p-6 relative">
      {/* Spinner Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-opacity-75 flex items-center justify-center z-50 top-50 left-50">
          <Player
            autoplay
            loop
            src="/assets/animations/spinner.json"
            style={{ height: "300px", width: "300px", margin: "0 auto" }}
          />
        </div>
      )}

      {/* Header Section */}
      <div className="flex justify-between items-center mb-14">
        <h1 className="text-3xl font-semibold text-center text-gray-800">
          Our Products
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Section */}
        <div className={`lg:col-span-1 space-y-6 ${loading ? "blur-sm" : ""}`}>
          <div>
            <label
              htmlFor="search"
              className="font-semibold text-gray-700 mb-2 block"
            >
              Search by Name
            </label>
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={(e) => {setSearchQuery(e.target.value); setCurrentPage(1);}}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Search products..."
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="font-semibold text-gray-700 mb-2 block"
            >
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="price"
              className="font-semibold text-gray-700 mb-2 block"
            >
              Price Range
            </label>
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange[1]}
              onChange={handlePriceChange}
              className="w-full"
            />
            <div className="flex justify-between text-gray-700 mt-1">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        <div className={`lg:col-span-3 ${loading ? "blur-sm" : ""}`}>
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {displayedProducts.length > 0 ? (
              displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center space-y-4">
                <p className="text-center text-gray-500">
                  No products match your filters.
                </p>

                <Player
                  autoplay
                  loop
                  src="/assets/animations/no-products.json"
                  style={{ height: "200px", width: "200px" }}
                />
              </div>
            )}
          </div>

          {/* Pagination */}
          {displayedProducts.length > 0 && (
            <div className="flex justify-center items-center mt-8 space-x-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`py-2 px-4 rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-300"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                } transition-colors`}
              >
                <FontAwesomeIcon icon={faCaretLeft} />
              </button>
              <span className="text-gray-700 font-semibold">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`py-2 px-4 rounded-lg ${
                  currentPage === totalPages
                    ? "bg-gray-300"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                } transition-colors`}
              >
                <FontAwesomeIcon icon={faCaretRight} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
