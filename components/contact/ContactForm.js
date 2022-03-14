import { useRef, useState, useEffect } from "react";
import Notification from "../ui/Notification";
import styles from "./ContactForm.module.css";

const ContactForm = () => {
  const emailInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const messageInputRef = useRef(null);
  const [requestStatus, setRequestStatus] = useState(""); // pending, success, error
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestError(null);
        setRequestStatus(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function sendContactData(contactDetails) {
    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(contactDetails),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailInputRef.current?.value;
    const name = nameInputRef.current.value;
    const message = messageInputRef.current.value;

    const reqBody = {
      email,
      name,
      message,
    };

    setRequestStatus("pending");

    try {
      await sendContactData(reqBody);
      setRequestStatus("success");
      emailInputRef.current.value = "";
      nameInputRef.current.value = "";
      messageInputRef.current.value = "";
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus("error");
    }
  };

  let notification;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way!",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "Your message was sent successfully!",
    };
  }

  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error!",
      message: requestError,
    };
  }

  return (
    <section className={styles.contact}>
      <h1>How can I help you?</h1>
      <form className={styles.form}>
        <div className={styles.controls}>
          <div className={styles.control}>
            <label htmlFor="email">Your email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className={styles.control}>
            <label htmlFor="name">Your name</label>
            <input type="text" id="name" required ref={nameInputRef} />
          </div>
        </div>
        <div className={styles.control}>
          <label htmlFor="message">Your message</label>
          <textarea id="message" rows={5} ref={messageInputRef}></textarea>
        </div>
        <div className={styles.actions}>
          <button type="submit" onClick={handleSubmit}>
            Send message
          </button>
        </div>
      </form>
      {notification && <Notification {...notification} />}
    </section>
  );
};

export default ContactForm;
