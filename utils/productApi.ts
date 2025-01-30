'use server'

import { ProductData } from "app/Hooks/useProductForm";


interface ProductResponse {
    error?: any;
    success : boolean;
    responseObject?: ProductData;
}

const addProduct = async(product : ProductData) : Promise < ProductResponse > => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API_URL}/api/dashboard/product/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.TKN}`
            },
            body: JSON.stringify({product})
        });

        if (!response.ok) {
        
            const errorResponse = await response.json();
            console.log('errorResponse: ', errorResponse);
            throw errorResponse.message || "Failed to add product";
            
        }
                
        const result = await response.json();
        console.log('result: ', result);
        return {success: true, responseObject: JSON.parse(result.responseObject)};
    } catch (error) {
        console.error(error);
        return {error, success: false};
    }
};

const editProduct = async(productId : string, product : ProductData) : Promise < ProductResponse > => {
    try {
        const response = await fetch(`${process.env.EXTERNAL_API_URL}/api/dashboard/product/update/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.TKN}`
            },
            body: JSON.stringify(product)
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || "Failed to edit product");
        }

        const result = await response.json();
        return {success: true, responseObject: result.responseObject};
    } catch (error) {
        console.error(error);
        return {error, success: false};
    }
};

export {addProduct, editProduct};