import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ─── App Color Palette (same as Login) ───────────────────
const C = {
  primary:      '#00a896',
  primaryLight: '#e6f7f5',
  white:        '#ffffff',
  text:         '#1a2e2d',
  textMuted:    '#6b8f8d',
  border:       '#b2d8d4',
  error:        '#ef4444',
  errorBg:      '#fff5f5',
};

const SignupScreen = () => {
  const [name, setName]                   = useState('');
  const [email, setEmail]                 = useState('');
  const [password, setPassword]           = useState('');
  const [confirmPwd, setConfirmPwd]       = useState('');
  const [showPwd, setShowPwd]             = useState(false);
  const [showConfirm, setShowConfirm]     = useState(false);
  const [loading, setLoading]             = useState(false);
  const [errors, setErrors]               = useState<Record<string, string>>({});
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const clearErr = (key: string) => setErrors(p => ({ ...p, [key]: '' }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim())             e.name        = 'Full name is required';
    if (!email.trim())            e.email       = 'Email is required';
    else if (!email.includes('@')) e.email      = 'Enter a valid email';
    if (!password.trim())         e.password    = 'Password is required';
    else if (password.length < 6) e.password   = 'Minimum 6 characters';
    if (!confirmPwd.trim())       e.confirmPwd  = 'Please confirm your password';
    else if (password !== confirmPwd) e.confirmPwd = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSignup = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        '🎉 Account Created!',
        `Welcome, ${name}!\nYour account has been created successfully.`,
        [{ text: 'Login Now', onPress: () => navigation.navigate('Login') }],
      );
    }, 1200);
  };

  /* ── Reusable Input Row ── */
  const Field = ({
    label, value, onChange, placeholder, keyboardType,
    secure, fieldKey, right,
  }: any) => (
    <View style={{ marginBottom: 14 }}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputBox, errors[fieldKey] ? styles.inputBoxErr : null]}>
        <Ionicons
          name={
            fieldKey === 'name'       ? 'person-outline'          :
            fieldKey === 'email'      ? 'mail-outline'            :
            fieldKey === 'password'   ? 'lock-closed-outline'     :
            'shield-checkmark-outline'
          }
          size={19}
          color={errors[fieldKey] ? C.error : C.primary}
          style={styles.ico}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={C.textMuted}
          value={value}
          onChangeText={t => { onChange(t); clearErr(fieldKey); }}
          keyboardType={keyboardType || 'default'}
          autoCapitalize="none"
          secureTextEntry={secure}
        />
        {right}
      </View>
      {errors[fieldKey] ? <Text style={styles.err}>{errors[fieldKey]}</Text> : null}
    </View>
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: C.primary }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="light-content" backgroundColor={C.primary} />

      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: Math.max(insets.bottom, 16) }]}
        keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

        {/* ── Top Header ── */}
        <View style={styles.header}>
          <View style={styles.logoWrap}>
            <Ionicons name="person-add" size={34} color={C.primary} />
          </View>
          <Text style={styles.appName}>E-Commerce</Text>
          <Text style={styles.tagline}>Create your account today</Text>
        </View>

        {/* ── White Card ── */}
        <View style={[styles.card, { paddingBottom: 36 + insets.bottom }]}>
          <Text style={styles.cardTitle}>Create Account ✨</Text>
          <Text style={styles.cardSub}>Fill in the details to get started</Text>

          <Field
            label="Full Name"
            value={name} onChange={setName}
            placeholder="Enter your full name"
            fieldKey="name"
          />
          <Field
            label="Email Address"
            value={email} onChange={setEmail}
            placeholder="yourname@email.com"
            keyboardType="email-address"
            fieldKey="email"
          />
          <Field
            label="Password"
            value={password} onChange={setPassword}
            placeholder="Min. 6 characters"
            fieldKey="password"
            secure={!showPwd}
            right={
              <TouchableOpacity onPress={() => setShowPwd(!showPwd)} style={styles.eye}>
                <Ionicons name={showPwd ? 'eye-off-outline' : 'eye-outline'} size={19} color={C.textMuted} />
              </TouchableOpacity>
            }
          />
          <Field
            label="Confirm Password"
            value={confirmPwd} onChange={setConfirmPwd}
            placeholder="Re-enter your password"
            fieldKey="confirmPwd"
            secure={!showConfirm}
            right={
              <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={styles.eye}>
                <Ionicons name={showConfirm ? 'eye-off-outline' : 'eye-outline'} size={19} color={C.textMuted} />
              </TouchableOpacity>
            }
          />

          {/* Sign Up Button */}
          <TouchableOpacity
            style={[styles.btn, loading && { opacity: 0.75 }]}
            onPress={handleSignup} disabled={loading} activeOpacity={0.85}>
            {loading
              ? <ActivityIndicator color="#fff" />
              : <>
                  <Ionicons name="checkmark-circle-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
                  <Text style={styles.btnTxt}>Create Account</Text>
                </>}
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divRow}>
            <View style={styles.divLine} />
            <Text style={styles.divTxt}>OR</Text>
            <View style={styles.divLine} />
          </View>

          {/* Login Link */}
          <TouchableOpacity style={styles.linkRow} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkTxt}>Already have an account? </Text>
            <Text style={styles.linkBold}>Login</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, backgroundColor: C.primary },

  /* Header */
  header: { alignItems: 'center', paddingTop: 55, paddingBottom: 32 },
  logoWrap: {
    width: 75, height: 75, borderRadius: 38,
    backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 10, elevation: 5,
  },
  appName: { fontSize: 24, fontWeight: 'bold', color: '#fff', letterSpacing: 0.8 },
  tagline:  { fontSize: 13, color: 'rgba(255,255,255,0.80)', marginTop: 5 },

  /* Card */
  card: {
    backgroundColor: C.white,
    borderTopLeftRadius: 32, borderTopRightRadius: 32,
    paddingHorizontal: 26, paddingTop: 30, paddingBottom: 36,
    flex: 1, minHeight: 580,
  },
  cardTitle: { fontSize: 22, fontWeight: 'bold', color: C.text },
  cardSub:   { fontSize: 14, color: C.textMuted, marginBottom: 20, marginTop: 3 },

  /* Inputs */
  label: { fontSize: 13, fontWeight: '600', color: C.text, marginBottom: 7 },
  inputBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.primaryLight,
    borderRadius: 13, borderWidth: 1.5, borderColor: C.border,
    paddingHorizontal: 13, height: 52,
  },
  inputBoxErr: { borderColor: C.error, backgroundColor: C.errorBg },
  ico:   { marginRight: 9 },
  input: { flex: 1, fontSize: 15, color: C.text },
  eye:   { padding: 4 },
  err:   { fontSize: 12, color: C.error, marginTop: 4, marginLeft: 2 },

  /* Button */
  btn: {
    flexDirection: 'row', backgroundColor: C.primary,
    paddingVertical: 15, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
    marginTop: 6,
    elevation: 4, shadowColor: C.primary, shadowOpacity: 0.35, shadowRadius: 8,
  },
  btnTxt: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  /* Divider */
  divRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  divLine: { flex: 1, height: 1, backgroundColor: '#d1eeeb' },
  divTxt:  { marginHorizontal: 12, color: C.textMuted, fontWeight: '600', fontSize: 13 },

  /* Link */
  linkRow: { flexDirection: 'row', justifyContent: 'center' },
  linkTxt:  { fontSize: 15, color: C.textMuted },
  linkBold: { fontSize: 15, color: C.primary, fontWeight: 'bold' },
});

export default SignupScreen;
