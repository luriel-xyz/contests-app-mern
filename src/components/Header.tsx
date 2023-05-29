import React from "react";

interface IHeader {
  message: string;
}

/**
 * Header Component
 *
 * This component represents a header element that displays a message.
 */
const Header: React.FC = ({ message }: IHeader) => (
  <div className="header">{message}</div>
);

export default Header;
