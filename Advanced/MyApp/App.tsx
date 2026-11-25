import React, { useState } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { ProductListScreen } from './src/screens/ProductListScreen';
import { ProductDetailScreen } from './src/screens/ProductDetailScreen';
import { Product } from './src/types';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.root}>
        <StatusBar barStyle="light-content" />

        {/* 1. Main Product List Screen with Safe Area Support */}
        <ProductListScreen onSelectProduct={(product) => setSelectedProduct(product)} />

        {/* 2. Product Detail Screen (Smooth Transition & Safe Area) */}
        {selectedProduct && (
          <Animated.View
            entering={FadeIn.duration(220)}
            exiting={FadeOut.duration(200)}
            style={StyleSheet.absoluteFill}
          >
            <ProductDetailScreen
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          </Animated.View>
        )}
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0C0D0E', // Ultra-clean obsidian matte
  },
});
