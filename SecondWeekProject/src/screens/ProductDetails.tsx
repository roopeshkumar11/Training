import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ProductDetailsScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();

  // API se aane wala real product data
  const product = route.params?.product || {
    title: 'Product Details',
    price: 99,
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'],
    description: 'High quality product from DummyJSON store.',
    rating: 4.5,
    brand: 'Generic',
    category: 'General',
    stock: 10,
    warrantyInformation: '1 Year Warranty',
    returnPolicy: '30 Days Return',
  };

  // State
  const [selectedImage, setSelectedImage] = useState<string>(
    product.thumbnail || (product.images && product.images[0]) || '',
  );
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <View style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top Product Image Container */}
        <View style={styles.imageContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#1a202c" />
          </TouchableOpacity>

          <Image
            source={{ uri: selectedImage }}
            style={styles.productImage}
            resizeMode="contain"
          />

          {/* Image Thumbnails Gallery (agar multiple images hon) */}
          {product.images && product.images.length > 1 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.galleryRow}>
              {product.images.map((imgUrl: string, idx: number) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => setSelectedImage(imgUrl)}
                  style={[
                    styles.galleryThumb,
                    selectedImage === imgUrl && styles.galleryThumbActive,
                  ]}>
                  <Image source={{ uri: imgUrl }} style={styles.thumbImage} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Content Box */}
        <View style={styles.detailsBox}>
          {/* Brand & Category Tag */}
          <View style={styles.tagRow}>
            {product.brand && (
              <View style={styles.brandBadge}>
                <Text style={styles.brandText}>{product.brand}</Text>
              </View>
            )}
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{product.category}</Text>
            </View>
            {product.rating && (
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={13} color="#d97706" style={{ marginRight: 3 }} />
                <Text style={styles.ratingBadgeText}>{product.rating}</Text>
              </View>
            )}
          </View>

          {/* Title */}
          <Text style={styles.title}>{product.title}</Text>

          {/* Price & Quantity Row */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>
              ₹{product.price}{' '}
              <Text style={styles.currencyText}>INR</Text>
            </Text>

            {/* Quantity Counter */}
            <View style={styles.counterBox}>
              <TouchableOpacity
                style={styles.counterBtn}
                onPress={() => setQuantity(prev => (prev > 1 ? prev - 1 : 1))}>
                <Ionicons name="remove" size={18} color="#1a202c" />
              </TouchableOpacity>
              <Text style={styles.quantityNumber}>{quantity}</Text>
              <TouchableOpacity
                style={styles.counterBtn}
                onPress={() => setQuantity(prev => prev + 1)}>
                <Ionicons name="add" size={18} color="#1a202c" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.sectionSubtitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>

          {/* Key Information from API */}
          <Text style={styles.sectionSubtitle}>Product Details</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoLine}>
              <Ionicons name="cube-outline" size={18} color="#00a896" style={styles.infoIcon} />
              <Text style={styles.infoText}>
                <Text style={styles.boldLabel}>Stock: </Text>
                {product.stock > 0 ? `${product.stock} items left` : 'Out of stock'}
              </Text>
            </View>

            {product.warrantyInformation && (
              <View style={styles.infoLine}>
                <Ionicons name="shield-checkmark-outline" size={18} color="#00a896" style={styles.infoIcon} />
                <Text style={styles.infoText}>
                  <Text style={styles.boldLabel}>Warranty: </Text>
                  {product.warrantyInformation}
                </Text>
              </View>
            )}

            {product.returnPolicy && (
              <View style={styles.infoLine}>
                <Ionicons name="swap-horizontal-outline" size={18} color="#00a896" style={styles.infoIcon} />
                <Text style={styles.infoText}>
                  <Text style={styles.boldLabel}>Return Policy: </Text>
                  {product.returnPolicy}
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Add to Cart Button */}
      <View style={[styles.bottomBar, { paddingBottom: 16 + insets.bottom }]}>
        <TouchableOpacity
          style={styles.addToCartBtn}
          onPress={() => {
            const newItem = {
              id: product.id || Date.now(),
              name: product.title,
              size: 'Standard',
              color: 'Default',
              price: product.price,
              quantity: quantity,
              image:
                product.thumbnail ||
                (product.images && product.images[0]) ||
                '',
            };
            Alert.alert(
              'Added to Cart!',
              `${quantity} x ${product.title} added to your cart.`,
              [
                { text: 'Keep Shopping', style: 'cancel' },
                {
                  text: 'View Cart',
                  onPress: () => navigation.navigate('Cart', { newItem }),
                },
              ],
            );
          }}>
          <Ionicons name="cart" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.addToCartText}>
            Add to Cart • ₹{(product.price * quantity).toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: 380,
    backgroundColor: '#f7fafc',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: '#ffffffdd',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  productImage: {
    width: '85%',
    height: '65%',
  },
  galleryRow: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  galleryThumb: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginRight: 10,
    padding: 3,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  galleryThumbActive: {
    borderColor: '#00a896',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  detailsBox: {
    padding: 20,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  brandBadge: {
    backgroundColor: '#e6fffa',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  brandText: {
    color: '#00a896',
    fontSize: 12,
    fontWeight: 'bold',
  },
  categoryBadge: {
    backgroundColor: '#edf2f7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  categoryText: {
    color: '#4a5568',
    fontSize: 12,
    fontWeight: '600',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingBadgeText: {
    color: '#d97706',
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  price: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a202c',
  },
  currencyText: {
    fontSize: 14,
    color: '#718096',
    fontWeight: 'normal',
  },
  counterBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7fafc',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  counterBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 1,
  },
  quantityNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 12,
    color: '#1a202c',
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
    marginTop: 14,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 22,
  },
  infoCard: {
    backgroundColor: '#f8f9fa',
    padding: 14,
    borderRadius: 12,
    marginTop: 4,
    marginBottom: 10,
  },
  infoLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoIcon: {
    marginRight: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#4a5568',
  },
  boldLabel: {
    fontWeight: 'bold',
    color: '#2d3748',
  },
  bottomBar: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  addToCartBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#00a896',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ProductDetailsScreen;
