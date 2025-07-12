import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Zap, Target, Users, TrendingUp } from 'lucide-react-native';

export default function LandingScreen() {
  const handleGetStarted = () => {
    router.push('/(tabs)/register');
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#2C8EFF', '#9E89FF', '#2C8EFF']}
        style={styles.gradient}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.logoContainer}>
            <Zap size={60} color="#F5F7FA" />
          </View>
          <Text style={styles.heroTitle}>Fitni</Text>
          <Text style={styles.heroSubtitle}>
            Transform your fitness journey with personalized coaching and tracking
          </Text>
          
          {/* Hero Image Placeholder */}
          <View style={styles.heroImageContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=800' }}
              style={styles.heroImage}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Why Choose Fitni?</Text>
          
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Target size={24} color="#2C8EFF" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Personalized Goals</Text>
                <Text style={styles.featureDescription}>
                  Set and track custom fitness goals tailored to your lifestyle
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Users size={24} color="#2C8EFF" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Expert Coaches</Text>
                <Text style={styles.featureDescription}>
                  Connect with certified trainers for professional guidance
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <TrendingUp size={24} color="#2C8EFF" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Progress Tracking</Text>
                <Text style={styles.featureDescription}>
                  Monitor your improvements with detailed analytics
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to Start Your Journey?</Text>
          <Text style={styles.ctaSubtitle}>
            Join thousands of users who have transformed their lives
          </Text>
          
          <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
            <LinearGradient
              colors={['#2C8EFF', '#9E89FF']}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.loginLink}
            onPress={() => router.push('/(tabs)/login')}
          >
            <Text style={styles.loginLinkText}>
              Already have an account? <Text style={styles.loginLinkHighlight}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    minHeight: '100%',
  },
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(245, 247, 250, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: '800',
    color: '#F5F7FA',
    marginBottom: 16,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#F5F7FA',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  heroImageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  featuresSection: {
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#F5F7FA',
    textAlign: 'center',
    marginBottom: 32,
  },
  featuresList: {
    gap: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(245, 247, 250, 0.1)',
    padding: 20,
    borderRadius: 16,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(245, 247, 250, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F5F7FA',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#F5F7FA',
    lineHeight: 20,
  },
  ctaSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  ctaTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#F5F7FA',
    textAlign: 'center',
    marginBottom: 16,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: '#F5F7FA',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  getStartedButton: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#2C8EFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 24,
  },
  buttonGradient: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#F5F7FA',
    fontSize: 18,
    fontWeight: '700',
  },
  loginLink: {
    paddingVertical: 12,
  },
  loginLinkText: {
    color: '#F5F7FA',
    fontSize: 16,
  },
  loginLinkHighlight: {
    color: '#2C8EFF',
    fontWeight: '600',
  },
});