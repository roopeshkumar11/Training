import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolation,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Product } from '../types';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const HEADER_HEIGHT = 410;

interface ProductDetailScreenProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  onClose,
}) => {
  const insets = useSafeAreaInsets();

  // ---------------------------------------------------------------------------
  // 1. STATE & ANIMATED VALUES (Shared Values)
  // ---------------------------------------------------------------------------
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[1] || product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  // Parallax scroll position:
  const scrollY = useSharedValue(0);

  // Swipe-down dismiss translation:
  const translateY = useSharedValue(0);

  // Image swipe gesture translation:
  const imageTranslateX = useSharedValue(0);

  // Spring animation values:
  const heartScale = useSharedValue(1);
  const cartButtonScale = useSharedValue(1);
  const quantityScale = useSharedValue(1);

  // Timing animation toast values:
  const toastTranslateY = useSharedValue(100);
  const toastOpacity = useSharedValue(0);

  // ---------------------------------------------------------------------------
  // 2. PARALLAX SCROLLING HANDLER
  // ---------------------------------------------------------------------------
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerImageAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [-150, 0],
      [1.45, 1],
      Extrapolation.CLAMP
    );

    const headerTranslateY = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT],
      [0, HEADER_HEIGHT * 0.45],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { translateY: headerTranslateY },
        { scale: scale },
      ],
    };
  });

  // ---------------------------------------------------------------------------
  // 3. GESTURE-BASED ANIMATIONS
  // ---------------------------------------------------------------------------
  const dismissPanGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationY > 0) {
        translateY.value = event.translationY;
      }
    })
    .onEnd((event) => {
      if (event.translationY > 120) {
        translateY.value = withTiming(SCREEN_HEIGHT, { duration: 240 }, () => {
          runOnJS(onClose)();
        });
      } else {
        translateY.value = withSpring(0, { damping: 18, stiffness: 120 });
      }
    });

  const imageSwipeGesture = Gesture.Pan()
    .onUpdate((event) => {
      imageTranslateX.value = event.translationX;
    })
    .onEnd(() => {
      imageTranslateX.value = withSpring(0, { damping: 14, stiffness: 110 });
    });

  const swipeableImageAnimatedStyle = useAnimatedStyle(() => {
    const rotateZ = `${interpolate(
      imageTranslateX.value,
      [-200, 200],
      [-10, 10],
      Extrapolation.CLAMP
    )}deg`;

    return {
      transform: [
        { translateX: imageTranslateX.value },
        { rotateZ: rotateZ },
      ],
    };
  });

  const screenAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateY.value,
      [0, SCREEN_HEIGHT / 2],
      [1, 0.93],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { translateY: translateY.value },
        { scale: scale },
      ],
    };
  });

  // ---------------------------------------------------------------------------
  // 4. SPRING & TIMING ACTIONS
  // ---------------------------------------------------------------------------
  const handleLikePress = () => {
    setIsLiked(!isLiked);
    heartScale.value = withSpring(1.5, { damping: 4, stiffness: 220 }, () => {
      heartScale.value = withSpring(1, { damping: 10, stiffness: 150 });
    });
  };

  const handleQuantityChange = (change: number) => {
    const newQty = Math.max(1, quantity + change);
    setQuantity(newQty);
    quantityScale.value = withSpring(1.2, { damping: 8 }, () => {
      quantityScale.value = withSpring(1, { damping: 12 });
    });
  };

  const handleAddToCart = () => {
    cartButtonScale.value = withSpring(0.93, { damping: 10 }, () => {
      cartButtonScale.value = withSpring(1, { damping: 12 });
    });

    setShowToast(true);
    toastTranslateY.value = withSpring(-30, { damping: 14 });
    toastOpacity.value = withTiming(1, { duration: 200 });

    setTimeout(() => {
      toastOpacity.value = withTiming(0, { duration: 280 });
      toastTranslateY.value = withTiming(100, { duration: 280 }, () => {
        runOnJS(setShowToast)(false);
      });
    }, 2000);
  };

  const heartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const cartButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cartButtonScale.value }],
  }));

  const quantityAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: quantityScale.value }],
  }));

  const toastAnimatedStyle = useAnimatedStyle(() => ({
    opacity: toastOpacity.value,
    transform: [{ translateY: toastTranslateY.value }],
  }));

  return (
    <Animated.View style={[styles.container, screenAnimatedStyle]}>
      <StatusBar barStyle="light-content" />

      {/* ----------------- TOP FLOATING BAR WITH SAFE AREA & GESTURE ----------------- */}
      <GestureDetector gesture={dismissPanGesture}>
        <View style={[styles.topFloatingBar, { top: Math.max(insets.top + 8, 20) }]}>
          {/* Back Button */}
          <TouchableOpacity
            style={styles.circleIconButton}
            activeOpacity={0.7}
            onPress={onClose}
          >
            <Text style={styles.iconArrow}>←</Text>
          </TouchableOpacity>

          {/* Swipe Indicator Pill */}
          <View style={styles.dragIndicatorContainer}>
            <View style={styles.dragIndicatorPill} />
            <Text style={styles.dragIndicatorLabel}>SWIPE DOWN TO CLOSE</Text>
          </View>

          {/* Like Heart Button */}
          <TouchableOpacity
            style={styles.circleIconButton}
            activeOpacity={0.7}
            onPress={handleLikePress}
          >
            <Animated.Text style={[styles.iconHeart, heartAnimatedStyle]}>
              {isLiked ? '❤️' : '🤍'}
            </Animated.Text>
          </TouchableOpacity>
        </View>
      </GestureDetector>

      {/* ----------------- PARALLAX SCROLLVIEW ----------------- */}
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Parallax Header Image */}
        <View style={styles.imageContainer}>
          <Animated.View style={headerImageAnimatedStyle}>
            <GestureDetector gesture={imageSwipeGesture}>
              <Animated.View style={swipeableImageAnimatedStyle}>
                <Animated.Image
                  source={{ uri: product.image }}
                  style={styles.headerImage}
                  resizeMode="cover"
                  sharedTransitionTag={`product-image-${product.id}`}
                />
              </Animated.View>
            </GestureDetector>
          </Animated.View>
        </View>

        {/* Product Details Bottom Sheet Card */}
        <View style={styles.detailsCard}>
          {/* Brand & Rating Bar */}
          <View style={styles.rowBetween}>
            <Text style={styles.brandText}>{product.brand.toUpperCase()}</Text>

            <View style={styles.ratingBadge}>
              <Text style={styles.starText}>★</Text>
              <Text style={styles.ratingNumber}>{product.rating}</Text>
              <Text style={styles.reviewsText}>({product.reviewsCount})</Text>
            </View>
          </View>

          {/* Product Title & Price */}
          <Text style={styles.titleText}>{product.name}</Text>
          <Text style={styles.priceText}>${product.price.toFixed(2)}</Text>

          {/* Minimalist Feature Highlights */}
          <View style={styles.featuresRow}>
            <View style={styles.featureItem}>
              <Text style={styles.featureTitle}>WEIGHT</Text>
              <Text style={styles.featureValue}>280g</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureTitle}>CUSHION</Text>
              <Text style={styles.featureValue}>Max Plush</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureTitle}>TERRAIN</Text>
              <Text style={styles.featureValue}>Road / Gym</Text>
            </View>
          </View>

          {/* Color Selector */}
          <Text style={styles.sectionHeading}>SELECT COLOR</Text>
          <View style={styles.colorRow}>
            {product.colors.map((color, index) => {
              const isSelected = selectedColor === color;
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => setSelectedColor(color)}
                  style={[
                    styles.colorCircleOuter,
                    isSelected && { borderColor: '#FFFFFF', transform: [{ scale: 1.1 }] },
                  ]}
                >
                  <View style={[styles.colorCircleInner, { backgroundColor: color }]} />
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Size Selector */}
          <Text style={styles.sectionHeading}>SELECT SIZE (US)</Text>
          <View style={styles.sizeRow}>
            {product.sizes.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <TouchableOpacity
                  key={size}
                  activeOpacity={0.8}
                  onPress={() => setSelectedSize(size)}
                  style={[
                    styles.sizeBox,
                    isSelected && styles.sizeBoxActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.sizeText,
                      isSelected && styles.sizeTextActive,
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Quantity Counter */}
          <Text style={styles.sectionHeading}>QUANTITY</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.qtyBtn}
              activeOpacity={0.7}
              onPress={() => handleQuantityChange(-1)}
            >
              <Text style={styles.qtyBtnText}>−</Text>
            </TouchableOpacity>

            <Animated.Text style={[styles.qtyNumber, quantityAnimatedStyle]}>
              {quantity}
            </Animated.Text>

            <TouchableOpacity
              style={styles.qtyBtn}
              activeOpacity={0.7}
              onPress={() => handleQuantityChange(1)}
            >
              <Text style={styles.qtyBtnText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Description */}
          <Text style={styles.sectionHeading}>PRODUCT STORY</Text>
          <Text style={styles.descriptionText}>{product.description}</Text>

          {/* Spacing for bottom bar + safe area */}
          <View style={{ height: Math.max(insets.bottom + 110, 140) }} />
        </View>
      </Animated.ScrollView>

      {/* ----------------- BOTTOM FLOATING BAR WITH SAFE AREA ----------------- */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom + 14, 24) },
        ]}
      >
        <View>
          <Text style={styles.bottomBarLabel}>TOTAL PRICE</Text>
          <Text style={styles.bottomBarPrice}>
            ${(product.price * quantity).toFixed(2)}
          </Text>
        </View>

        <Animated.View style={cartButtonAnimatedStyle}>
          <TouchableOpacity
            style={styles.addToCartBtn}
            activeOpacity={0.9}
            onPress={handleAddToCart}
          >
            <Text style={styles.addToCartText}>Add to Cart →</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* ----------------- FLOATING TOAST NOTIFICATION ----------------- */}
      {showToast && (
        <Animated.View
          style={[
            styles.toastContainer,
            toastAnimatedStyle,
            { bottom: Math.max(insets.bottom + 85, 100) },
          ]}
        >
          <Text style={styles.toastText}>✓ Added to your bag</Text>
        </Animated.View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0D0E',
  },
  topFloatingBar: {
    position: 'absolute',
    left: 20,
    right: 20,
    zIndex: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dragIndicatorContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(18, 19, 22, 0.85)',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#262932',
  },
  dragIndicatorPill: {
    width: 32,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 3,
  },
  dragIndicatorLabel: {
    fontSize: 9,
    color: '#8C9099',
    fontWeight: '800',
    letterSpacing: 1,
  },
  circleIconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(18, 19, 22, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#262932',
  },
  iconArrow: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  iconHeart: {
    fontSize: 18,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  imageContainer: {
    height: HEADER_HEIGHT,
    width: SCREEN_WIDTH,
    overflow: 'hidden',
    backgroundColor: '#16181C',
  },
  headerImage: {
    width: SCREEN_WIDTH,
    height: HEADER_HEIGHT,
  },
  detailsCard: {
    flex: 1,
    backgroundColor: '#121316',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -32,
    paddingHorizontal: 24,
    paddingTop: 28,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#22252C',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandText: {
    fontSize: 11,
    letterSpacing: 1.5,
    color: '#8C9099',
    fontWeight: '700',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1C22',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#262932',
  },
  starText: {
    fontSize: 12,
    color: '#F59E0B',
    marginRight: 4,
  },
  ratingNumber: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '800',
    marginRight: 4,
  },
  reviewsText: {
    fontSize: 12,
    color: '#585C66',
  },
  titleText: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 8,
    letterSpacing: -0.3,
  },
  priceText: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 6,
  },
  featuresRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  featureItem: {
    flex: 1,
    backgroundColor: '#1A1C22',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#262932',
  },
  featureTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#585C66',
    letterSpacing: 1,
  },
  featureValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 3,
  },
  sectionHeading: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: '#8C9099',
    marginTop: 26,
    marginBottom: 12,
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  colorCircleOuter: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorCircleInner: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  sizeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  sizeBox: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#1A1C22',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#262932',
  },
  sizeBoxActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  sizeText: {
    color: '#8C9099',
    fontWeight: '700',
    fontSize: 15,
  },
  sizeTextActive: {
    color: '#0C0D0E',
    fontWeight: '900',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1C22',
    alignSelf: 'flex-start',
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: '#262932',
  },
  qtyBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#232630',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  qtyNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginHorizontal: 16,
  },
  descriptionText: {
    fontSize: 14,
    color: '#8C9099',
    lineHeight: 22,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#121316',
    paddingHorizontal: 24,
    paddingTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#22252C',
  },
  bottomBarLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#585C66',
    letterSpacing: 1,
  },
  bottomBarPrice: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 2,
  },
  addToCartBtn: {
    backgroundColor: '#FFFFFF', // High-contrast Apple/Nike Luxury White Button
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 22,
  },
  addToCartText: {
    color: '#0C0D0E',
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 0.2,
  },
  toastContainer: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 12,
    zIndex: 99,
  },
  toastText: {
    color: '#0C0D0E',
    fontWeight: '800',
    fontSize: 14,
  },
});
