import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface JoinGroupModalProps {
  visible: boolean;
  onClose: () => void;
  onJoinGroup: (groupCode: string) => void;
}

export default function JoinGroupModal({
  visible,
  onClose,
  onJoinGroup,
}: JoinGroupModalProps) {
  const [groupCode, setGroupCode] = useState('');
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const handleJoinGroup = () => {
    setLoading(true);
    if (groupCode.trim()) {
      onJoinGroup(groupCode.trim());
      setGroupCode('');
      setLoading(false);
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[styles.modalContent, isDarkMode && styles.darkModalContent]}
        >
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons
              name="close"
              size={24}
              color={isDarkMode ? '#ffffff' : '#000000'}
            />
          </TouchableOpacity>
          <Text style={[styles.title, isDarkMode && styles.darkText]}>
            Join Group
          </Text>
          <TextInput
            style={[styles.input, isDarkMode && styles.darkInput]}
            placeholder="Enter group code"
            placeholderTextColor={isDarkMode ? '#888888' : '#999999'}
            value={groupCode}
            onChangeText={setGroupCode}
          />
          <TouchableOpacity
            style={styles.joinButton}
            onPress={handleJoinGroup}
            disabled={loading || groupCode.length === 0}
          >
            <Text style={styles.joinButtonText}>Join</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 20,
    width: '80%',
    maxWidth: 400,
  },
  darkModalContent: {
    backgroundColor: '#333333',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  darkText: {
    color: '#ffffff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  darkInput: {
    borderColor: '#555555',
    color: '#ffffff',
    backgroundColor: '#444444',
  },
  joinButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
