const fetchWithToken = async (url: string, token: string) => {
    if (!token) {
      throw new Error('No token provided');
    }
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
  
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };
  
  export default fetchWithToken;