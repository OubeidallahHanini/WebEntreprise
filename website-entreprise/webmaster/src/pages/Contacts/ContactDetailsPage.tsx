import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  type: string;
}

const ContactDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [contact, setContact] = useState<Contact | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/contacts/${id}`, { withCredentials: true });
        setContact(response.data);
      } catch (err) {
        setError('Error fetching contact details');
      }
    };

    fetchContact();
  }, [id]);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
      {error && <div className="text-red-500">{error}</div>}
      {contact && (
        <div>
          <h2 className="text-xl font-bold mb-4">{contact.name}</h2>
          <p><strong>Email:</strong> {contact.email}</p>
          <p><strong>Phone:</strong> {contact.phone}</p>
          <p><strong>Subject:</strong> {contact.subject}</p>
          <p><strong>Message:</strong> {contact.message}</p>
          <p><strong>Type:</strong> {contact.type}</p>
        </div>
      )}
    </div>
  );
};

export default ContactDetailsPage;
