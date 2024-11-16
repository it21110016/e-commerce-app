import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faCaretRight,
  faCaretLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";

const ProductsPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userLoggedIn = localStorage.getItem("status");
        if (userLoggedIn === "logged-in") { 
          setIsLoggedIn(true);
        }
      }, []);

  const products = [
    {
      id: 1,
      name: "Phone",
      price: 100,
      description: "Lorem ipsum dolor sit amet",
      image: "/assets/images/phone.png",
      category: "Electronics",
    },
    {
      id: 2,
      name: "Coat",
      price: 200,
      description: "Lorem ipsum dolor sit amet",
      image: "/assets/images/coat.jpg",
      category: "Clothing",
    },
    {
      id: 3,
      name: "Laptop",
      price: 150,
      description: "Lorem ipsum dolor sit amet",
      image: "/assets/images/laptop.jpg",
      category: "Electronics",
    },
    {
      id: 4,
      name: "Shirt",
      price: 120,
      description: "Lorem ipsum dolor sit amet",
      image: "/assets/images/shirt.jpg",
      category: "Clothing",
    },
    {
      id: 5,
      name: "Smart Watch",
      price: 250,
      description: "Lorem ipsum dolor sit amet",
      image: "/assets/images/watch.jpg",
      category: "Electronics",
    },
    {
      id: 6,
      name: "T-Shirt",
      price: 300,
      description: "Lorem ipsum dolor sit amet",
      image: "/assets/images/t-shirt.jpg",
      category: "Clothing",
    },
    {
      id: 7,
      name: "Headphone",
      price: 180,
      description: "Lorem ipsum dolor sit amet",
      image: "/assets/images/headphone.png",
      category: "Electronics",
    },
    {
      id: 8,
      name: "Pants",
      price: 350,
      description: "Lorem ipsum dolor sit amet",
      image: "/assets/images/pants.jpg",
      category: "Clothing",
    },
    {
      id: 9,
      name: "Camera",
      price: 400,
      description: "Lorem ipsum dolor sit amet",
      image: "/assets/images/camera.jpg",
      category: "Electronics",
    },
    {
      id: 10,
      name: "Dress",
      price: 90,
      description: "Lorem ipsum dolor sit amet",
      image: "/assets/images/dress.jpg",
      category: "Clothing",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const navigate = useNavigate();

  const goToCart = () => {
    navigate("/cart");
  };

  const filteredProducts = products.filter((product) => {
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
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-14">
        <h1 className="text-3xl font-semibold text-center text-gray-800">
          Our Products
        </h1>
        {isLoggedIn && (
            <button
            onClick={goToCart}
            className="bg-orange-500 text-white py-2 px-4 rounded-lg flex items-center hover:bg-orange-600 transition-colors"
          >
            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
            View Cart
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Section */}
        <div className="lg:col-span-1 space-y-6">
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
              onChange={(e) => setSearchQuery(e.target.value)}
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
              onChange={(e) => setSelectedCategory(e.target.value)}
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
              onChange={(e) =>
                setPriceRange([priceRange[0], parseInt(e.target.value)])
              }
              className="w-full"
            />
            <div className="flex justify-between text-gray-700 mt-1">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
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
                  src='/assets/animations/no-products.json'
                  style={{ height: "200px", width: "200px" }}
                />
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredProducts.length > productsPerPage && (
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
