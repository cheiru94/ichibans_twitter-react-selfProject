import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

/* children 으로 들어오는 내용은 App.tsx  */
export const Layout = ({ children }: LayoutProps) => {
  return <div className="layout">{children}</div>;
};
