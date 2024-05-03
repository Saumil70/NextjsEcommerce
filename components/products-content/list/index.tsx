import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductItem from "../../product-item";
import ProductsLoading from "./loading";
import { ProductFetch, ProductTypeList } from "types";

const ProductsContent: React.FC = () => {
  // Correct the useState declaration
  const [data, setData] = useState<ProductFetch[]>([]);
  const [isLoading, setIsLoading] = useState(true); // State for loading indication

  // Define the function to fetch products
  const getProducts = async () => {
    try {
      setIsLoading(true); // Set loading state to true
      const response = await axios.get("https://localhost:7207/api/Users/GetProducts");
      setData(response.data); // Set state with fetched data
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false); // Loading is complete
    }
  };

  // Fetch products when component mounts
  useEffect(() => {
    getProducts(); // Call function to fetch data
  }, []); // Empty dependency array to ensure it runs once on mount

  return (
    <>
      {isLoading ? (
        <ProductsLoading /> // Show loading component while loading
      ) : (
        <section className="products-list">
          {data.map((item) => (
            <ProductItem
              key={item.productId} // Use a unique key
              id={item.productId}
              name={item.productName}
              price={item.price}
              color={item.color}
              currentPrice={item.currentPrice}
              imageData={item.imageData}
            />
          ))}
        </section>
      )}
    </>
  );
};

export default ProductsContent;
