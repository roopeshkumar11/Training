import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NativeModules,
} from 'react-native';

const { ToastModule } = NativeModules;

function App(): React.JSX.Element {
  const [deviceInfo, setDeviceInfo] = useState<string>('');

  const handleShowToast = () => {
    if (ToastModule?.showToast) {
      ToastModule.showToast('Namaste! Native Module perfectly working!');
    } else {
      console.warn('ToastModule is not available');
    }
  };

  const handleGetDeviceName = async () => {
    try {
      if (ToastModule?.getDeviceName) {
        const name = await ToastModule.getDeviceName();
        setDeviceInfo(name);
        ToastModule.showToast(`Device Model: ${name}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.card}>
        <Text style={styles.title}>React Native Native Module</Text>
        <Text style={styles.subtitle}>Demo of Android Native Module (Kotlin)</Text>

        <TouchableOpacity style={styles.button} onPress={handleShowToast}>
          <Text style={styles.buttonText}>Show Native Toast</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={handleGetDeviceName}>
          <Text style={styles.buttonText}>Get Native Device Name</Text>
        </TouchableOpacity>

        {deviceInfo ? (
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Device Name:</Text>
            <Text style={styles.infoValue}>{deviceInfo}</Text>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2563eb',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryButton: {
    backgroundColor: '#059669',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 15,
  },
  infoBox: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  infoLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginTop: 4,
  },
});

export default App;
