import { createContext, useState, useContext, useEffect, useMemo } from 'react';

export const CommerceContext = createContext(null);

export function CommerceProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem('aura_cart');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const stored = localStorage.getItem('aura_wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [cartValidation, setCartValidation] = useState([]); // stores warnings

  const toggleCartDrawer = () => setIsCartDrawerOpen(prev => !prev);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);
  const openCartDrawer = () => setIsCartDrawerOpen(true);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('aura_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('aura_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // --- CART OPERATIONS ---
  const addToCart = (product, selectedVariants = null, quantity = 1) => {
    setCartItems(prev => {
      // Create a deterministic variant ID from selected options
      let generatedVariantId = null;
      let activePrice = product.price;
      let activeComparePrice = product.compareAtPrice;
      let variantImage = null;

      if (selectedVariants && Object.keys(selectedVariants).length > 0) {
        // Sort keys to ensure deterministic ID
        const keys = Object.keys(selectedVariants).sort();
        generatedVariantId = keys.map(k => `${k}:${selectedVariants[k]?.id || selectedVariants[k]?.name}`).join('|');

        // Calculate active price
        Object.values(selectedVariants).forEach(option => {
          if (option && option.price) {
            activePrice = option.price;
            activeComparePrice = null;
          } else if (option && option.priceModifier) {
            activePrice += option.priceModifier;
          }
          if (option && option.image) {
            variantImage = option.image;
          }
        });
      }

      const existingIdx = prev.findIndex(item => 
        item.productId === product.id && item.variantId === generatedVariantId
      );

      if (existingIdx > -1) {
        const newItems = [...prev];
        const newQuantity = newItems[existingIdx].quantity + quantity;
        const maxStock = product.stock !== undefined ? product.stock : 99;
        newItems[existingIdx].quantity = Math.min(newQuantity, maxStock);
        return newItems;
      }

      const maxStock = product.stock !== undefined ? product.stock : 99;
      
      return [...prev, {
        id: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        productId: product.id,
        variantId: generatedVariantId,
        product,
        selectedVariants,
        variantImage,
        quantity: Math.min(quantity, maxStock),
        unitPrice: activePrice,
        compareAtPrice: activeComparePrice,
        availability: product.stock > 0 ? 'In Stock' : 'Out of Stock'
      }];
    });
    openCartDrawer();
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) return;
    setCartItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const maxStock = item.product.stock !== undefined ? item.product.stock : 99;
        return { ...item, quantity: Math.min(quantity, maxStock) };
      }
      return item;
    }));
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
