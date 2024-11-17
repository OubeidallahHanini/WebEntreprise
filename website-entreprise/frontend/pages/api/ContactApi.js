
export const createContact = async (contactData) => {
    try {
      const response = await fetch("http://localhost:3005/api/CreateContact", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  };


  