import React, { CreateContext, UseContext, useState, useEffect, createContext, useContext } from "react";
import { toast } from "react-hot-toast"

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantites, setTotalQuantites] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id)


        setTotalPrice((preveTotalPrice) => preveTotalPrice + product.price * quantity)
        setTotalQuantites((preveTotalQuantities) => preveTotalQuantities + quantity)

        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })
            setCartItems(updatedCartItems)
        }
        else {
            product.quantity = quantity;

            setCartItems([...cartItems, { ...product }])
        }
        toast.success(`${qty} ${product.name} added to the cart`)
    }
    const incQty = () => {
        setQty(preve => preve + 1)
    }
    const decQty = () => {
        setQty((preveQty) => {
            if ((preveQty - 1) < 1) return 1;

            return preveQty - 1
        })
    }

    const onRemove = (product)=>{
        foundProduct = cartItems.find(item => item._id === product._id)
        const newCartItems = cartItems.filter(item => item._id !== product._id)
        setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price * foundProduct.quantity)
        setTotalQuantites(preveTotalQuantities => preveTotalQuantities - foundProduct.quantity)
        setCartItems(newCartItems)
    }
    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((product) => product._id === id)
        // const newCartItems = cartItems.filter(item => item._id !== id)
        const newCartItems = cartItems.filter((item)=> item._id !== id)

        if (value === 'inc') {
            // foundProduct.quantity += 1;
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }])
            setTotalPrice(prevTotalPrice => prevTotalPrice + foundProduct.price)
            setTotalQuantites(prevTotalQuanties => prevTotalQuanties + 1)
        }
        else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                // foundProduct.quantity += 1;
                setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }])
                setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price)
                setTotalQuantites(prevTotalQuanties => prevTotalQuanties - 1)
            }
        }
    }


    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                cartItems,
                totalPrice,
                totalQuantites,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuantity,
                onRemove,
                setCartItems,
                setTotalPrice,
                setTotalQuantites,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)