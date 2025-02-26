import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

function AddCard({ navigation }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [cardType, setCardType] = useState(null);

  // Format card number with spaces
  const formatCardNumber = (input) => {
    // Remove all non-digit characters
    const digits = input.replace(/\D/g, '');
    
    // Limit to 19 digits (16 digits plus possible spaces)
    const trimmed = digits.substring(0, 16);
    
    // Add a space after every 4 digits
    const formatted = trimmed.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    return formatted;
  };

  // Handle card number change
  const handleCardNumberChange = (text) => {
    const formatted = formatCardNumber(text);
    setCardNumber(formatted);
    
    // Detect card type
    detectCardType(formatted.replace(/\s/g, ''));
  };

  // Detect card type based on first digits
  const detectCardType = (number) => {
    // Visa cards start with 4
    if (/^4/.test(number)) {
      setCardType('visa');
    }
    // Mastercard starts with 51-55 or 2221-2720
    else if (/^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[0-1]\d|2720)/.test(number)) {
      setCardType('mastercard');
    }
    // American Express starts with 34 or 37
    else if (/^3[47]/.test(number)) {
      setCardType('amex');
    }
    // Discover starts with 6011, 622126-622925, 644-649, or 65
    else if (/^(6011|65|64[4-9]|622(12[6-9]|1[3-9]|[2-8]|9[01]|92[0-5]))/.test(number)) {
      setCardType('discover');
    }
    else if (number === '') {
      setCardType(null);
    }
  };

  // Format expiry date (MM/YY)
  const handleExpiryChange = (text) => {
    // Remove all non-digit characters
    const digits = text.replace(/\D/g, '');
    
    // Limit to 4 digits
    const trimmed = digits.substring(0, 4);
    
    // Format as MM/YY
    if (trimmed.length > 2) {
      setExpiryDate(`${trimmed.substring(0, 2)}/${trimmed.substring(2)}`);
    } else {
      setExpiryDate(trimmed);
    }
  };

  // Limit CVV to 3 or 4 digits depending on card type
  const handleCvvChange = (text) => {
    const digits = text.replace(/\D/g, '');
    const maxLength = cardType === 'amex' ? 4 : 3;
    setCvv(digits.substring(0, maxLength));
  };

  // Render card type icon
  const renderCardTypeIcon = () => {
    if (!cardType) return null;
    
    let iconName = '';
    switch (cardType) {
      case 'visa':
        return <Text style={styles.cardTypeText}>Visa</Text>;
      case 'mastercard':
        return <Text style={styles.cardTypeText}>MasterCard</Text>;
      case 'amex':
        return <Text style={styles.cardTypeText}>Amex</Text>;
      case 'discover':
        return <Text style={styles.cardTypeText}>Discover</Text>;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.headerTitle}>Add card</Text>

      {/* Form */}
      <View style={styles.form}>
        {/* Card Number Input */}
        <View style={styles.inputContainer}>
          <View style={styles.cardNumberContainer}>
            <TextInput
              style={styles.input}
              value={cardNumber}
              onChangeText={handleCardNumberChange}
              placeholder="Card Number"
              keyboardType="numeric"
              secureTextEntry={!showCardNumber}
            />
            <View style={styles.cardNumberRight}>
              {renderCardTypeIcon()}
              <TouchableOpacity onPress={() => setShowCardNumber(!showCardNumber)}>
                <Ionicons 
                  name={showCardNumber ? "eye-outline" : "eye-off-outline"} 
                  size={20} 
                  color="#888" 
                  style={styles.eyeIcon} 
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        {/* Expiry and CVV Row */}
        <View style={styles.rowContainer}>
          {/* Expiry Date Input */}
          <View style={[styles.inputContainer, styles.halfInput]}>
            <TextInput
              style={styles.input}
              value={expiryDate}
              onChangeText={handleExpiryChange}
              placeholder="MM/YY"
              keyboardType="numeric"
            />
          </View>
          
          {/* CVV Input */}
          <View style={[styles.inputContainer, styles.halfInput]}>
            <TextInput
              style={styles.input}
              value={cvv}
              onChangeText={handleCvvChange}
              placeholder={cardType === 'amex' ? "4-digit CVV" : "CVV"}
              keyboardType="numeric"
              secureTextEntry
              maxLength={cardType === 'amex' ? 4 : 3}
            />
          </View>
        </View>
        
        {/* Save Button */}
        <TouchableOpacity 
          style={[
            styles.saveButton,
            (!cardNumber || cardNumber.length < 16 || !expiryDate || expiryDate.length < 4 || !cvv) && styles.saveButtonDisabled
          ]}
          disabled={!cardNumber || cardNumber.length < 16 || !expiryDate || expiryDate.length < 4 || !cvv}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050C4D', // Dark blue background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '500',
    color: 'white',
    marginLeft: 20,
    marginBottom: 20,
  },
  form: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
    height: 50,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    flex: 1,
  },
  cardNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    height: 52,
  },
  cardNumberRight: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 12,
  },
  cardTypeText: {
    fontSize: 14,
    color: '#555',
    marginRight: 8,
    fontWeight: '500',
  },
  eyeIcon: {
    marginLeft: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  saveButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 'auto', // Pushes the button to the bottom
    marginBottom: 16,
  },
  saveButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#00205B', // Dark blue text
  },
});

export default AddCard;