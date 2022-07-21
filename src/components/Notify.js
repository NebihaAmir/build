import { useState } from "react";
import { useHistory } from "react-router-dom";
import { userSessionExpired } from "../actions/auth";

const Notify = () => {
  const history = useHistory();
  const [notify, setNotify] = useState({
    isOpen: false,
    hide: true,
    message: "",
    type: "",
  });
  const NotifyMessage = ({ isOpen = true, hide = true, message, type }) => {
    if (type == "error") {
      const error = {
        message,
      };
      userSessionExpired(error, history);
    }
    setNotify({
      isOpen,
      message,
      type,
      hide,
    });
  };
  return { NotifyMessage, notify, setNotify };
};

export default Notify;
