const fetchUserData = async (token) => {
    const response = await fetch('/api/user', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  
    if (response.ok) {
      const user = await response.json();
      setUser(user); // Store user data in state
    } else {
      // Handle error
    }
  };
  