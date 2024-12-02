import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  useColorScheme,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../types';
import {
  createGroup,
  deleteGroup,
  getGroups,
  joinGroup,
} from '../actions/GroupActions';
import CreateGroupModal from '../modals/create-group.modal';
import JoinGroupModal from '../modals/join-group.modal';

type HomeScreenNavigationProp = StackNavigationProp<StackParamList, 'Home'>;

// Mock data for groups
const mockGroups = [
  { id: '1', name: 'Dog Lovers', petsCount: 3, membersCount: 5 },
  { id: '2', name: 'Cat Enthusiasts', petsCount: 4, membersCount: 6 },
  { id: '3', name: 'Rabbit Club', petsCount: 2, membersCount: 3 },
  { id: '4', name: 'Bird Watchers', petsCount: 5, membersCount: 8 },
];

export default function HomeScreen() {
  const [groups, setGroups] = useState([]);
  const [ownedGroups, setOwnedGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const [groupMenuVisible, setGroupMenuVisible] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [createGroupModalVisible, setCreateGroupModalVisible] = useState(false);
  const [joinGroupModalVisible, setJoinGroupModalVisible] = useState(false);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const { user, token } = useAuth();

  useEffect(() => {
    if (user) {
      getGroups(user)
        .then(fetchedGroups => {
          setGroups(fetchedGroups);
          setOwnedGroups(fetchedGroups.filter(g => g.creator_id === user.uid));
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching groups:', error.message);
        });
    }
  }, [user]);

  const openGroupMenu = (groupId: string) => {
    setSelectedGroupId(groupId);
    setGroupMenuVisible(true);
  };

  const handleCardPress = (groupId: string) => {
    console.log('Group clicked:', groupId);
    // Navigate or handle card press here
  };
  const { logout } = useAuth();
  const handleLogOut = async () => {
    await logout();
    setUserMenuVisible(false);
    navigation.navigate('Auth');
  };
  const handleCreateGroup = async (groupName: string) => {
    console.log('Creating group:', groupName);
    await createGroup(groupName, token || '');
  };

  const handleJoinGroup = async (groupCode: string) => {
    console.log('Joining group with code:', groupCode);
    await joinGroup(groupCode, token || '');
  };

  const handleDeleteGroup = async () => {
    console.log('deleting group:', selectedGroupId);
    await deleteGroup(selectedGroupId || '', token || '');
  };

  const handleLeaveGroup = async () => {
    console.log('Leave group with code:', selectedGroupId);
    await joinGroup(selectedGroupId || '', token || '');
  };

  const renderGroupCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, isDarkMode && styles.darkCard]}
      onPress={() => handleCardPress(item.id)} // Card click
    >
      <Text style={[styles.groupName, isDarkMode && styles.darkText]}>
        {item.name}
      </Text>
      <View style={styles.iconContainer}>
        <View style={styles.iconPair}>
          <Ionicons
            name="paw"
            size={24}
            color={isDarkMode ? '#ffffff' : '#000000'}
          />
          <Text style={[styles.iconText, isDarkMode && styles.darkText]}>
            {item.petsCount}
          </Text>
        </View>

        <View style={styles.spacer} />

        <View style={styles.iconPair}>
          <Ionicons
            name="people"
            size={24}
            color={isDarkMode ? '#ffffff' : '#000000'}
          />
          <Text style={[styles.iconText, isDarkMode && styles.darkText]}>
            {item.membersCount}
          </Text>
        </View>

        <View style={styles.rightAlign}>
          <TouchableOpacity onPress={() => openGroupMenu(item.id)}>
            <Ionicons
              name="ellipsis-horizontal"
              size={24}
              color={isDarkMode ? '#ffffff' : '#000000'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.header}>
        <Text style={[styles.title, isDarkMode && styles.darkText]}>
          My Groups
        </Text>
        <TouchableOpacity onPress={() => setUserMenuVisible(true)}>
          <Ionicons
            name="person-circle-outline"
            size={32}
            color={isDarkMode ? '#ffffff' : '#000000'}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={groups}
        renderItem={renderGroupCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setJoinGroupModalVisible(true)}
        >
          <Text
            style={[styles.buttonText, isDarkMode && styles.darkButtonText]}
          >
            Join Group
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCreateGroupModalVisible(true)}
          disabled={loading || ownedGroups.length >= 4}
        >
          <Text
            style={[styles.buttonText, isDarkMode && styles.darkButtonText]}
          >
            Create Group
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={userMenuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setUserMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setUserMenuVisible(false)}
        >
          <View style={[styles.userMenu, isDarkMode && styles.darkUserMenu]}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={[styles.menuText, isDarkMode && styles.darkText]}>
                User Info
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={[styles.menuText, isDarkMode && styles.darkText]}>
                Settings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleLogOut}>
              <Text style={[styles.menuText, isDarkMode && styles.darkText]}>
                Log out
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={groupMenuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setGroupMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setGroupMenuVisible(false)}
        >
          <View style={[styles.groupMenu, isDarkMode && styles.darkUserMenu]}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={[styles.menuText, isDarkMode && styles.darkText]}>
                Details
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={[styles.menuText, isDarkMode && styles.darkText]}>
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleDeleteGroup}
            >
              <Text style={[styles.menuText, isDarkMode && styles.darkText]}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      <CreateGroupModal
        visible={createGroupModalVisible}
        onClose={() => setCreateGroupModalVisible(false)}
        onCreateGroup={handleCreateGroup}
      />

      <JoinGroupModal
        visible={joinGroupModalVisible}
        onClose={() => setJoinGroupModalVisible(false)}
        onJoinGroup={handleJoinGroup}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  darkContainer: {
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  darkText: {
    color: '#ffffff',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  darkCard: {
    backgroundColor: '#333333',
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensures the "..." is far right
  },
  iconPair: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacer: {
    width: 16, // Adjust to create space between the icon pairs
  },
  iconText: {
    marginLeft: 4, // Keep icon and number close
  },
  rightAlign: {
    marginLeft: 'auto', // Pushes "..." to the right
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  userMenu: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginTop: 60,
    marginRight: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  groupMenu: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginTop: 60,
    marginRight: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  darkUserMenu: {
    backgroundColor: '#333333',
  },
  menuItem: {
    paddingVertical: 8,
  },
  menuText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#333333', // Use your preferred button color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  darkButtonText: {
    color: '#ffffff',
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff', // White text on dark buttons
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
