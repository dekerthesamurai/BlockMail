import React, { useState, useEffect } from 'react';
import { getPrettyDate, getPrettyTime } from './helpers';
import '../Mail/Mail.css';
// import ComposeModal from "../../components/ComposeModal/ComposeModal";
import api from '../../api/api';

const Mail2 = () => {
  const [selectedEmailId, setSelectedEmailId] = useState(0);
  const [currentSection, setCurrentSection] = useState('inbox');
  const [emails, setEmails] = useState([]);
  const [ isComposeOpen, setIsComposeOpen ] = useState(false);
  // const { isOpen, onClose, onSubmit } = props;
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');



  const handleSubmit = () => {
    // Do something with the email and body
    // console.log('handleSubmit')
    api.post('a/mail/sendmail',
      {
        "from_user": "",
        "to_user": email,
        "subject": subject,
        "content": body
    })
    .then(response => {
      if (response.status == 200) {
        alert("mail sent successfully")
    }
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
  }
  // const handleSubmit = () => {
  //   // Do something with the email and body
  //   onSubmit({ email, body });
  //   // Reset the form
  //   setEmail('');
  //   setBody('');
  //   // Close the modal
  //   onClose();
  // };
  useEffect(() => {
    // Fetch emails from the provided URL
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch('https://s3-us-west-2.amazonaws.com/s.cdpn.io/311743/dummy-emails.json');
    //     const result = await response.json();
    //     setEmails(result);
    //   } catch (error) {
    //     console.error('Error fetching emails:', error);
    //   }
    // };

    const fetchData = () => {
      api.get("/a/mail/listmail",{
          headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': '{{ csrf_token }}',
          },
      }).then(response => {
          if(response.status === 200){
              setEmails(response.data)
          }
      })
      // .catch(error => {
      //     navigate('/')
      // })
  }


    fetchData();
  }, []);

//   const getPrettyDate = (date) => {
//     date = date.split(' ')[0];
//     const newDate = date.split('-');
//     const month = months[0];
//     return `${month} ${newDate[2]}, ${newDate[0]}`;
//   };

//   const getPrettyTime = (date) => {
//     const time = date.split(' ')[1].split(':');
//     return `${time[0]}:${time[1]}`;
//   };

  const openEmail = (id) => {
    const updatedEmails = emails.map(email =>
      email.id === id ? { ...email, read: true } : email
    );

    setSelectedEmailId(id);
    setEmails(updatedEmails);
  };

  const deleteMessage = (id) => {
    const updatedEmails = emails.map(email =>
      email.id === id ? { ...email, tag: 'deleted' } : email
    );

    let nextEmailId = '';
    for (const email of updatedEmails) {
      if (email.tag === currentSection) {
        nextEmailId = email.id;
        break;
      }
    }

    setSelectedEmailId(nextEmailId);
    setEmails(updatedEmails);
  };

  const setSidebarSection = (section) => {
    let nextSelectedEmailId = selectedEmailId;
    if (section !== currentSection) {
      nextSelectedEmailId = '';
    }

    setCurrentSection(section);
    setSelectedEmailId(nextSelectedEmailId);
  };

  const currentEmail = emails.find((email) => email.id === selectedEmailId);
  const unreadCount = emails.reduce((previous, msg) => {
    return msg.read !== 'true' ? previous + 1 : previous;
  }, 0);

  const deletedCount = emails.reduce((previous, msg) => {
    return msg.tag === 'deleted' ? previous + 1 : previous;
  }, 0);
  const handleModal = () => {
    console.log('clicked')
    setIsComposeOpen(!isComposeOpen)
  }
  {/* <Sidebar emails={emails} setSidebarSection={setSidebarSection} setIsComposeOpen={setIsComposeOpen} isComposeOpen={isComposeOpen} /> */}
  return (
    <div>
      <div id="sidebar">
      <div className="sidebar__compose">

        <button  className="btn compose" onClick={handleModal}>
          Compose <span className="fa fa-pencil-alt" ></span>
        </button>
      </div>
      <ul className="sidebar__inboxes">
        <li onClick={() => setSidebarSection('inbox')}>
          <a>
            <span className="fa fa-inbox"></span> Inbox
            <span className="item-count">{unreadCount}</span>
          </a>
        </li>
        <li onClick={() => setSidebarSection('sent')}>
          <a>
            <span className="fa fa-paper-plane"></span> Sent
            <span className="item-count">0</span>
          </a>
        </li>
        <li onClick={() => setSidebarSection('drafts')}>
          <a>
            <span className="fa fa-pencil-square-o"></span> Drafts
            <span className="item-count">0</span>
          </a>
        </li>
        <li onClick={() => setSidebarSection('deleted')}>
          <a>
            <span className="fa fa-trash-o"></span> Trash
            <span className="item-count">{deletedCount}</span>
          </a>
        </li>
      </ul>
    </div>
      <div className="inbox-container">
        <EmailList
          emails={emails.filter((email) => email.tag === currentSection)}
          onEmailSelected={openEmail}
          selectedEmailId={selectedEmailId}
          currentSection={currentSection}
        />
        <EmailDetails email={currentEmail} onDelete={deleteMessage} />
      </div>
      {isComposeOpen && (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-solid border-red-500 p-4">
        <button onClick={() => (setIsComposeOpen(!isComposeOpen))}>Close</button>
        {/* Your modal content */}
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Subject:</label>
        <textarea value={subject} onChange={(e) => setSubject(e.target.value)}></textarea>
        <label>Body:</label>
        <textarea value={body} onChange={(e) => setBody(e.target.value)}></textarea>
        <button onClick={handleSubmit}>Submit</button>
        {/* Close button */}
        <button onClick={() => setIsComposeOpen(!isComposeOpen)}>Close</button>
      </div>
    )}
    </div>
  );
};

const Sidebar = ({ emails, setSidebarSection, isComposeOpen, setIsComposeOpen }) => {
  const unreadCount = emails.reduce((previous, msg) => {
    return msg.read !== 'true' ? previous + 1 : previous;
  }, 0);

  const deletedCount = emails.reduce((previous, msg) => {
    return msg.tag === 'deleted' ? previous + 1 : previous;
  }, 0);

  return (
    <div id="sidebar">
      <div className="sidebar__compose">

        <a href="#" className="btn compose" onClick={() => setIsComposeOpen(!isComposeOpen)}>
          Compose <span className="fa fa-pencil-alt" ></span>
        </a>
      </div>
      <ul className="sidebar__inboxes">
        <li onClick={() => setSidebarSection('inbox')}>
          <a>
            <span className="fa fa-inbox"></span> Inbox
            <span className="item-count">{unreadCount}</span>
          </a>
        </li>
        <li onClick={() => setSidebarSection('sent')}>
          <a>
            <span className="fa fa-paper-plane"></span> Sent
            <span className="item-count">0</span>
          </a>
        </li>
        <li onClick={() => setSidebarSection('drafts')}>
          <a>
            <span className="fa fa-pencil-square-o"></span> Drafts
            <span className="item-count">0</span>
          </a>
        </li>
        <li onClick={() => setSidebarSection('deleted')}>
          <a>
            <span className="fa fa-trash-o"></span> Trash
            <span className="item-count">{deletedCount}</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

const EmailListItem = ({ email, onEmailClicked, selected }) => {
  let classes = 'email-item';
  if (selected) {
    classes += ' selected';
  }

  console.log('email', email)
  return (
    <div onClick={() => onEmailClicked(email.id)} className={classes}>
      <div className="email-item__unread-dot" data-read={email.read}></div>
      <div className="email-item__subject truncate">{email.subject}</div>
      <div className="email-item__details">
        <span className="email-item__from truncate">{email.from_name}</span>
        <span className="email-item__time truncate">{getPrettyDate(email.time)}</span>
      </div>
    </div>
  );
};

const EmailDetails = ({ email, onDelete }) => {
  if (!email) {
    return <div className="email-content empty"></div>;
  }

  const date = `${getPrettyDate(email.time)} · ${getPrettyTime(email.time)}`;

  const getDeleteButton = () => {
    if (email.tag !== 'deleted') {
      return (
        <span onClick={() => onDelete(email.id)} className="delete-btn fa fa-trash-o"></span>
      );
    }
    return undefined;
  };

  return (
    <div className="email-content">
      <div className="email-content__header">
        <h3 className="email-content__subject">{email.subject}</h3>
        {getDeleteButton()}
        <div className="email-content__time">{date}</div>
        <div className="email-content__from">{email.from_name}</div>
      </div>
      <div className="email-content__message">{email.message}</div>
    </div>
  );
};

const EmailList = ({ emails, onEmailSelected, selectedEmailId }) => {
  if (emails.length === 0) {
    return <div className="email-list empty">Nothing to see here, great job!</div>;
  }

  return (
    <div className="email-list">
      {emails.map((email) => (
        <EmailListItem
          onEmailClicked={(id) => onEmailSelected(id)}
          email={email}
          selected={selectedEmailId === email.id}
          key={email.id}
        />
      ))}
    </div>
  );
};

export default Mail2;
