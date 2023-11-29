import React, { useState } from 'react';

const ComposeModal = ( props) => {
    const { isOpen, onClose, onSubmit } = props;
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = () => {
    // Do something with the email and body
    onSubmit({ email, body, subject });
    // Reset the form
    setEmail('');
    setBody('');
    setSubject('');
    // Close the modal
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h1>Compose Email</h1>
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Subject:</label>
        <textarea value={subject} onChange={(e) => setSubject(e.target.value)}></textarea>
        <label>Body:</label>
        <textarea value={body} onChange={(e) => setBody(e.target.value)}></textarea>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default ComposeModal;
