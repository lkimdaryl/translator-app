import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Button, Modal, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import Header from './components/Header';
import InputArea from './components/InputArea';
import OutputArea from './components/OutputArea';
import LanguageModal from './components/LanguageModal';

export default function App() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [originLanguage, setOriginLanguage] = useState('English');
  const [translationLanguage, setTranslationLanguage] = useState('Spanish');
  const [isSelectOrigin, setIsSelectOrigin] = useState(true);
  const [translatedText, setTranslatedText] = useState('');

  const toggleModal = (isSelectOrigin: boolean) => {
    setIsSelectOrigin(isSelectOrigin);
    setModalVisible(!isModalVisible);
  };

  const handleSelectLanguage = (language: string) => {
    if (isSelectOrigin) {
      setOriginLanguage(language);
    } else {
      setTranslationLanguage(language);
    }
    toggleModal(!isSelectOrigin);
  };

  const handleSwitchLanguages = () => {
    const temp = originLanguage;
    setOriginLanguage(translationLanguage);
    setTranslationLanguage(temp);
  }

  const handleTranslatedText = (text: string) => {
    setTranslatedText(text);
    console.log(text);
    // console.log(translatedText);
};

  return (
    <SafeAreaView style={styles.container}>
      <Header />      
      <View style={styles.translationContainer}>
        <InputArea 
          onTranslate={handleTranslatedText} 
          originLanguage={originLanguage} 
          translationLanguage={translationLanguage}/>
        <OutputArea incomingTranslatedText={translatedText}/>
      </View>
      
      <View style={styles.languageSelection}>
        <Button title={originLanguage} onPress={() => toggleModal(true)} />  
        <TouchableOpacity style={styles.swapButton}>
          <Text style={styles.swapIcon} onPress={handleSwitchLanguages}>⇆</Text>
        </TouchableOpacity>
        <Button title={translationLanguage} onPress={() => toggleModal(false)} />
      </View>

      <LanguageModal 
        isVisible={isModalVisible} 
        onClose={() => setModalVisible(false)}
        onSelectLanguage={handleSelectLanguage}
      />
    </SafeAreaView>
  );
  // return (
  //   <View style={styles.container}>
  //     <Text>Is this working?</Text>
  //     <StatusBar style="auto" />
  //   </View>
  // );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
      padding: 10,
    },
    translationContainer: {
      flex: 1,
      // marginVertical: 10,
    },
  
    microphoneButton: {
      position: 'absolute',
      bottom: 10,
      right: 10,
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 50,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
    },
    microphoneIcon: {
      fontSize: 24,
    },
    languageSelection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
    },
    swapButton: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: '#ccc',
      borderRadius: 5,
    },
    swapIcon: {
      fontSize: 18,
    },
    languageOptions: {
      marginVertical: 10,
    },
  
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#fff',
      maxHeight: '50%',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    modalText: {
      fontSize: 18,
    },
  });