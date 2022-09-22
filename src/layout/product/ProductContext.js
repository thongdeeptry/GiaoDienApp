
import React, { useState, createContext } from 'react';
export const ProductConText = createContext();
export const ProductConTextProvider = (props) => {
    const { children } = props;
    const [cart, setcart] = useState([])
    const [products, setproducts] = useState([])
    const [product, setproduct] = useState({})
    return (
        <ProductConText.Provider
            value={{
                
                setcart
                
            }}
        >
            {children}
        </ProductConText.Provider>
    );
};


