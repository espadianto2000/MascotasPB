import firestore from '@react-native-firebase/firestore';
import { FB_COLLECTION_GROUPS } from '@env';

export const getGroups = async (user: any) => {
  try {
    const collectionRef = firestore().collection(FB_COLLECTION_GROUPS);
    const groupsSnapshot = await collectionRef
      .where('members', 'array-contains', user.uid)
      .get();

    const groups = groupsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      membersCount: doc.data().members.length,
      petsCount: doc.data().pets.length,
    }));
    console.log('Fetched groups:', groups);
    return groups;
  } catch (error: any) {
    console.error('Error fetching groups:', error.message);
    throw new Error(error.message);
  }
};

export const deleteGroup = async (groupId: string) => {};

export const createGroup = async (name: string) => {};

export const joinGroup = async (code: string) => {};

export const leaveGroup = async (code: string) => {};
