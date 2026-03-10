'use client';

import React, { createContext, useContext, useReducer, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CartItem {
  id: string;
  title: string;
  price: number;       // numeric, e.g. 3500
  period: string;      // 'monthly' | 'one-time'
  qty: number;
  accent: string;
}

interface CartState {
  items: CartItem[];
  drawerOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'qty'> }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QTY'; payload: { id: string; delta: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'OPEN_DRAWER' }
  | { type: 'CLOSE_DRAWER' };

// ─── Reducer ──────────────────────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.items.find(i => i.id === action.payload.id);
      if (exists) return state; // already in cart
      return {
        ...state,
        items: [...state.items, { ...action.payload, qty: 1 }],
      };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload.id) };
    case 'UPDATE_QTY': {
      return {
        ...state,
        items: state.items
          .map(i =>
            i.id === action.payload.id
              ? { ...i, qty: Math.max(1, i.qty + action.payload.delta) }
              : i
          ),
      };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'OPEN_DRAWER':
      return { ...state, drawerOpen: true };
    case 'CLOSE_DRAWER':
      return { ...state, drawerOpen: false };
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface CartContextValue {
  items: CartItem[];
  drawerOpen: boolean;
  totalCount: number;
  monthlyTotal: number;
  onetimeTotal: number;
  isInCart: (id: string) => boolean;
  addItem: (item: Omit<CartItem, 'qty'>) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, delta: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleItem: (item: Omit<CartItem, 'qty'>) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], drawerOpen: false });

  const isInCart = useCallback((id: string) => state.items.some(i => i.id === id), [state.items]);
  const addItem = useCallback((item: Omit<CartItem, 'qty'>) => dispatch({ type: 'ADD_ITEM', payload: item }), []);
  const removeItem = useCallback((id: string) => dispatch({ type: 'REMOVE_ITEM', payload: { id } }), []);
  const updateQty = useCallback((id: string, delta: number) => dispatch({ type: 'UPDATE_QTY', payload: { id, delta } }), []);
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);
  const openDrawer = useCallback(() => dispatch({ type: 'OPEN_DRAWER' }), []);
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), []);
  const toggleItem = useCallback((item: Omit<CartItem, 'qty'>) => {
    if (state.items.some(i => i.id === item.id)) {
      dispatch({ type: 'REMOVE_ITEM', payload: { id: item.id } });
    } else {
      dispatch({ type: 'ADD_ITEM', payload: item });
    }
  }, [state.items]);

  const totalCount = state.items.reduce((acc, i) => acc + i.qty, 0);
  const monthlyTotal = state.items
    .filter(i => i.period === 'monthly')
    .reduce((acc, i) => acc + i.price * i.qty, 0);
  const onetimeTotal = state.items
    .filter(i => i.period !== 'monthly')
    .reduce((acc, i) => acc + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{
      items: state.items, drawerOpen: state.drawerOpen,
      totalCount, monthlyTotal, onetimeTotal,
      isInCart, addItem, removeItem, updateQty, clearCart,
      openDrawer, closeDrawer, toggleItem,
    }}>
      {children}
    </CartContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}

// ─── Utility ──────────────────────────────────────────────────────────────────

/** '₹3,500' → 3500 */
export function parsePrice(str: string): number {
  return parseInt(str.replace(/[₹,]/g, ''), 10);
}

/** 3500 → '₹3,500' */
export function formatPrice(num: number): string {
  return '₹' + num.toLocaleString('en-IN');
}
