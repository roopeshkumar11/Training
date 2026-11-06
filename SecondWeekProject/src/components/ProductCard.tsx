import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    discountPercentage?: number;
    rating?: number;
    [key: string]: any;
  };
  onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {/* Product Image Container */}
      <View style={styles.imageWrapper}>
        {product.discountPercentage ? (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              {Math.round(product.discountPercentage)}% OFF
            </Text>
          </View>
        ) : null}

        <Image
          source={{ uri: product.thumbnail }}
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>

      {/* Product Title */}
      <Text style={styles.productName} numberOfLines={1}>
        {product.title}
      </Text>

      {/* Price & Rating with Ionicons */}
      <View style={styles.priceRatingRow}>
        <Text style={styles.productPrice}>₹{product.price}</Text>
        {product.rating ? (
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={13} color="#f59e0b" style={styles.starIcon} />
            <Text style={styles.ratingText}>{product.rating}</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  imageWrapper: {
    width: '100%',
    height: 155,
    borderRadius: 16,
    backgroundColor: '#f7fafc',
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#edf2f7',
  },
  productImage: {
    width: '85%',
    height: '85%',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#e53e3e',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    zIndex: 2,
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d3748',
    marginTop: 8,
  },
  priceRatingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a202c',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginRight: 2,
  },
  ratingText: {
    fontSize: 12,
    color: '#f59e0b',
    fontWeight: 'bold',
  },
});

export default ProductCard;
