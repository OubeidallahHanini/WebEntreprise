import React, { useState } from "react";
import { Title, TitleSm } from "../components/common/Title";
import { AiFillBehanceCircle, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { BsFacebook } from "react-icons/bs";
import { FiHeadphones, FiHelpCircle } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { createContact } from '../pages/api/ContactApi'; // Importer la fonction de création de contact

const Contact = () => {
  const [formType, setFormType] = useState('business');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleFormTypeChange = (e) => {
    setFormType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactData = {
      name,
      email,
      phone,
      subject,
      message,
      type: formType, // Inclure le type de formulaire dans les données
    };

    try {
      const result = await createContact(contactData);
      setSuccess('Votre message a été envoyé avec succès!');
      setError(null);
    } catch (err) {
      setError('Une erreur s\'est produite lors de l\'envoi de votre message.');
      setSuccess(null);
    }
  };

  return (
    <>
      <section className='contact bg-top'>
        <div className='container'>
          <div className='heading-title'>
            <TitleSm title='CONTACT' /> <br />
            <br />
            <Title title="Let's start right now!" className='title-bg' />
          </div>
          <div className='content py flex1'>
            <div className='left w-30'>
              <div className='contact-deatils'>
                <div className='box'>
                  <FiHeadphones size={30} className='icons' />
                  <h3>1-001-234-5678</h3>
                  <span>Call us: Mon - Fri 9:00 - 19:00</span>
                </div>
                <div className='box'>
                  <IoLocationOutline size={30} className='icons' />
                  <h3>New York</h3>
                  <span>990 Madison Ave, Midtown Manhattan, 2th Floor, NY 10022</span>
                </div>
                <div className='box'>
                  <FiHelpCircle size={30} className='icons' />
                  <h3>info@dream-theme.com</h3>
                  <span>Drop us a line anytime!</span>
                </div>
                <div className='box'>
                  <BiUserCircle size={30} className='icons' />
                  <h3>hr@dream-theme.com</h3>
                  <span>Career at Seven Creative</span>
                </div>
              </div>
              <ul>
                <li className='icon'>
                  <BsFacebook size={25} />
                </li>
                <li className='icon'>
                  <AiFillBehanceCircle size={25} />
                </li>
                <li className='icon'>
                  <AiFillInstagram size={25} />
                </li>
                <li className='icon'>
                  <AiFillLinkedin size={25} />
                </li>
              </ul>
            </div>

            <div className='right w-70'>
              <TitleSm title='Make an online enquiry' />
              <p className='desc-p'>Got questions? Ideas? Fill out the form below to get our proposal.</p>

              <div className='form-selector'>
                <label htmlFor='formType'>Select form type:</label>
                <select id='formType' value={formType} onChange={handleFormTypeChange}>
                  <option value='business'>Business Inquiry</option>
                  <option value='complaint'>Complaint</option>
                </select>
              </div>

              {formType === 'business' && (
                <form onSubmit={handleSubmit}>
                  <div className='grid-2'>
                    <div className='inputs'>
                      <span>Nom complet</span>
                      <input
                        type='text'
                        placeholder='Votre nom complet'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className='inputs'>
                      <span>Adresse e-mail</span>
                      <input
                        type='email'
                        placeholder='Votre adresse e-mail'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className='grid-2'>
                    <div className='inputs'>
                      <span>Numéro de téléphone (optionnel)</span>
                      <input
                        type='tel'
                        placeholder='Votre numéro de téléphone'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className='inputs'>
                      <span>Objet</span>
                      <input
                        type='text'
                        placeholder='Objet de votre message'
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className='inputs'>
                    <span>Message*</span>
                    <textarea
                      cols='30'
                      rows='10'
                      placeholder='Décrivez votre demande ou posez votre question'
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <button className='button-primary' type='submit'>Submit</button>
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  {success && <p style={{ color: 'green' }}>{success}</p>}
                </form>
              )}

              {formType === 'complaint' && (
                <form onSubmit={handleSubmit}>
                  <div className='grid-2'>
                    <div className='inputs'>
                      <span>Nom complet</span>
                      <input
                        type='text'
                        placeholder='Votre nom complet'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className='inputs'>
                      <span>Adresse e-mail</span>
                      <input
                        type='email'
                        placeholder='Votre adresse e-mail'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className='grid-2'>
                    <div className='inputs'>
                      <span>Numéro de téléphone (optionnel)</span>
                      <input
                        type='tel'
                        placeholder='Votre numéro de téléphone'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className='inputs'>
                      <span>Objet</span>
                      <input
                        type='text'
                        placeholder='Objet de votre message'
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className='inputs'>
                    <span>Message*</span>
                    <textarea
                      cols='30'
                      rows='10'
                      placeholder='Décrivez votre demande ou posez votre question'
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <button className='button-primary' type='submit'>Submit</button>
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  {success && <p style={{ color: 'green' }}>{success}</p>}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;