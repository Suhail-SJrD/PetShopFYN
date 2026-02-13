import {
  StatusBar,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../utils/Colors';
import Header from '../../components/Header';
import { SizeConfig } from '../../utils/SizeConfig';
import AppText from '../../components/AppText';
import Button from '../../components/Button';
import CartCard from './components/CartCard';
import usePetStore from '../../store/PetsStore';
import CustomToast from '../../components/CustomToast';

const Cart = () => {
  const wishlist = usePetStore(state => state.wishlist);
  const removeFromCart = usePetStore(s => s.removeFromWishlist);

  const totalPrice = wishlist.reduce((sum, pet) => sum + pet.price, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />

      <Header headerTitle="Your Cart" />

      <View style={styles.scrollContainer}>
        {wishlist.length === 0 ? (
          <AppText style={{ textAlign: 'center', marginTop: 40 }}>
            Cart is Empty 🐶
          </AppText>
        ) : (
          <FlatList
            data={wishlist}
            contentContainerStyle = {{paddingBottom : SizeConfig.height * 15}}
            renderItem={({ item }) => (
              <CartCard
                key={item.id}
                image={item.petImage}
                petName={item.petName}
                breed={item.breed}
                age={String(item.age)}
                price={String(item.price)}
                onDelete={() => removeFromCart(item.id)}
              />
            )}
            keyExtractor={item => item.id.toString()}
          />
        )}
      </View>

      <View style={styles.pricingContainer}>
        <AppText style={styles.pricingTitle}>Pricing Details</AppText>

        <View style={styles.pricingRow}>
          <AppText style={styles.pricingLabel}>Subtotal</AppText>
          <AppText style={styles.pricingValue}>₹{totalPrice}</AppText>
        </View>

        <View style={styles.pricingRow}>
          <AppText style={styles.pricingLabel}>Total Price</AppText>
          <AppText style={styles.pricingValue}>₹{totalPrice}</AppText>
        </View>

        <Button
          buttonText="Checkout"
          onPress={() => {
            if(totalPrice <= 0){
              CustomToast({type : 'error' , title : 'No Item Found' , description : 'Add Items in order to proceed further'})
            } else {
              CustomToast({type : 'success' , title : 'Order Placed' , description : 'Have fun with you pet!'})
            }
          }}
          touchableOpacityStyle={styles.checkoutBtn}
        />
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  scrollContainer: {
    paddingHorizontal: SizeConfig.width * 5,
    paddingTop: SizeConfig.height * 2,
    paddingBottom: SizeConfig.height * 20,
  },

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
    fontSize: SizeConfig.fontSize * 4,
    fontWeight: '600',
    color: Colors.textColor,
    marginBottom: SizeConfig.height * 0.5,
  },

  itemDetail: {
    fontSize: SizeConfig.fontSize * 3.5,
    color: Colors.textColor,
    marginBottom: SizeConfig.height * 0.3,
  },

  deleteBtn: {
    backgroundColor: Colors.danger,
    width: '100%',
    paddingVertical: SizeConfig.height * 1.5,
    borderRadius: SizeConfig.width * 3,
  },

  pricingContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: Colors.btnLightBackground,
    paddingHorizontal: SizeConfig.width * 5,
    paddingVertical: SizeConfig.height * 3,
    borderTopLeftRadius: SizeConfig.width * 5,
    borderTopRightRadius: SizeConfig.width * 5,
    gap: SizeConfig.height,
  },

  pricingTitle: {
    fontSize: SizeConfig.fontSize * 4,
    fontWeight: '600',
    marginBottom: SizeConfig.height,
    color: Colors.textColor,
  },

  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SizeConfig.height,
  },

  pricingLabel: {
    fontSize: SizeConfig.fontSize * 3.5,
    color: Colors.textColor,
  },

  pricingValue: {
    fontSize: SizeConfig.fontSize * 3.5,
    fontWeight: '600',
    color: Colors.textColor,
  },

  checkoutBtn: {
    marginTop: SizeConfig.height,
    width: '100%',
    paddingVertical: SizeConfig.height * 1.5,
    borderRadius: SizeConfig.width * 3,
  },
});
