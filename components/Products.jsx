"use client";
import React, { useState } from "react";
import { getProduct } from "@/services/product.service";
import { baseUrl } from "@/context/Provider";
import { mutate } from "swr";

export default function Products() {
  const { data, isLoading, error } = getProduct();
  const [product, setProduct] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleClick = async () => {
    await fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });
    mutate(baseUrl)
  };

  return (
    <div>
      <form>
        <label htmlFor="product">Input Product</label>
        <input
          onChange={(e) => handleChange(e)}
          type="text"
          name="product"
        />
        <br />
        <br />
        <label htmlFor="price">Input Price</label>
        <input
          onChange={(e) => handleChange(e)}
          type="text"
          name="price"
        />
      </form>
      <br />
      <button onClick={() => handleClick()}>Add Product</button>

      <h3>Display Product</h3>

      {!data ? (
        "No Data"
      ) : (
        <table
          cellSpacing="0"
          cellPadding="0"
          border="1"
          width="300px"
          height="auto"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((pro) => (
              <tr key={pro?.id}>
                <td>{pro?.id}</td>
                <td>{pro?.product}</td>
                <td>{pro?.price}$</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
