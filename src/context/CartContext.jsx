import React, { createContext, useContext, useReducer } from "react";

// initial state of the cart which is an empty array
const initialState = {
    cartItems: []
};

// reducer function which will handle the actions on cart state

function cartReducer(state,action){
    switch(action.type){
        case "ADD_TO_CART":
        // if if product already exist in the cart
        const existingItemIndex = state.cartItems.findIndex(
            (item) => item.id === action.payload.id
        )

        if(existingItemIndex >= 0){
            // if item exist we will increase the quantity
            const updatedCart = [...state.cartItems]
            updatedCart[existingItemIndex].quantity += 1;
            return {...state, cartItems: updatedCart}
        }
        else{
            // if item dosent exist we will add new with quantity 1
            return{
                ...state,
                cartItems: [...state.cartItems,{...action.payload, quantity:1}]
            }
        }

        case "REMOVE_FROM_CART":
            //removing product by its id
            return{
                ...state,
                cartItems: state.cartItems.filter((item) => item.id !== action.payload)
            }
        
        case "UPDATE_QUANTITY":
            //updating the quantity of a specific product
            const updatedItems = state.cartItems.map((item) => {
                if(item.id === action.payload.id) {
                    return {...item, quantity: action.payload.quantity}
                }
                return item
            })
            return {...state, cartItems: updatedItems}

        case "CLEAR_CART":
            //we will reset the cart when user logs out
            return{...state, cartItems:[]}

            default:
                return state
    }
}

// creating the context
const CartContext = createContext()

// provider component 
export function CartProvider({children}) {
    const [state, dispatch] = useReducer(cartReducer, initialState)

    return(
        <CartContext.Provider value={{cartState: state, cartDispatch: dispatch}}>
            {children}
        </CartContext.Provider>
    )
}

// custom hoook for easier context usage

export function useCart() {
    return useContext(CartContext)
}