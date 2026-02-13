export interface petType {
    id : string,
    petName : string,
    breed : string,
    age : number,
    price : number,
    petImage : string
    
}

export type PetStore = {
  pets: petType[];
  wishlist: petType[];

  addPets: (pet: petType) => void;

  addToWishlist: (pet: petType) => void;
  removeFromWishlist: (id: string) => void;

  isWishlisted: (id: string) => boolean;
};