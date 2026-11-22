import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface ProductDetailScreenProps {
  onBack?: () => void;
  onAddToCart?: (qty: number) => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  onBack,
  onAddToCart,
}) => {
  const insets = useSafeAreaInsets();
  const [quantity, setQuantity] = useState<number>(0);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const features = [
    'Organic cotton cover',
    'Natural buckwheat hull filling',
    'Ergonomic design',
    'Machine washable cover',
    'Eco-friendly materials',
  ];

  const dummyReviews = [
    {
      id: '1',
      name: 'Dr. Arshia',
      time: '2 Days ago',
      rating: '4.6',
      comment:
        'Perfect for my daily meditation practice. Very comfortable and well-made!',
      avatarBg: '#8A2BE2',
    },
    {
      id: '2',
      name: 'Dr. Arshia',
      time: '2 Days ago',
      rating: '4.6',
      comment:
        'Perfect for my daily meditation practice. Very comfortable and well-made!',
      avatarBg: '#5B4EB5',
    },
  ];

  const topPadding =
    (Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : (insets.top || 20)) + 6;

  return (
    <View style={styles.rootContainer}>
      <StatusBar barStyle="dark-content" />

      {/* Main Scrollable Content */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* TOP PRODUCT HERO BANNER (Warm Peach/Ivory Curved Area) */}
        <View style={[styles.heroBanner, { paddingTop: topPadding }]}>
          {/* Header Row: Back on left, Favorite & Share on right */}
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.circleButton}
              onPress={onBack}
              activeOpacity={0.75}
            >
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>

            <View style={styles.headerRightActions}>
              <TouchableOpacity
                style={styles.circleButton}
                activeOpacity={0.75}
                onPress={() => setIsFavorite(!isFavorite)}
              >
                <Text style={styles.heartIcon}>{isFavorite ? '♥' : '♡'}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.circleButton, { marginLeft: 10 }]}
                activeOpacity={0.75}
              >
                <Text style={styles.shareIcon}>➦</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Product Center Image */}
          <View style={styles.imageWrapper}>
            <Image
              source={require('../../assets/product_bottle.png')}
              style={styles.productImage}
              resizeMode="contain"
            />
          </View>

          {/* Floating Rating Badge at Bottom Right of Hero Banner */}
          <View style={styles.ratingBadgeContainer}>
            <View style={styles.ratingPill}>
              <Text style={styles.starIcon}>★</Text>
              <Text style={styles.ratingNumber}>4.6</Text>
            </View>
            <Text style={styles.reviewCountLabel}>234 Review</Text>
          </View>
        </View>

        {/* PRODUCT DETAILS BODY */}
        <View style={styles.bodySection}>
          <Text style={styles.productTitle}>Aromatherapy Diffuser</Text>
          <Text style={styles.productSubtitle}>Essential Oil for relaxation</Text>

          {/* Price & Savings Row */}
          <View style={styles.priceRow}>
            <Text style={styles.priceMain}>$39.99</Text>
            <Text style={styles.priceOld}>$39.99</Text>
            <View style={styles.saveBadge}>
              <Text style={styles.saveBadgeText}>Save $10.00</Text>
            </View>
          </View>

          {/* Stock Notice */}
          <View style={styles.stockBadge}>
            <Text style={styles.stockBadgeText}>
              In Stock · Ships in 2-3 business days
            </Text>
          </View>

          {/* Dotted Divider */}
          <View style={styles.dottedDivider} />

          {/* Description */}
          <View style={styles.infoBlock}>
            <Text style={styles.blockTitle}>Description</Text>
            <Text style={styles.paragraphText}>
              Premium hand-crafted meditation cushion filled with natural
              buckwheat hulls. Provides optimal support for extended
              meditation sessions. Removable, washable cover made from organic
              cotton.
            </Text>
          </View>

          {/* Features */}
          <View style={styles.infoBlock}>
            <Text style={styles.blockTitle}>Features</Text>
            {features.map((feat, idx) => (
              <View key={idx} style={styles.featureRow}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={styles.featureText}>{feat}</Text>
              </View>
            ))}
          </View>

          {/* Seller Information */}
          <View style={styles.infoBlock}>
            <Text style={styles.blockTitle}>Seller Information</Text>
            <View style={styles.sellerCard}>
              <View style={styles.sellerLeft}>
                <Image
                  source={require('../../assets/doctor_avatar.png')}
                  style={styles.sellerAvatar}
                />
                <View style={styles.sellerMeta}>
                  <Text style={styles.sellerName}>Zen Wellness Store</Text>
                  <View style={styles.sellerRatingRow}>
                    <Text style={styles.sellerStar}>★</Text>
                    <Text style={styles.sellerRatingNum}>4.6</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.visitButton} activeOpacity={0.8}>
                <Text style={styles.visitButtonText}>Visit</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Reviews Section */}
          <View style={styles.infoBlock}>
            <View style={styles.reviewsHeaderRow}>
              <Text style={styles.blockTitle}>Reviews</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>

            {/* Dummy Review Cards */}
            {dummyReviews.map((rev) => (
              <View key={rev.id} style={styles.reviewCard}>
                <View style={styles.reviewCardHeader}>
                  <View style={styles.reviewerInfo}>
                    <View
                      style={[
                        styles.reviewerAvatar,
                        { backgroundColor: rev.avatarBg },
                      ]}
                    >
                      <Text style={styles.reviewerInitial}>
                        {rev.name.charAt(0)}
                      </Text>
                    </View>
                    <View style={styles.reviewerMeta}>
                      <Text style={styles.reviewerName}>{rev.name}</Text>
                      <Text style={styles.reviewTime}>{rev.time}</Text>
                    </View>
                  </View>

                  <View style={styles.reviewStarRow}>
                    <Text style={styles.sellerStar}>★</Text>
                    <Text style={styles.reviewStarNum}>{rev.rating}</Text>
                  </View>
                </View>

                <Text style={styles.reviewComment}>{rev.comment}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* STICKY BOTTOM ACTION BAR */}
      <View
        style={[
          styles.bottomActionBar,
          { paddingBottom: Math.max(insets.bottom, 14) + 6 },
        ]}
      >
        {/* Quantity Stepper */}
        <View style={styles.quantityStepper}>
          <TouchableOpacity
            style={styles.stepBtn}
            onPress={() => setQuantity((prev) => (prev > 0 ? prev - 1 : 0))}
            activeOpacity={0.7}
          >
            <Text style={styles.stepBtnText}>−</Text>
          </TouchableOpacity>

          <Text style={styles.qtyText}>{quantity}</Text>

          <TouchableOpacity
            style={styles.stepBtn}
            onPress={() => setQuantity((prev) => prev + 1)}
            activeOpacity={0.7}
          >
            <Text style={styles.stepBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity
          style={styles.addToCartBtn}
          activeOpacity={0.85}
          onPress={() => onAddToCart && onAddToCart(quantity || 1)}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  heroBanner: {
    width: '100%',
    backgroundColor: '#FFF7EC',
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    paddingHorizontal: 20,
    paddingBottom: 24,
    position: 'relative',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  circleButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4A3468',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  backArrow: {
    fontSize: 22,
    color: '#1E1638',
    fontWeight: '600',
    marginTop: -2,
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartIcon: {
    fontSize: 20,
    color: '#1E1638',
  },
  shareIcon: {
    fontSize: 18,
    color: '#1E1638',
  },
  imageWrapper: {
    width: '100%',
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  productImage: {
    width: width * 0.58,
    height: 210,
  },
  ratingBadgeContainer: {
    position: 'absolute',
    bottom: 16,
    right: 20,
    alignItems: 'flex-end',
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  starIcon: {
    color: '#FBBF24',
    fontSize: 13,
    marginRight: 4,
  },
  ratingNumber: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E1638',
  },
  reviewCountLabel: {
    fontSize: 11.5,
    color: '#7E7893',
    marginTop: 4,
    fontWeight: '500',
  },
  bodySection: {
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  productTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: '#1E1638',
    letterSpacing: 0.2,
  },
  productSubtitle: {
    fontSize: 13.5,
    color: '#7E7893',
    marginTop: 4,
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceMain: {
    fontSize: 24,
    fontWeight: '700',
    color: '#8447C7',
    marginRight: 10,
  },
  priceOld: {
    fontSize: 15,
    color: '#9E98AB',
    textDecorationLine: 'line-through',
    marginRight: 12,
  },
  saveBadge: {
    backgroundColor: '#EAF8EE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  saveBadgeText: {
    color: '#22C55E',
    fontWeight: '700',
    fontSize: 12,
  },
  stockBadge: {
    backgroundColor: '#F5F9F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  stockBadgeText: {
    color: '#5C6B61',
    fontSize: 12,
    fontWeight: '500',
  },
  dottedDivider: {
    height: 1,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ECE8F2',
    borderStyle: 'dashed',
    marginVertical: 14,
  },
  infoBlock: {
    marginBottom: 18,
  },
  blockTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1638',
    marginBottom: 8,
  },
  paragraphText: {
    fontSize: 13,
    color: '#686278',
    lineHeight: 20,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 2,
    paddingLeft: 4,
  },
  featureBullet: {
    fontSize: 14,
    color: '#686278',
    marginRight: 8,
    lineHeight: 20,
  },
  featureText: {
    fontSize: 13,
    color: '#686278',
    lineHeight: 20,
  },
  sellerCard: {
    backgroundColor: '#F7F0FE',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  sellerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E5D1FB',
  },
  sellerMeta: {
    marginLeft: 12,
  },
  sellerName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E1638',
    marginBottom: 3,
  },
  sellerRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerStar: {
    color: '#FBBF24',
    fontSize: 11,
    marginRight: 3,
  },
  sellerRatingNum: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7E7893',
  },
  visitButton: {
    backgroundColor: '#8447C7',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  visitButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  reviewsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  viewAllText: {
    fontSize: 13,
    color: '#8447C7',
    fontWeight: '600',
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F0EAF8',
    padding: 14,
    marginBottom: 10,
  },
  reviewCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewerAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewerInitial: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  reviewerMeta: {
    marginLeft: 10,
  },
  reviewerName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E1638',
  },
  reviewTime: {
    fontSize: 11,
    color: '#9E98AB',
  },
  reviewStarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewStarNum: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7E7893',
  },
  reviewComment: {
    fontSize: 12.5,
    color: '#686278',
    lineHeight: 18,
  },
  bottomActionBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#F2EEF8',
    paddingHorizontal: 20,
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityStepper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F3EEF8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnText: {
    fontSize: 18,
    color: '#1E1638',
    fontWeight: '600',
    marginTop: -2,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1638',
    marginHorizontal: 14,
  },
  addToCartBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#8447C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 18,
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
