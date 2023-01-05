import React from "react";

interface Props {
  children: React.ReactNode
}

export function Item({ children }: Props) {
  return (
    <span className={"item"} style={{ display: "list-item", listStylePosition: "inside" }}>
        {children}
    </span>
  );
}
