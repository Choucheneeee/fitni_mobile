import { useAuth } from '@/components/hooks/useAuth';
import { RegisterRequest } from '@/services/api';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Calendar,
  DollarSign,
  Eye,
  EyeOff,
  FileText,
  Lock,
  Mail,
  MapPin,
  Phone,
  Ruler,
  Star,
  User,
  Users,
  Weight
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  tel: string;
  address: string;
  password: string;
  age: string;
  weight: string;
  height: string;
  gender: string;
  role: '' | 'coach' | 'athlete';
  activityLevel: string;
  bio: string;
  certification: string;
  specialities: string;
  price: string;
}

export default function RegisterScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { register, isLoading } = useAuth();
  
  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    email: '',
    tel: '',
    address: '',
    password: '',
    age: '',
    gender: '',
    role: '' as 'coach' | 'athlete' | '',
    weight: '',
    height: '',
    activityLevel: '',
    bio: '',
    certification: '',
    specialities: '',
    price: '',
  });

  const totalSteps = 4;

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.firstname.trim()) newErrors.firstname = 'First name is required';
        if (!formData.lastname.trim()) newErrors.lastname = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
        if (!formData.tel) newErrors.tel = 'Phone number is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        break;
      
      case 2:
        if (!formData.age) newErrors.age = 'Age is required';
        else if (parseInt(formData.age) < 13 || parseInt(formData.age) > 100) newErrors.age = 'Age must be between 13-100';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.role) newErrors.role = 'Role is required';
        break;
      
      case 3:
        if (!formData.weight) newErrors.weight = 'Weight is required';
        if (!formData.height) newErrors.height = 'Height is required';
        if (!formData.activityLevel) newErrors.activityLevel = 'Activity level is required';
        break;
      
      case 4:
        if (formData.role === 'coach') {
          if (!formData.certification?.trim()) newErrors.certification = 'Certification is required for coaches';
          if (!formData.specialities?.trim()) newErrors.specialities = 'Specialities are required for coaches';
          if (!formData.price) newErrors.price = 'Price is required for coaches';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const handleSubmit = async () => {
    // Validate that role is selected
    if (!formData.role || (formData.role !== 'coach' && formData.role !== 'athlete')) {
      Alert.alert('Error', 'Please select a valid role (Coach or Athlete)');
      return;
    }

    // Convert string values to numbers where needed
    const submitData: RegisterRequest = {
      ...formData,
      age: parseInt(formData.age),
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      role: formData.role as 'coach' | 'athlete',
      // Only include coach-specific fields if role is coach
      ...(formData.role === 'coach' && {
        certification: formData.certification || '',
        specialities: formData.specialities || '',
        price: formData.price || '',
      }),
    };
    
    const result = await register(submitData);
    
    if (result.success) {
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => router.push('/(tabs)/login') }
      ]);
    } else {
      Alert.alert('Error', result.error || 'Registration failed. Please try again.');
    }
  };

  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${(currentStep / totalSteps) * 100}%` }]} />
      </View>
      <Text style={styles.progressText}>Step {currentStep} of {totalSteps}</Text>
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Personal Information</Text>
      <Text style={styles.stepSubtitle}>Let's start with your basic details</Text>
      
      <View style={styles.row}>
        <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
          <View style={styles.inputWrapper}>
            <User size={20} color="#64748b" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, errors.firstname && styles.inputError]}
              placeholder="First Name"
              placeholderTextColor="#64748b"
              value={formData.firstname}
              onChangeText={(value) => updateField('firstname', value)}
              autoCapitalize="words"
            />
          </View>
          {errors.firstname && <Text style={styles.errorText}>{errors.firstname}</Text>}
        </View>
        
        <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
          <View style={styles.inputWrapper}>
            <User size={20} color="#64748b" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, errors.lastname && styles.inputError]}
              placeholder="Last Name"
              placeholderTextColor="#64748b"
              value={formData.lastname}
              onChangeText={(value) => updateField('lastname', value)}
              autoCapitalize="words"
            />
          </View>
          {errors.lastname && <Text style={styles.errorText}>{errors.lastname}</Text>}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Mail size={20} color="#64748b" style={styles.inputIcon} />
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Email Address"
            placeholderTextColor="#64748b"
            value={formData.email}
            onChangeText={(value) => updateField('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Phone size={20} color="#64748b" style={styles.inputIcon} />
          <TextInput
            style={[styles.input, errors.tel && styles.inputError]}
            placeholder="Phone Number"
            placeholderTextColor="#64748b"
            value={formData.tel}
            onChangeText={(value) => updateField('tel', value)}
            keyboardType="phone-pad"
          />
        </View>
        {errors.tel && <Text style={styles.errorText}>{errors.tel}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <MapPin size={20} color="#64748b" style={styles.inputIcon} />
          <TextInput
            style={[styles.input, errors.address && styles.inputError]}
            placeholder="Address"
            placeholderTextColor="#64748b"
            value={formData.address}
            onChangeText={(value) => updateField('address', value)}
            autoCapitalize="words"
          />
        </View>
        {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Lock size={20} color="#64748b" style={styles.inputIcon} />
          <TextInput
            style={[styles.input, styles.passwordInput, errors.password && styles.inputError]}
            placeholder="Password"
            placeholderTextColor="#64748b"
            value={formData.password}
            onChangeText={(value) => updateField('password', value)}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff size={20} color="#64748b" />
            ) : (
              <Eye size={20} color="#64748b" />
            )}
          </TouchableOpacity>
        </View>
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>About You</Text>
      <Text style={styles.stepSubtitle}>Tell us more about yourself</Text>
      
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Calendar size={20} color="#64748b" style={styles.inputIcon} />
          <TextInput
            style={[styles.input, errors.age && styles.inputError]}
            placeholder="Age"
            placeholderTextColor="#64748b"
            value={formData.age}
            onChangeText={(value) => updateField('age', value)}
            keyboardType="numeric"
          />
        </View>
        {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender</Text>
        <View style={styles.optionsContainer}>
          {['Male', 'Female', 'Other'].map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                formData.gender === option && styles.optionButtonSelected
              ]}
              onPress={() => updateField('gender', option)}
            >
              <Text style={[
                styles.optionText,
                formData.gender === option && styles.optionTextSelected
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>I am a...</Text>
        <View style={styles.optionsContainer}>
          {[
            { value: 'athlete', label: 'Athlete', icon: Users },
            { value: 'coach', label: 'Coach', icon: Award }
          ].map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.roleButton,
                formData.role === option.value && styles.roleButtonSelected
              ]}
              onPress={() => updateField('role', option.value)}
            >
              <option.icon 
                size={24} 
                color={formData.role === option.value ? '#8b5cf6' : '#64748b'} 
              />
              <Text style={[
                styles.roleText,
                formData.role === option.value && styles.roleTextSelected
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.role && <Text style={styles.errorText}>{errors.role}</Text>}
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Physical Stats</Text>
      <Text style={styles.stepSubtitle}>Help us personalize your experience</Text>
      
      <View style={styles.row}>
        <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
          <View style={styles.inputWrapper}>
            <Weight size={20} color="#64748b" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, errors.weight && styles.inputError]}
              placeholder="Weight (kg)"
              placeholderTextColor="#64748b"
              value={formData.weight}
              onChangeText={(value) => updateField('weight', value)}
              keyboardType="decimal-pad"
            />
          </View>
          {errors.weight && <Text style={styles.errorText}>{errors.weight}</Text>}
        </View>
        
        <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
          <View style={styles.inputWrapper}>
            <Ruler size={20} color="#64748b" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, errors.height && styles.inputError]}
              placeholder="Height (cm)"
              placeholderTextColor="#64748b"
              value={formData.height}
              onChangeText={(value) => updateField('height', value)}
              keyboardType="decimal-pad"
            />
          </View>
          {errors.height && <Text style={styles.errorText}>{errors.height}</Text>}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Activity Level</Text>
        <View style={styles.optionsContainer}>
          {[
            'Sedentary',
            'Lightly Active',
            'Moderately Active',
            'Very Active',
            'Extremely Active'
          ].map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                formData.activityLevel === option && styles.optionButtonSelected
              ]}
              onPress={() => updateField('activityLevel', option)}
            >
              <Text style={[
                styles.optionText,
                formData.activityLevel === option && styles.optionTextSelected
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.activityLevel && <Text style={styles.errorText}>{errors.activityLevel}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <FileText size={20} color="#64748b" style={styles.inputIcon} />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Tell us about yourself (optional)"
            placeholderTextColor="#64748b"
            value={formData.bio}
            onChangeText={(value) => updateField('bio', value)}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>
        {formData.role === 'coach' ? 'Coach Details' : 'Almost Done!'}
      </Text>
      <Text style={styles.stepSubtitle}>
        {formData.role === 'coach' 
          ? 'Tell us about your coaching credentials' 
          : 'Review your information and complete registration'
        }
      </Text>
      
      {formData.role === 'coach' ? (
        <>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Award size={20} color="#64748b" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, errors.certification && styles.inputError]}
                placeholder="Certifications (e.g., NASM, ACE, ACSM)"
                placeholderTextColor="#64748b"
                value={formData.certification || ''}
                onChangeText={(value) => updateField('certification', value)}
              />
            </View>
            {errors.certification && <Text style={styles.errorText}>{errors.certification}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Star size={20} color="#64748b" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, errors.specialities && styles.inputError]}
                placeholder="Specialities (e.g., Weight Loss, Strength Training)"
                placeholderTextColor="#64748b"
                value={formData.specialities || ''}
                onChangeText={(value) => updateField('specialities', value)}
              />
            </View>
            {errors.specialities && <Text style={styles.errorText}>{errors.specialities}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <DollarSign size={20} color="#64748b" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, errors.price && styles.inputError]}
                placeholder="Hourly Rate (USD)"
                placeholderTextColor="#64748b"
                value={formData.price}
                onChangeText={(value) => updateField('price', value)}
                keyboardType="decimal-pad"
              />
            </View>
            {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}
          </View>
        </>
      ) : (
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Welcome to FitTracker!</Text>
          <Text style={styles.summaryText}>
            You're all set to begin your fitness journey. Click "Complete Registration" to create your account.
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#2C8EFF', '#9E89FF', '#2C8EFF']}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity style={styles.backButton} onPress={handlePrevious}>
                <ArrowLeft size={24} color="#F5F7FA" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Create Account</Text>
              <View style={styles.placeholder} />
            </View>

            {renderProgressBar()}

            {/* Form Steps */}
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}

            {/* Navigation Buttons */}
            <View style={styles.navigationContainer}>
              <TouchableOpacity
                style={[styles.navButton, isLoading && styles.navButtonDisabled]}
                onPress={handleNext}
                disabled={isLoading}
              >
                <LinearGradient
                  colors={isLoading ? ['#64748b', '#64748b'] : ['#8b5cf6', '#7c3aed']}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.navButtonText}>
                    {isLoading 
                      ? 'Creating Account...' 
                      : currentStep === totalSteps 
                        ? 'Complete Registration' 
                        : 'Continue'
                    }
                  </Text>
                  {!isLoading && currentStep < totalSteps && (
                    <ArrowRight size={20} color="#ffffff" style={styles.arrowIcon} />
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
    paddingTop: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  placeholder: {
    width: 40,
  },
  progressContainer: {
    marginBottom: 32,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2C8EFF',
    borderRadius: 2,
  },
  progressText: {
    color: '#F5F7FA',
    fontSize: 14,
    textAlign: 'center',
  },
  stepContainer: {
    marginBottom: 32,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#F5F7FA',
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 16,
    color: '#F5F7FA',
    marginBottom: 32,
    lineHeight: 24,
  },
  row: {
    flexDirection: 'row',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1E1E1E',
    paddingVertical: 16,
  },
  passwordInput: {
    paddingRight: 48,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#FF4C4C',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    padding: 4,
  },
  errorText: {
    color: '#FF4C4C',
    fontSize: 12,
    marginTop: 8,
    marginLeft: 16,
  },
  label: {
    color: '#F5F7FA',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(245, 247, 250, 0.2)',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  optionButtonSelected: {
    backgroundColor: 'rgba(44, 142, 255, 0.2)',
    borderColor: '#2C8EFF',
  },
  optionText: {
    color: '#F5F7FA',
    fontSize: 14,
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#2C8EFF',
  },
  roleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(245, 247, 250, 0.2)',
    borderWidth: 2,
    borderColor: 'transparent',
    marginHorizontal: 4,
  },
  roleButtonSelected: {
    backgroundColor: 'rgba(44, 142, 255, 0.2)',
    borderColor: '#2C8EFF',
  },
  roleText: {
    color: '#F5F7FA',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  roleTextSelected: {
    color: '#2C8EFF',
  },
  summaryContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  summaryTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#F5F7FA',
    marginBottom: 16,
    textAlign: 'center',
  },
  summaryText: {
    fontSize: 16,
    color: '#F5F7FA',
    textAlign: 'center',
    lineHeight: 24,
  },
  navigationContainer: {
    marginTop: 'auto',
    paddingBottom: 20,
  },
  navButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  navButtonDisabled: {
    opacity: 0.7,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
  },
  navButtonText: {
    color: '#F5F7FA',
    fontSize: 16,
    fontWeight: '600',
  },
  arrowIcon: {
    marginLeft: 8,
  },
});