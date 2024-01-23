"use client";
import React from "react";
import { SWRConfig } from "swr";

export const baseUrl = "https://6579da3c1acd268f9afa4236.mockapi.io/post/product";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Provider({ children }) {
  return (
    <SWRConfig value={{ fetcher, revalidateOnFocus: false, dedupingInterval:3000 }}>{children}</SWRConfig>
  );
}
