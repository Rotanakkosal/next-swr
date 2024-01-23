"use client";
import { data } from "autoprefixer";
import React, { useEffect, useState } from "react";

export default function Old() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    fetch("https://6579da3c1acd268f9afa4236.mockapi.io/post/product")
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);
  if(!product.length) return <p>Loading ....</p>
  return <div>
     <ul>
          {product?.map((pro)=>(
               <li key={pro?.id}>{pro?.product}</li>
          ))}
     </ul>
  </div>;
}
