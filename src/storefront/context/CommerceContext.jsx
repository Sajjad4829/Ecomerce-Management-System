import { createContext, useState, useContext, useEffect, useMemo } from 'react';

export const CommerceContext = createContext(null);

export function CommerceProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [cartValidation, setCartValidation] = useState([]); // stores warnings

  const toggleCartDrawer = () => setIsCartDrawerOpen(prev => !prev);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);
  const openCartDrawer = () => setIsCartDrawerOpen(true);

  // --- CART OPERATIONS ---
  const addToCart = (product, variant = null, quantity = 1) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => 
        item.productId === product.id && 
        (variant ? item.variantId === variant.id : !item.variantId)
      );

      if (existingIdx > -1) {
        const newItems = [...prev];
        newItems[existingIdx].quantity += quantity;
        return newItems;
      }

      return [...prev, {
        id: `cart_${Date.now()}`,
        productId: product.id,
        variantId: variant?.id || null,
        product,
        variant,
        quantity,
        unitPrice: variant ? variant.price : product.price,
        compareAtPrice: variant ? variant.compareAtPrice : product.compareAtPrice,
        availability: 'In Stock' // placeholder
      }];
    });
    openCartDrawer();
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) return;
    setCartItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCartItems([]);

  // --- WISHLIST OPERATIONS ---
  const toggleWishlist = (product, variant = null) => {
    setWishlistItems(prev => {
      const exists = prev.find(item => 
        item.productId === product.id && 
        (variant ? item.variantId === variant.id : !item.variantId)
      );

      if (exists) {
        return prev.filter(item => item.id !== exists.id);
      } else {
        return [...prev, {
          id: `wish_${Date.now()}`,
          productId: product.id,
          variantId: variant?.id || null,
          product,
          variant,
          addedAt: new Date().toISOString()
        }];
      }
    });
  };

  const removeFromWishlist = (itemId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
  };

  const clearWishlist = () => setWishlistItems([]);

  const moveToCart = (wishlistItem) => {
    addToCart(wishlistItem.product, wishlistItem.variant, 1);
    removeFromWishlist(wishlistItem.id);
  };

  const saveForLater = (cartItem) => {
    toggleWishlist(cartItem.product, cartItem.variant);
    removeFromCart(cartItem.id);
  };

  const isInWishlist = (productId, variantId = null) => {
    return wishlistItems.some(item => 
      item.productId === productId && 
      (variantId ? item.variantId === variantId : true)
    );
  };

  // --- CALCULATIONS ---
  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
  }, [cartItems]);

  const cartTotalItems = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const wishlistTotalItems = wishlistItems.length;

  const value = {
    cartItems,
    wishlistItems,
    isCartDrawerOpen,
    cartValidation,
    toggleCartDrawer,
    closeCartDrawer,
    openCartDrawer,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleWishlist,
    removeFromWishlist,
    clearWishlist,
    moveToCart,
    saveForLater,
    isInWishlist,
    cartSubtotal,
    cartTotalItems,
    wishlistTotalItems
  };

  return (
    <CommerceContext.Provider value={value}>
      {children}
    </CommerceContext.Provider>
  );
}

export const useCommerce = () => {
  const context = useContext(CommerceContext);
  if (!context) {
    throw new Error('useCommerce must be used within a CommerceProvider');
  }
  return context;
};
