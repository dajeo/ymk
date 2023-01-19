import { ReactNode } from "react";

interface Props {
  children: ReactNode
}

export function Item({ children }: Props) {
  return (
    <span className="item" style={{ display: "list-item", listStylePosition: "inside" }}>
        {children}
    </span>
  );
}
