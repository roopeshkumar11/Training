import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const C = {
  primary: '#00a896',
  primaryLight: '#e6f7f5',
  primarySoft: '#f0fbfa',
  textDark: '#1a202c',
  textMuted: '#718096',
  border: '#e2e8f0',
  white: '#ffffff',
  error: '#ef4444',
};

type InputFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'number-pad';
  error?: string;
  icon: string;
  maxLength?: number;
};

function CheckoutInputField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  error,
  icon,
  maxLength,
}: InputFieldProps) {
  return (
    <View style={styles.fieldWrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputRow, error ? styles.inputError : null]}>
        <Ionicons name={icon} size={18} color={error ? C.error : C.primary} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#a0aec0"
          keyboardType={keyboardType || 'default'}
          maxLength={maxLength}
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const CheckoutScreen = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  const totalPrice = route.params?.totalPrice ?? 0;

  // Form fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [landmark, setLandmark] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'upi'>('cod');

  // Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!phone.trim() || phone.length < 10) newErrors.phone = 'Enter valid 10-digit phone';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Enter valid email';
    if (!address.trim()) newErrors.address = 'Address is required';
    if (!city.trim()) newErrors.city = 'City is required';
    if (!state.trim()) newErrors.state = 'State is required';
    if (!pincode.trim() || pincode.length < 6) newErrors.pincode = 'Enter valid 6-digit pincode';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validate()) return;
    Alert.alert(
      '🎉 Order Placed Successfully!',
      `Thank you, ${fullName}!\n\nYour order of ₹${totalPrice.toFixed(2)} will be delivered to:\n${address}, ${city}, ${state} - ${pincode}\n\nPayment: ${paymentMethod.toUpperCase()}`,
      [
        {
          text: 'Continue Shopping',
          onPress: () => navigation.navigate('MainTabs'),
        },
      ],
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#1a202c" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingBottom: 120 + insets.bottom }]}
          showsVerticalScrollIndicator={false}>
          {/* Order Summary Card */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Ionicons name="receipt-outline" size={20} color={C.primary} />
              <Text style={styles.summaryTitle}>Order Summary</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>₹{totalPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Charge</Text>
              <Text style={styles.freeText}>FREE</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalAmount}>₹{totalPrice.toFixed(2)}</Text>
            </View>
          </View>

          {/* Delivery Address Section */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Ionicons name="location" size={20} color={C.primary} />
              <Text style={styles.sectionTitle}>Delivery Address</Text>
            </View>

            <CheckoutInputField
              label="Full Name *"
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your full name"
              icon="person-outline"
              error={errors.fullName}
            />
            <CheckoutInputField
              label="Phone Number *"
              value={phone}
              onChangeText={setPhone}
              placeholder="10-digit mobile number"
              keyboardType="phone-pad"
              icon="call-outline"
              error={errors.phone}
              maxLength={10}
            />
            <CheckoutInputField
              label="Email Address *"
              value={email}
              onChangeText={setEmail}
              placeholder="yourname@email.com"
              keyboardType="email-address"
              icon="mail-outline"
              error={errors.email}
            />
            <CheckoutInputField
              label="House / Flat / Street Address *"
              value={address}
              onChangeText={setAddress}
              placeholder="Building, Street, Area"
              icon="home-outline"
              error={errors.address}
            />
            <CheckoutInputField
              label="Landmark (Optional)"
              value={landmark}
              onChangeText={setLandmark}
              placeholder="Near school, mall, etc."
              icon="map-outline"
            />

            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <CheckoutInputField
                  label="City *"
                  value={city}
                  onChangeText={setCity}
                  placeholder="City"
                  icon="business-outline"
                  error={errors.city}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 8 }}>
                <CheckoutInputField
                  label="State *"
                  value={state}
                  onChangeText={setState}
                  placeholder="State"
                  icon="flag-outline"
                  error={errors.state}
                />
              </View>
            </View>

            <CheckoutInputField
              label="Pincode *"
              value={pincode}
              onChangeText={setPincode}
              placeholder="6-digit pincode"
              keyboardType="number-pad"
              icon="barcode-outline"
              error={errors.pincode}
              maxLength={6}
            />
          </View>

          {/* Payment Method */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Ionicons name="card" size={20} color={C.primary} />
              <Text style={styles.sectionTitle}>Payment Method</Text>
            </View>

            {[
              { key: 'cod', label: 'Cash on Delivery', icon: 'cash-outline', desc: 'Pay when order arrives' },
              { key: 'card', label: 'Credit / Debit Card', icon: 'card-outline', desc: 'Visa, MasterCard, RuPay' },
              { key: 'upi', label: 'UPI / Wallet', icon: 'phone-portrait-outline', desc: 'GPay, PhonePe, Paytm' },
            ].map(opt => (
              <TouchableOpacity
                key={opt.key}
                style={[styles.paymentOption, paymentMethod === opt.key && styles.paymentSelected]}
                onPress={() => setPaymentMethod(opt.key as any)}
                activeOpacity={0.8}>
                <View style={styles.paymentLeft}>
                  <View style={[styles.paymentIconCircle, paymentMethod === opt.key && styles.paymentIconCircleActive]}>
                    <Ionicons name={opt.icon} size={20} color={paymentMethod === opt.key ? '#fff' : C.primary} />
                  </View>
                  <View>
                    <Text style={[styles.paymentLabel, paymentMethod === opt.key && styles.paymentLabelActive]}>
                      {opt.label}
                    </Text>
                    <Text style={styles.paymentDesc}>{opt.desc}</Text>
                  </View>
                </View>
                <View style={[styles.radioCircle, paymentMethod === opt.key && styles.radioFilled]}>
                  {paymentMethod === opt.key && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>

        </ScrollView>

        {/* Place Order Button */}
        <View style={[styles.footer, { paddingBottom: 14 + insets.bottom }] }>
          <View>
            <Text style={styles.footerLabel}>Total Payable</Text>
            <Text style={styles.footerAmount}>₹{totalPrice.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.placeOrderBtn} onPress={handlePlaceOrder} activeOpacity={0.85}>
            <Ionicons name="checkmark-circle-outline" size={20} color="#fff" style={{ marginRight: 6 }} />
            <Text style={styles.placeOrderText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6fb' },
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
    elevation: 2,
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1a202c' },
  scroll: { padding: 16 },

  // Summary Card
  summaryCard: {
    backgroundColor: C.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
    shadowColor: C.primary,
    shadowOpacity: 0.07,
    shadowRadius: 8,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 4 },
  summaryTitle: { fontSize: 16, fontWeight: 'bold', color: '#1a202c', marginLeft: 8 },
  summaryLabel: { fontSize: 14, color: '#718096' },
  summaryValue: { fontSize: 14, fontWeight: '600', color: '#1a202c' },
  freeText: { fontSize: 14, fontWeight: 'bold', color: '#10b981' },
  summaryDivider: { height: 1, backgroundColor: '#edf2f7', marginVertical: 8 },
  totalLabel: { fontSize: 15, fontWeight: 'bold', color: '#1a202c' },
  totalAmount: { fontSize: 18, fontWeight: 'bold', color: C.primary },

  // Section Card
  sectionCard: {
    backgroundColor: C.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1a202c', marginLeft: 8 },

  // Input Field
  fieldWrapper: { marginBottom: 12 },
  label: { fontSize: 13, fontWeight: '600', color: '#4a5568', marginBottom: 6 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f8fc',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: C.border,
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  inputError: { borderColor: '#ef4444', backgroundColor: '#fff5f5' },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, fontSize: 14, color: '#1a202c', paddingVertical: 10 },
  errorText: { fontSize: 11, color: '#ef4444', marginTop: 3, marginLeft: 4 },
  row: { flexDirection: 'row' },

  // Payment
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: C.border,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#f7f8fc',
  },
  paymentSelected: { borderColor: C.primary, backgroundColor: C.primarySoft },
  paymentLeft: { flexDirection: 'row', alignItems: 'center' },
  paymentIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: C.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentIconCircleActive: { backgroundColor: C.primary },
  paymentLabel: { fontSize: 14, fontWeight: '600', color: '#4a5568' },
  paymentLabelActive: { color: C.primary },
  paymentDesc: { fontSize: 11, color: '#a0aec0', marginTop: 2 },
  radioCircle: {
    width: 20, height: 20, borderRadius: 10,
    borderWidth: 2, borderColor: '#cbd5e0',
    justifyContent: 'center', alignItems: 'center',
  },
  radioFilled: { borderColor: C.primary },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: C.primary },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: C.white,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#edf2f7',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  footerLabel: { fontSize: 12, color: '#718096' },
  footerAmount: { fontSize: 20, fontWeight: 'bold', color: C.primary },
  placeOrderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.primary,
    paddingVertical: 13,
    paddingHorizontal: 24,
    borderRadius: 25,
    elevation: 3,
  },
  placeOrderText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
});

export default CheckoutScreen;
