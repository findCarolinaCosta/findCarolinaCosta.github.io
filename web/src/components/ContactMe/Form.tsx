import axios from "axios";
import { useState } from "react";

interface IData {
  Name: string;
  Email: string;
  Project: string;
  Message: string;
}

export function Form() {
  const [data, setData] = useState<IData>();

  const handleDataChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target;

    setData({
      ...data,
      [name]: value,
    } as any);
  };

  const handleSendMessage = async () => {
    if (data) {
      data.Message = data.Message.replace(/(\r\n|\n|\r)/gm, "-");
      await axios.post(`${import.meta.env.VITE_SERVER_URL_API}/contact`, data);
    }
  };

  return (
    <form action="" className="contact__form grid">
      <div className="contact__inputs grid">
        <div className="contact__content">
          <label htmlFor="name" className="contact__label">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="contact__input"
            name="Name"
            value={data?.Name}
            onChange={handleDataChange}
          />
        </div>
        <div className="contact__content">
          <label htmlFor="email" className="contact__label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="contact__input"
            name="Email"
            value={data?.Email}
            onChange={handleDataChange}
          />
        </div>
      </div>

      <div className="contact__content">
        <label htmlFor="subject" className="contact__label">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          className="contact__input"
          name="Project"
          value={data?.Project}
          onChange={handleDataChange}
        />
      </div>

      <div className="contact__content">
        <label htmlFor="message" className="contact__label">
          Message
        </label>
        <textarea
          name="Message"
          value={data?.Message}
          id="message"
          cols={0}
          rows={7}
          className="contact__input"
          onChange={handleDataChange}
        />
      </div>

      <div>
        <a className="button button--flex" onClick={handleSendMessage}>
          Send Message
          <i className="uil uil-message button__icon"></i>
        </a>
      </div>
    </form>
  );
}
