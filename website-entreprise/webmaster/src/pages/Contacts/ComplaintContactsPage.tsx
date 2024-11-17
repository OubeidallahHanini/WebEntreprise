import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  type: string;
}

const ComplaintContactsPage: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/contactsComplaint', { withCredentials: true });
        setContacts(response.data);
      } catch (err) {
        setError('Error fetching complaint contacts');
      }
    };

    fetchContacts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3005/api/contacts/${id}`, { withCredentials: true });
      setContacts(contacts.filter(contact => contact._id !== id));
    } catch (err) {
      setError('Error deleting contact');
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark mb-6">
        <h3 className="font-medium text-black dark:text-white">Complaint Contacts</h3>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            <th className="py-4 px-4 font-medium text-black dark:text-white">Name</th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">Email</th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">Phone</th>
            <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact._id} className="border-b border-stroke dark:border-strokedark">
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{contact.name}</td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{contact.email}</td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{contact.phone}</td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark flex space-x-2">
                <FaEye
                  className="text-blue-500 cursor-pointer"
                  onClick={() => navigate(`/details-contact/${contact._id}`)}
                />
                <FaEdit
                  className="text-yellow-500 cursor-pointer"
                  onClick={() => navigate(`/update-contact/${contact._id}`)}
                />
                <FaTrash
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDelete(contact._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintContactsPage;
