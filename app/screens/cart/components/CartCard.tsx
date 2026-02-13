import { Image, ImageProps, StyleSheet, View } from 'react-native';
import AppText from '../../../components/AppText';
import Button from '../../../components/Button';
import { SizeConfig } from '../../../utils/SizeConfig';
import { Colors } from '../../../utils/Colors';
import { Fonts } from '../../../utils/Fonts';

interface CartCardType {
  image: string;
  petName: string;
  breed: string;
  age: string;
  price: string;
  onDelete: () => void;
}

const CartCard = ({
  image,
  petName,
  breed,
  age,
  price,
  onDelete,
}: CartCardType) => {
  return (
    <View style={styles.cartItemContainer}>
      <View style={styles.row}>
        <Image source={{uri : image}} style={styles.cartImage} />

        <View style={styles.cartDetails}>
          <AppText numberOfLines={1} style={styles.itemName}>
            {petName}
          </AppText>
          <AppText numberOfLines={1} style={styles.itemDetail}>
            Breed: {breed}
          </AppText>
          <AppText numberOfLines={1} style={styles.itemDetail}>
            Age: {age}
          </AppText>
          <AppText numberOfLines={1} style={styles.itemDetail}>
            Price: ₹ {price}
          </AppText>
        </View>
      </View>

      <Button
        buttonText="Delete"
        onPress={onDelete}
        touchableOpacityStyle={styles.deleteBtn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cartItemContainer: {
    backgroundColor: Colors.btnLightBackground,
    padding: SizeConfig.width * 4,
    borderRadius: SizeConfig.width * 5,
    marginBottom: SizeConfig.height * 2,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SizeConfig.height * 2,
  },

  cartImage: {
    width: SizeConfig.width * 20,
    height: SizeConfig.width * 20,
    borderRadius: SizeConfig.width * 5,
    resizeMode: 'cover',
    marginRight: SizeConfig.width * 4,
  },

  cartDetails: {
    flex: 1,
    justifyContent: 'center',
  },

  itemName: {
    fontFamily: Fonts.semiBold,
    fontSize: SizeConfig.fontSize * 4,
    color: Colors.textColor,
    marginBottom: SizeConfig.height * 0.5,
    width: '100%',
  },

  itemDetail: {
    fontSize: SizeConfig.fontSize * 3.5,
    color: Colors.textColor,
    marginBottom: SizeConfig.height * 0.3,
     width: '100%',
  },

  deleteBtn: {
    backgroundColor: Colors.danger,
    width: '100%',
    paddingVertical: SizeConfig.height * 1.5,
    borderRadius: SizeConfig.width * 3,
  },
});

export default CartCard;
