import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, FlatList, TouchableOpacity } from 'react-native';

const languages = [
  'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Korean',
  'Italian', 'Portuguese', 'Russian', 'Hindi', 'Arabic', 'Dutch', 'Greek',
  'Hebrew', 'Polish', 'Turkish', 'Vietnamese', 'Thai', 'Indonesian'
  // Add more languages as needed
];

interface LanguageModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectLanguage: (language: string) => void;
}

const LanguageModal: React.FC<LanguageModalProps> = ({ isVisible, onClose, onSelectLanguage }) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContainer}>
        <FlatList
          data={languages}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.languageItem}
              onPress={() => {
                onSelectLanguage(item);
                onClose();
              }}
            >
              <Text style={styles.languageText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'white',
    maxHeight: '50%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  languageItem: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  languageText: {
    padding: 10,
    fontSize: 18,
  },
});

export default LanguageModal;
