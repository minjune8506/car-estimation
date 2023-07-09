import { IconContext } from "react-icons";
import { AiFillInfoCircle } from "react-icons/ai";
import { ReactNode } from "react";

interface ModelTypeProps {
  type: string;
  children: ReactNode;
}

export default ({ type, children }: ModelTypeProps) => {
  return (
    <div className="[&:not(:last-child)]:mr-16">
      <div className="flex flex-row my-2">
        <div className="mr-1">{type}</div>
        <IconContext.Provider value={{ color: "#999999" }}>
          <AiFillInfoCircle></AiFillInfoCircle>
        </IconContext.Provider>
      </div>
      <div className="flex flex-row border-collapse w-44">{children}</div>
    </div>
  );
};
