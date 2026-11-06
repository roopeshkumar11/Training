import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CartItem {
  id: number;
  name: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
}

const CartScreen = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();

  // Initial cart items ko empty rakha hai (koi fake items nahi)
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // ProductDetails screen se naya item add hone par cart update karna
  useEffect(() => {
    if (route.params?.newItem) {
      const newItem = route.params.newItem;
      setCartItems(prev => {
        const existingIndex = prev.findIndex(item => item.id === newItem.id);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex].quantity += newItem.quantity;
          return updated;
        }
        return [...prev, newItem];
      });
    }
  }, [route.params?.newItem]);

  // Quantity increase
  const increaseQty = (id: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  // Quantity decrease ya remove
  const decreaseQty = (id: number) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter(item => item.quantity > 0),
    );
  };

  // Item poora remove karna
  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Total Price calculation
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#1a202c" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Cart Content: Empty State vs Items List */}
      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color="#cbd5e1" style={styles.emptyIcon} />
          <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
          <Text style={styles.emptySubtitle}>
            Looks like you haven't added anything to your cart yet.
          </Text>
          <TouchableOpacity
            style={styles.shopNowBtn}
            onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}>
            <Text style={styles.shopNowBtnText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* Cart Items List */}
          <ScrollView contentContainerStyle={styles.listContent}>
            {cartItems.map(item => (
              <View key={item.id} style={styles.card}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.cardImage}
                  resizeMode="contain"
                />

                <View style={styles.cardInfo}>
                  <Text style={styles.itemName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.itemMeta}>
                    Size: {item.size}   Color: {item.color}
                  </Text>
                  <Text style={styles.itemPrice}>₹{item.price}</Text>
                </View>

                {/* Counter */}
                <View style={styles.counterBox}>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => decreaseQty(item.id)}>
                    <Ionicons name="remove" size={16} color="#4a5568" />
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => increaseQty(item.id)}>
                    <Ionicons name="add" size={16} color="#4a5568" />
                  </TouchableOpacity>
                </View>

                {/* Delete button */}
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => removeItem(item.id)}>
                  <Ionicons name="trash-outline" size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          {/* Checkout Section at Bottom */}
          <View style={[styles.checkoutSection, { paddingBottom: 14 + insets.bottom }] }>
            <View>
              <Text style={styles.totalLabel}>Total price</Text>
              <Text style={styles.totalAmount}>₹{totalPrice.toFixed(2)}</Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() =>
                navigation.navigate('Checkout', { totalPrice })
              }>
              <Text style={styles.checkoutBtnText}>🛒 Buy Now</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 45,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#edf2f7',
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a202c',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  shopNowBtn: {
    backgroundColor: '#00a896',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 25,
    elevation: 2,
  },
  shopNowBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 16,
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  cardImage: {
    width: 65,
    height: 65,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
  },
  cardInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a202c',
  },
  itemMeta: {
    fontSize: 12,
    color: '#718096',
    marginVertical: 4,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a202c',
  },
  counterBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7fafc',
    borderRadius: 15,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#edf2f7',
  },
  qtyBtn: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    color: '#1a202c',
  },
  deleteBtn: {
    marginLeft: 10,
    padding: 6,
  },
  checkoutSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  totalLabel: {
    fontSize: 12,
    color: '#718096',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a202c',
  },
  checkoutBtn: {
    backgroundColor: '#00a896',
    paddingVertical: 12,
    paddingHorizontal: 36,
    borderRadius: 24,
  },
  checkoutBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default CartScreen;
