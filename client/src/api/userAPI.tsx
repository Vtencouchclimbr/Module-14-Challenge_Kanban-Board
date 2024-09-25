import Auth from '../utils/auth';

interface UserData {
  id: number;
  name: string;
  email: string;

}

const retrieveUsers = async (): Promise<UserData[]> => {
  try {
    const response = await fetch('/api/users', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid user API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.error('Error from data retrieval:', err);
    return [];
  }
}

export { retrieveUsers };