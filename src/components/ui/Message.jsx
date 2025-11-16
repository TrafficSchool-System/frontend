import React from "react";

const Message = ({ type = "info", message, className }) => {
  if (!message) return null;

  const typeClass = `message-${type}`; // Dynamisk klass baserat på typen
  const classes = `message ${typeClass} ${className || ""}`; // Kombinera klasser

  return <div className={classes}>{message}</div>;
};

export default Message;