import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppText from '../../../components/AppText';
import { SizeConfig } from '../../../utils/SizeConfig';
import { Colors } from '../../../utils/Colors';
import { Fonts } from '../../../utils/Fonts';
import Button from '../../../components/Button';
import { petType } from '../../../store/StoreTypes';
import usePetStore from '../../../store/PetsStore';

const Card = ({ pet }: { pet: petType }) => {
  const addToCart = usePetStore(s => s.addToWishlist);
  const removeFromCart = usePetStore(s => s.removeFromWishlist);

  const added = usePetStore(s => s.wishlist.some(p => p.id === pet.id));

  const handleCart = () => {
    if (added) removeFromCart(pet.id);
    else addToCart(pet);
  };

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.card}>
      <Image
        source={{uri : pet.petImage}}
        style={styles.image}
      />

      <View style={styles.content}>
        <AppText style={styles.name} numberOfLines={1}>
          {pet.petName}
        </AppText>

        <AppText style={styles.info} numberOfLines={1}>
          Breed: {pet.breed}
        </AppText>
        <AppText style={styles.info} numberOfLines={1}>
          Age: {pet.age} Years
        </AppText>

        <View style={styles.bottomRow}>
          <AppText style={styles.price} numberOfLines={1}>
            ₹ {pet.price}
          </AppText>

          <Button
            buttonText={added ? 'Added' : 'Add'}
            lhsIcon={
              <MaterialIcons
                name={added ? 'check' : 'shopping-cart'}
                size={SizeConfig.width * 3.5}
                color={Colors.white}
              />
            }
            onPress={handleCart}
            touchableOpacityStyle={styles.cartBtn}
            textStyle={{
              fontSize: SizeConfig.fontSize * 3,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: SizeConfig.width * 42,
    backgroundColor: Colors.white,
    borderRadius: SizeConfig.width * 4,
    overflow: 'hidden',

    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,

    marginBottom: SizeConfig.height * 2,
  },

  image: {
    width: '100%',
    height: SizeConfig.height * 12,
    resizeMode: 'cover',
  },

  content: {
    padding: SizeConfig.width * 3,
  },

  name: {
    fontFamily: Fonts.semiBold,
    fontSize: SizeConfig.fontSize * 3.2,
    marginBottom: SizeConfig.height * 0.5,
    width: '100%',
    color: Colors.textColor,
  },

  info: {
    fontSize: SizeConfig.fontSize * 2.6,
    color: Colors.textColor,
    fontFamily: Fonts.medium,
    width: '100%',
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SizeConfig.height * 1.5,
  },

  price: {
    fontFamily: Fonts.bold,
    fontSize: SizeConfig.fontSize * 3,
    color: Colors.primary,
    width: '50%',
  },

  cartBtn: {
    paddingHorizontal: SizeConfig.width * 3,
    paddingVertical: SizeConfig.height * 0.6,
    borderRadius: SizeConfig.width * 3,
  },
});

export default Card;
