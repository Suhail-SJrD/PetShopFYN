import { create } from 'zustand';
import { PetStore } from './StoreTypes';

const usePetStore = create<PetStore>((set, get) => ({
  pets: [],
  wishlist: [],

  addPets: (pet) =>
    set((state) => ({
      pets: [...state.pets, pet],
    })),

  addToWishlist: (pet) =>
    set((state) => ({
      wishlist: [...state.wishlist, pet],
    })),

  removeFromWishlist: (id) =>
    set((state) => ({
      wishlist: state.wishlist.filter((pet) => pet.id !== id),
    })),

  isWishlisted: (id) => {
    return get().wishlist.some((pet) => pet.id === id);
  },
}));

export default usePetStore;
