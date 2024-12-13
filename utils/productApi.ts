'use server'

import {ProductData} from "@/components/Modals/AddProductModal/AddProductModal";

interface ProductResponse {
    error?: any;
    success : boolean;
    responseObject?: string;
}

const addProduct = async(product : ProductData) : Promise < ProductResponse > => {
    console.log('product: ', product);
    try {
        const response = await fetch(`${process.env.EXTERNAL_API_URL}/products/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.TKN}`
            },
            body: JSON.stringify({product})
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || "Failed to add product");
        }

        const result = await response.json();
        return {success: true, responseObject: result.responseObject};
    } catch (error) {
        console.error(error);
        return {error, success: false};
    }
};

const editProduct = async(productId : string, product : ProductData) : Promise < ProductResponse > => {
    console.log('productId:', productId, 'product:', product);
    try {
        const response = await fetch(`${process.env.EXTERNAL_API_URL}/products/${productId}/edit`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.TKN}`
            },
            body: JSON.stringify({product})
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