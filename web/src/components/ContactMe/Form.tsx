import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Theme } from "../../redux/reducers/theme";

interface IData {
  Name: string;
  Email: string;
  Project: string;
  Message: string;
}

export function Form() {
  const [data, setData] = useState<IData>();
  const [loading, setLoading] = useState(false);
  const theme = useSelector(
    ({ theme }: { theme: { theme: Theme; icon: string } }) => theme
  );

  const handleDataChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target;

    setData({
      ...data,
      [name]: value,
    } as any);
  };

  const handleSendMessage = () => {
    if (data?.Name && data.Email && data.Project && data.Message && !loading) {
      data.Message = data.Message.replace(/(\r\n|\n|\r)/gm, "-");
      const toastTime = 3000;
      setLoading(true);

      const response: any = axios.post(
        `${import.meta.env.VITE_SERVER_URL_API}/contact`,
        data
      );

      toast.promise(response, {
        pending: {
          render: () => "Please wait...",
          theme: theme.theme === Theme.dark ? "dark" : "light",
          autoClose: toastTime,
        },
        success: {
          render: () => {
            setLoading(false);
            return "Message sent";
          },
          theme: theme.theme === Theme.dark ? "dark" : "light",
          autoClose: toastTime,
          closeOnClick: true,
        },
        error: {
          render: () => {
            setLoading(false);
            return "Unable to send message at this time";
          },
          theme: theme.theme === Theme.dark ? "dark" : "light",
          autoClose: toastTime,
          closeOnClick: true,
        },
      });
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
        <a
          className={
            data?.Name && data.Email && data.Project && data.Message && !loading
              ? "button button--flex"
              : " button button--disabled button--flex"
          }
          onClick={handleSendMessage}
        >
          Send Message
          <i className="uil uil-message button__icon"></i>
        </a>
      </div>
    </form>
  );
}
