import MainLayout from "@layouts/MainLayout";
import { getCartItems } from "@services/CartServices";
import type { cartItem } from "@type/CartItem";
import { useEffect, useState } from "react"



function CartPage() {
    const [cartItems, setCartItems] = useState<cartItem[]>([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await getCartItems();
                if (!response.ok) {
                console.error('Cart fetch failed with status:', response.status);
                }
                setCartItems(response);
            } catch (error) {
                console.error('Failed to fetch cart items:', error);
            }
        }
        fetchCartItems();
    } , [])
    return (
        <MainLayout>
            <div>
            {cartItems.map((item) => (
                <div
                key={item.cartItemId}
                className="flex justify-between items-center p-4 border-b border-gray-200"
                >
                <div className="flex items-center">
                    <img
                    src={item.menuItemImg}
                    className="w-16 h-16 rounded-md mr-4"
                    />
                    <div>
                    <h2 className="text-lg font-semibold">{item.description}</h2>
                    <p className="text-gray-600">EGP {item.price}</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <span className="text-gray-600 mr-4">Quantity: {item.quantity}</span>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                    Remove
                    </button>
                </div>
                </div>
            ))}
            </div>
        </MainLayout>
    )
}


export default CartPage
