import React from "react";
import PropTypes from "prop-types";

export function Item({ children }) {
  return (
    <span style={{ display: "list-item", listStylePosition: "inside" }}>
        {children}
    </span>
  );
}

Item.propTypes = {
  children: PropTypes.string
};
