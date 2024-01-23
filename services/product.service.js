import { baseUrl } from "@/context/Provider";
import useSWR from "swr";
export function getProduct () {
     const data = useSWR(baseUrl);
     return data;
}
