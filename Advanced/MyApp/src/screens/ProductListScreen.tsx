import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CATEGORIES = ['All Sneakers', 'Running', 'Originals', 'Basketball'];

interface ProductListScreenProps {
  onSelectProduct: (product: Product) => void;
}

// Individual animated product card component
const ProductCard: React.FC<{
  product: Product;
  onPress: () => void;
}> = ({ product, onPress }) => {
  const scale = useSharedValue(1);

  const cardAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 14, stiffness: 220 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 14, stiffness: 220 });
  };

  return (
    <Animated.View style={[styles.cardContainer, cardAnimatedStyle]}>
      <TouchableOpacity
        activeOpacity={0.94}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={styles.cardTouchable}
      >
        {/* Product Image Box */}
        <View style={styles.imageWrapper}>
          <Animated.Image
            source={{ uri: product.image }}
            style={styles.cardImage}
            resizeMode="cover"
            sharedTransitionTag={`product-image-${product.id}`}
          />

          {/* Minimalist Rating Pill */}
          <View style={styles.ratingBadge}>
            <Text style={styles.starText}>★</Text>
            <Text style={styles.ratingValueText}>{product.rating}</Text>
          </View>

          {/* Minimalist Exclusive Pill */}
          <View style={styles.exclusiveBadge}>
            <Text style={styles.exclusiveBadgeText}>EDITION</Text>
          </View>
        </View>

        {/* Card Content */}
        <View style={styles.cardContent}>
          <View style={styles.cardMetaRow}>
            <Text style={styles.brandText}>{product.brand.toUpperCase()}</Text>
            <Text style={styles.reviewsText}>{product.reviewsCount} reviews</Text>
          </View>

          <Text style={styles.nameText} numberOfLines={1}>
            {product.name}
          </Text>

          <View style={styles.cardFooter}>
            <View>
              <Text style={styles.priceLabel}>PRICE</Text>
              <Text style={styles.priceText}>${product.price.toFixed(2)}</Text>
            </View>

            <View style={styles.viewButton}>
              <Text style={styles.viewButtonText}>View Details →</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export const ProductListScreen: React.FC<ProductListScreenProps> = ({
  onSelectProduct,
}) => {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState<string>('All Sneakers');

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 16) }]}>
      {/* ----------------- TOP APP BAR ----------------- */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.brandTitleHeader}>COLLECTION</Text>
          <Text style={styles.screenTitle}>Featured Footwear</Text>
        </View>

        <TouchableOpacity style={styles.profileBadge} activeOpacity={0.8}>
          <Text style={styles.profileBadgeText}>03</Text>
        </TouchableOpacity>
      </View>

      {/* ----------------- CATEGORY PILLS (Professional Monochrome) ----------------- */}
      <View style={styles.categoryContainer}>
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <TouchableOpacity
              key={category}
              activeOpacity={0.8}
              onPress={() => setSelectedCategory(category)}
              style={[
                styles.categoryPill,
                isActive && styles.categoryPillActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  isActive && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ----------------- PRODUCT LIST ----------------- */}
      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => onSelectProduct(item)}
          />
        )}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: Math.max(insets.bottom + 20, 36) },
        ]}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0D0E', // Obsidian Matte
  },
  topBar: {
    paddingHorizontal: 22,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandTitleHeader: {
    fontSize: 11,
    color: '#8C9099',
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  screenTitle: {
    fontSize: 27,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 3,
    letterSpacing: -0.4,
  },
  profileBadge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#16181C',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#252830',
  },
  profileBadgeText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 22,
    paddingVertical: 10,
    gap: 10,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 24,
    backgroundColor: '#16181C',
    borderWidth: 1,
    borderColor: '#252830',
  },
  categoryPillActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8C9099',
    letterSpacing: 0.2,
  },
  categoryTextActive: {
    color: '#0C0D0E',
    fontWeight: '800',
  },
  listContent: {
    paddingHorizontal: 22,
    paddingTop: 12,
    gap: 22,
  },
  cardContainer: {
    borderRadius: 24,
    backgroundColor: '#16181C',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#23262D',
  },
  cardTouchable: {
    width: '100%',
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 230,
    backgroundColor: '#1D2026',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(12, 13, 14, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  starText: {
    fontSize: 12,
    color: '#F59E0B', // Elegant warm gold
    marginRight: 4,
  },
  ratingValueText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  exclusiveBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  exclusiveBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#0C0D0E',
    letterSpacing: 1,
  },
  cardContent: {
    padding: 20,
  },
  cardMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: '#8C9099',
  },
  reviewsText: {
    fontSize: 12,
    color: '#585C66',
  },
  nameText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 6,
    letterSpacing: -0.2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#20232A',
  },
  priceLabel: {
    fontSize: 10,
    color: '#585C66',
    fontWeight: '700',
    letterSpacing: 1,
  },
  priceText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 2,
  },
  viewButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
  },
  viewButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0C0D0E',
    letterSpacing: 0.2,
  },
});
