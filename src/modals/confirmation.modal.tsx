import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';

interface ConfirmationModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isVisible,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'Do you really want to proceed with this action?',
  confirmText = 'Yes',
  cancelText = 'Cancel',
}) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContainer,
            isDarkMode && styles.darkModalContainer,
          ]}
        >
          <Text style={[styles.modalTitle, isDarkMode && styles.darkText]}>
            {title}
          </Text>
          <Text style={[styles.modalMessage, isDarkMode && styles.darkText]}>
            {message}
          </Text>

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[
                styles.button,
                styles.cancelButton,
                isDarkMode && styles.darkCancelButton,
              ]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>{cancelText}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.confirmButton,
                isDarkMode && styles.darkConfirmButton,
              ]}
              onPress={() => {
                onConfirm();
                onClose();
              }}
            >
              <Text style={styles.buttonText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 20,
    width: '80%',
    maxWidth: 400,
    alignItems: 'center',
  },
  darkModalContainer: {
    backgroundColor: '#333333',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  darkText: {
    color: '#ffffff',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#cccccc',
  },
  darkCancelButton: {
    backgroundColor: '#555555',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  darkConfirmButton: {
    backgroundColor: '#6AD965',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default ConfirmationModal;
