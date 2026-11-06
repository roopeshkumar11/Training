import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

// Reusable Components
import ProductCard from '../components/ProductCard';

const BG_COLORS = ['#fef3c7', '#e2e8f0', '#dbeafe', '#fee2e2', '#e6fffa', '#ede9fe'];
const ITEMS_PER_PAGE = 8; // 2-column grid me 4 rows

const HomeScreen = ({ navigation, route }: any) => {
  // State variables
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Pagination states
  const [page, setPage] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  // ScrollView ref for smooth scrolling to top on page change
  const scrollRef = useRef<any>(null);
  const searchTimerRef = useRef<any>(null);

  // Total pages calculate karna
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE) || 1;

  // Helper: Current base URL get karna
  const getBaseUrl = (cat: string, search: string) => {
    if (search.trim() !== '') {
      return `https://dummyjson.com/products/search?q=${search.trim()}`;
    }
    if (cat !== 'all') {
      return `https://dummyjson.com/products/category/${cat}`;
    }
    return 'https://dummyjson.com/products';
  };

  // Helper: Fetch products with Pagination (limit & skip)
  const fetchProducts = (baseUrl: string, pageNum: number = 1) => {
    setLoading(true);
    const skip = (pageNum - 1) * ITEMS_PER_PAGE;
    const separator = baseUrl.includes('?') ? '&' : '?';
    const pagedUrl = `${baseUrl}${separator}limit=${ITEMS_PER_PAGE}&skip=${skip}`;

    fetch(pagedUrl)
      .then(res => res.json())
      .then(data => {
        if (data.products) {
          setProducts(data.products);
          setTotalProducts(data.total || 0);
          setPage(pageNum);
        }
        setLoading(false);
      })
      .catch(err => {
        console.log('Error fetching products:', err);
        setLoading(false);
      });
  };

  // Page change handler (Next / Previous button dabane par)
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    const baseUrl = getBaseUrl(selectedCategory, searchQuery);
    fetchProducts(baseUrl, newPage);

    // Page change hote hi products ke upar scroll karein
    scrollRef.current?.scrollTo({ y: 240, animated: true });
  };

  // Category select handler
  const handleCategorySelect = (category: string) => {
    setSearchQuery('');
    setSelectedCategory(category);
    setPage(1);
    const baseUrl = getBaseUrl(category, '');
    fetchProducts(baseUrl, 1);
  };

  // Search input handler with debounce
  const handleSearch = (text: string) => {
    setSearchQuery(text);

    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }

    if (text.trim() === '') {
      setSelectedCategory('all');
      setPage(1);
      fetchProducts('https://dummyjson.com/products', 1);
      return;
    }

    setIsSearching(true);
    searchTimerRef.current = setTimeout(() => {
      setPage(1);
      const url = `https://dummyjson.com/products/search?q=${text.trim()}&limit=${ITEMS_PER_PAGE}&skip=0`;
      fetch(url)
        .then(res => res.json())
        .then(data => {
          if (data.products) {
            setProducts(data.products);
            setTotalProducts(data.total || 0);
          }
          setIsSearching(false);
        })
        .catch(err => {
          console.log('Search error:', err);
          setIsSearching(false);
        });
    }, 400);
  };

  // Search clear handler
  const handleClearSearch = () => {
    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }
    setSearchQuery('');
    setSelectedCategory('all');
    setPage(1);
    fetchProducts('https://dummyjson.com/products', 1);
  };

  // Format clean name
  const formatName = (name: string) => {
    return name
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  };

  // Initial load
  useEffect(() => {
    // 1. Fetch categories
    fetch('https://dummyjson.com/products/category-list')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCategories(data);
        }
      })
      .catch(err => console.log('Error fetching categories:', err));

    // 2. Fetch initial products page 1
    fetchProducts('https://dummyjson.com/products', 1);

    return () => {
      if (searchTimerRef.current) {
        clearTimeout(searchTimerRef.current);
      }
    };
  }, []);

  // Category from Tab Navigation
  const categoryFromTab = route?.params?.categoryFromTab;
  useEffect(() => {
    if (categoryFromTab) {
      handleCategorySelect(categoryFromTab);
    }
  }, [categoryFromTab]);

  return (
    <View style={styles.mainContainer}>
      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
        {/* Top Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>E-Commerce</Text>

          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.navigate('Cart')}>
            <Ionicons name="cart-outline" size={26} color="#1a202c" />
          </TouchableOpacity>
        </View>

        {/* Enhanced Search Bar with Ionicons */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#718096" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products (phone, shoes, bag)..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={handleSearch}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
          />

          {isSearching ? (
            <ActivityIndicator size="small" color="#00a896" style={styles.searchLoader} />
          ) : searchQuery !== '' ? (
            <TouchableOpacity onPress={handleClearSearch} style={styles.clearBtn}>
              <Ionicons name="close-circle" size={18} color="#718096" />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Categories Section (Only when not searching) */}
        {searchQuery === '' && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Categories</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesRow}>
              {/* 'All' button */}
              <TouchableOpacity
                style={styles.categoryItem}
                onPress={() => handleCategorySelect('all')}>
                <View
                  style={[
                    styles.categoryCircle,
                    {
                      backgroundColor:
                        selectedCategory === 'all' ? '#00a896' : '#e2e8f0',
                    },
                  ]}>
                  <Ionicons
                    name="flame"
                    size={22}
                    color={selectedCategory === 'all' ? '#fff' : '#4a5568'}
                  />
                </View>
                <Text
                  style={[
                    styles.categoryName,
                    selectedCategory === 'all' && styles.categoryNameActive,
                  ]}>
                  All
                </Text>
              </TouchableOpacity>

              {categories.map((cat, index) => {
                const isSelected = selectedCategory === cat;
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.categoryItem}
                    onPress={() => handleCategorySelect(cat)}>
                    <View
                      style={[
                        styles.categoryCircle,
                        {
                          backgroundColor: isSelected
                            ? '#00a896'
                            : BG_COLORS[index % BG_COLORS.length],
                        },
                      ]}>
                      <Ionicons
                        name="pricetag-outline"
                        size={20}
                        color={isSelected ? '#fff' : '#2d3748'}
                      />
                    </View>
                    <Text
                      style={[
                        styles.categoryName,
                        isSelected && styles.categoryNameActive,
                      ]}
                      numberOfLines={1}>
                      {formatName(cat)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </>
        )}

        {/* Products Title & Info */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {searchQuery !== ''
              ? `Search: "${searchQuery}"`
              : selectedCategory === 'all'
              ? 'Featured Products'
              : `${formatName(selectedCategory)}`}
          </Text>
          <Text style={styles.totalBadgeText}>
            {totalProducts} products
          </Text>
        </View>

        {/* Loading Indicator */}
        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#00a896" />
            <Text style={styles.loadingText}>Loading page {page}...</Text>
          </View>
        ) : products.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons name="search" size={44} color="#94a3b8" />
            <Text style={styles.emptyTitle}>No products found</Text>
            <Text style={styles.emptySubtitle}>Try searching for something else</Text>
            <TouchableOpacity style={styles.resetBtn} onPress={handleClearSearch}>
              <Text style={styles.resetBtnText}>Clear Search</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Products Grid using Reusable ProductCard Component */}
            <View style={styles.productGrid}>
              {products.map(item => (
                <ProductCard
                  key={item.id}
                  product={item}
                  onPress={() =>
                    navigation.navigate('ProductDetails', { product: item })
                  }
                />
              ))}
            </View>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <View style={styles.paginationContainer}>
                {/* Previous Button */}
                <TouchableOpacity
                  style={[
                    styles.pageBtn,
                    page === 1 && styles.pageBtnDisabled,
                  ]}
                  disabled={page === 1}
                  onPress={() => handlePageChange(page - 1)}>
                  <Ionicons
                    name="chevron-back"
                    size={16}
                    color={page === 1 ? '#94a3b8' : '#fff'}
                  />
                  <Text
                    style={[
                      styles.pageBtnText,
                      page === 1 && styles.pageBtnTextDisabled,
                    ]}>
                    Prev
                  </Text>
                </TouchableOpacity>

                {/* Page Indicator */}
                <View style={styles.pageIndicatorBox}>
                  <Text style={styles.pageNumberText}>
                    Page <Text style={styles.boldPageText}>{page}</Text> of{' '}
                    <Text style={styles.boldPageText}>{totalPages}</Text>
                  </Text>
                </View>

                {/* Next Button */}
                <TouchableOpacity
                  style={[
                    styles.pageBtn,
                    page >= totalPages && styles.pageBtnDisabled,
                  ]}
                  disabled={page >= totalPages}
                  onPress={() => handlePageChange(page + 1)}>
                  <Text
                    style={[
                      styles.pageBtnText,
                      page >= totalPages && styles.pageBtnTextDisabled,
                    ]}>
                    Next
                  </Text>
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={page >= totalPages ? '#94a3b8' : '#fff'}
                  />
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 45,
    paddingBottom: 15,
  },
  iconBtn: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a202c',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f5',
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 25,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1a202c',
    paddingVertical: 8,
  },
  searchLoader: {
    marginLeft: 8,
  },
  clearBtn: {
    padding: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 18,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a202c',
  },
  totalBadgeText: {
    fontSize: 12,
    color: '#718096',
    fontWeight: '600',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoriesRow: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 70,
  },
  categoryCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryName: {
    fontSize: 12,
    color: '#4a5568',
    fontWeight: '500',
    textAlign: 'center',
  },
  categoryNameActive: {
    color: '#00a896',
    fontWeight: 'bold',
  },
  loadingBox: {
    paddingVertical: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#718096',
  },
  emptyBox: {
    paddingVertical: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
    marginTop: 12,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 16,
  },
  resetBtn: {
    backgroundColor: '#00a896',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  resetBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginBottom: 15,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  pageBtn: {
    flexDirection: 'row',
    backgroundColor: '#00a896',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    minWidth: 85,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageBtnDisabled: {
    backgroundColor: '#e2e8f0',
  },
  pageBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 4,
  },
  pageBtnTextDisabled: {
    color: '#94a3b8',
  },
  pageIndicatorBox: {
    alignItems: 'center',
  },
  pageNumberText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  boldPageText: {
    fontWeight: 'bold',
    color: '#0f172a',
  },
});

export default HomeScreen;
