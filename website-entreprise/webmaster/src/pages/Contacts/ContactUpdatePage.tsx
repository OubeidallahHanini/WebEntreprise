import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  type: string;
}

const ContactUpdatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [contact, setContact] = useState<Contact | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!contact) return;
  
    try {
      await axios.put(`http://localhost:3005/api/contacts/${id}`, contact, { withCredentials: true });
  
      // Conditional navigation based on contact type
      if (contact.type === 'business') {
        navigate('/business-contacts');
      } else if (contact.type === 'complaint') {
        navigate('/complaint-contacts');
      }
    } catch (err) {
      setError('Error updating contact details');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (contact) {
      setContact({ ...contact, [e.target.name]: e.target.value });
    }
  };

  return (
      <div className="rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark p-6 space-y-4">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark mb-6">
          <h3 className="font-medium text-black dark:text-white">Update Contact</h3>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        {contact && (
          <form onSubmit={handleUpdate}>
            <div className="mb-6">
              <label className="block text-black dark:text-white mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={contact.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-black dark:text-white mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={contact.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-black dark:text-white mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                value={contact.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-black dark:text-white mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={contact.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-black dark:text-white mb-2">Message</label>
              <textarea
                name="message"
                value={contact.message}
                onChange={handleChange}
                placeholder="Message"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-black dark:text-white mb-2">Type</label>
              <select
                name="type"
                value={contact.type}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                required
              >
                <option value="business">Business</option>
                <option value="complaint">Complaint</option>
              </select>
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Update Contact
              </button>
            </div>
          </form>
        )}
      </div>
    
  );
};

export default ContactUpdatePage;
