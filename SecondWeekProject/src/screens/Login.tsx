import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';

// ─── App Color Palette ───────────────────────────────────
const C = {
  primary: '#00a896',       // teal - main brand color (app ke saath match)
  primaryDark: '#007a6e',   // darker teal for gradient effect
  primaryLight: '#e6f7f5',  // very light teal for input backgrounds
  white: '#ffffff',
  bg: '#f0faf9',            // light teal-tinted background
  text: '#1a2e2d',          // dark text
  textMuted: '#6b8f8d',     // muted text
  border: '#b2d8d4',        // teal border
  error: '#ef4444',
  errorBg: '#fff5f5',
};

const LoginScreen = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd]   = useState(false);
  const [loading, setLoading]   = useState(false);
  const [errors, setErrors]     = useState<Record<string, string>>({});
  const navigation = useNavigation<any>();

  const validate = () => {
    const e: Record<string, string> = {};
    if (!email.trim())            e.email    = 'Email is required';
    else if (!email.includes('@')) e.email   = 'Enter a valid email';
    if (!password.trim())         e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Minimum 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace('MainTabs');
    }, 1000);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: C.primary }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="light-content" backgroundColor={C.primary} />

      <ScrollView contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

        {/* ── Top Header ── */}
        <View style={styles.header}>
          <View style={styles.logoWrap}>
            <Ionicons name="storefront" size={38} color={C.primary} />
          </View>
          <Text style={styles.appName}>E-Commerce</Text>
          <Text style={styles.tagline}>Your one-stop shopping destination</Text>
        </View>

        {/* ── White Card ── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Welcome Back </Text>
          <Text style={styles.cardSub}>Sign in to continue shopping</Text>

          {/* Email */}
          <Text style={styles.label}>Email Address</Text>
          <View style={[styles.inputBox, errors.email ? styles.inputBoxErr : null]}>
            <Ionicons name="mail-outline" size={19}
              color={errors.email ? C.error : C.primary} style={styles.ico} />
            <TextInput
              style={styles.input}
              placeholder="yourname@email.com"
              placeholderTextColor={C.textMuted}
              value={email}
              onChangeText={t => { setEmail(t); setErrors(p => ({ ...p, email: '' })); }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          {errors.email ? <Text style={styles.err}>{errors.email}</Text> : null}

          {/* Password */}
          <Text style={[styles.label, { marginTop: 14 }]}>Password</Text>
          <View style={[styles.inputBox, errors.password ? styles.inputBoxErr : null]}>
            <Ionicons name="lock-closed-outline" size={19}
              color={errors.password ? C.error : C.primary} style={styles.ico} />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor={C.textMuted}
              value={password}
              onChangeText={t => { setPassword(t); setErrors(p => ({ ...p, password: '' })); }}
              secureTextEntry={!showPwd}
            />
            <TouchableOpacity onPress={() => setShowPwd(!showPwd)} style={styles.eye}>
              <Ionicons name={showPwd ? 'eye-off-outline' : 'eye-outline'} size={19} color={C.textMuted} />
            </TouchableOpacity>
          </View>
          {errors.password ? <Text style={styles.err}>{errors.password}</Text> : null}

          {/* Forgot */}
          <TouchableOpacity style={styles.forgotWrap}>
            <Text style={styles.forgotTxt}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Btn */}
          <TouchableOpacity
            style={[styles.btn, loading && { opacity: 0.75 }]}
            onPress={handleLogin} disabled={loading} activeOpacity={0.85}>
            {loading
              ? <ActivityIndicator color="#fff" />
              : <>
                  <Ionicons name="log-in-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
                  <Text style={styles.btnTxt}>Login</Text>
                </>}
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divRow}>
            <View style={styles.divLine} />
            <Text style={styles.divTxt}>OR</Text>
            <View style={styles.divLine} />
          </View>

          {/* Sign Up Link */}
          <TouchableOpacity style={styles.linkRow} onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.linkTxt}>Don't have an account? </Text>
            <Text style={styles.linkBold}>Sign Up</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, backgroundColor: C.primary },

  /* Header */
  header: { alignItems: 'center', paddingTop: 65, paddingBottom: 36 },
  logoWrap: {
    width: 78, height: 78, borderRadius: 39,
    backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center',
    marginBottom: 14,
    shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 10, elevation: 5,
  },
  appName: { fontSize: 26, fontWeight: 'bold', color: '#fff', letterSpacing: 0.8 },
  tagline:  { fontSize: 13, color: 'rgba(255,255,255,0.80)', marginTop: 5 },

  /* Card */
  card: {
    backgroundColor: C.white,
    borderTopLeftRadius: 32, borderTopRightRadius: 32,
    paddingHorizontal: 26, paddingTop: 32, paddingBottom: 36,
    flex: 1, minHeight: 520,
  },
  cardTitle: { fontSize: 23, fontWeight: 'bold', color: C.text },
  cardSub:   { fontSize: 14, color: C.textMuted, marginBottom: 24, marginTop: 3 },

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

  /* Forgot */
  forgotWrap: { alignSelf: 'flex-end', marginVertical: 14 },
  forgotTxt:  { color: C.primary, fontSize: 13, fontWeight: '600' },

  /* Button */
  btn: {
    flexDirection: 'row', backgroundColor: C.primary,
    paddingVertical: 15, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
    elevation: 4, shadowColor: C.primary, shadowOpacity: 0.35, shadowRadius: 8,
  },
  btnTxt: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  /* Divider */
  divRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 22 },
  divLine: { flex: 1, height: 1, backgroundColor: '#d1eeeb' },
  divTxt:  { marginHorizontal: 12, color: C.textMuted, fontWeight: '600', fontSize: 13 },

  /* Link */
  linkRow: { flexDirection: 'row', justifyContent: 'center' },
  linkTxt:  { fontSize: 15, color: C.textMuted },
  linkBold: { fontSize: 15, color: C.primary, fontWeight: 'bold' },
});

export default LoginScreen;
