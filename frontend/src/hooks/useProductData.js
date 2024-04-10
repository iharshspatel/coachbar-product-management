import { useEffect, useState } from "react";
import { defaultProduct } from "../constants/product";
import { useGetProductMutation } from "../slices/productApiSlice";

export function useProductData(id){
    const [product, setProduct] = useState(defaultProduct);
    const [getProduct] = useGetProductMutation();

    async function getProductData(){
        const {product} = await getProduct(id).unwrap();
        setProduct(product);
    }

    useEffect(()=>{
        getProductData(id);
    },[])

    return [product,setProduct]
}