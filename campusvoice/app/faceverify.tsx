// app/faceverify.tsx
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function FaceVerifyScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraReady, setIsCameraReady] = useState(false);

  const handleVerificationSuccess = () => {
    // later: after verifying face using camera, move to dashboard
    router.push('/dashboard');
  };

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    return <View style={styles.container}><Text>Requesting camera permissions...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Camera Access Needed</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#407ED1" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Face Verification</Text>
      <Text style={styles.subtitle}>Ensure it’s really you before entering</Text>

      {/* Front Camera Live View */}
      <View style={styles.cameraBox}>
        <CameraView
          style={StyleSheet.absoluteFill}
          facing="front"
          onCameraReady={() => setIsCameraReady(true)}
        />
        {!isCameraReady && <Text style={styles.cameraText}>Loading camera...</Text>}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleVerificationSuccess}>
        <Text style={styles.buttonText}>Verify & Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 25,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginBottom: 30,
  },
  backText: {
    color: '#407ED1',
    fontSize: 18,
    marginLeft: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#39ACB5',
    marginBottom: 30,
    textAlign: 'center',
  },
  cameraBox: {
    width: '100%',
    height: 300,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  cameraText: {
    color: '#fff',
    fontStyle: 'italic',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#407ED1',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
