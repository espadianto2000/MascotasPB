import firestore from '@react-native-firebase/firestore';
import { FB_COLLECTION_GROUPS } from '@env';
import { FB_FUNCTION_URL } from '@env';

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
      owned: doc.data().creator_id === user.uid,
    }));
    console.log('Fetched groups:', groups);
    return groups;
  } catch (error: any) {
    console.error('Error fetching groups:', error.message);
    throw new Error(error.message);
  }
};

export const deleteGroup = async (groupId: string, token: string) => {
  try {
    const data = { id: groupId };
    const response = await fetch(`${FB_FUNCTION_URL}/group/delete-group`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = await response.json();
    console.log('Response Data:', responseData);
  } catch (error) {
    console.error('Error:', error);
  }
};

export const createGroup = async (name: string, token: string) => {
  try {
    const data = { name };
    const response = await fetch(`${FB_FUNCTION_URL}/group/create-group`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = await response.json();
    console.log('Response Data:', responseData);
  } catch (error) {
    console.error('Error:', error);
  }
};

export const joinGroup = async (code: string, token: string) => {
  try {
    const data = { id: code };
    const response = await fetch(`${FB_FUNCTION_URL}/group/join-group`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = await response.json();
    console.log('Response Data:', responseData);
  } catch (error) {
    console.error('Error:', error);
  }
};

export const leaveGroup = async (code: string, token: string) => {
  try {
    const data = { id: code };
    const response = await fetch(`${FB_FUNCTION_URL}/group/leave-group`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = await response.json();
    console.log('Response Data:', responseData);
  } catch (error) {
    console.error('Error:', error);
  }
};
