import { IconContext } from "react-icons";
import { AiFillInfoCircle } from "react-icons/ai";
import { ModelSelectButton } from "../common/button/Button";
import { ModelType } from "../../types/ModelTypes";

interface ModelTypeProps {
  type: string;
  data: ModelType[];
}

export default ({ type, data }: ModelTypeProps) => {
  return (
    <div className="[&:not(:last-child)]:mr-16">
      <div className="flex flex-row my-2">
        <div className="mr-1">{type}</div>
        <IconContext.Provider value={{ color: "#999999" }}>
          <AiFillInfoCircle></AiFillInfoCircle>
        </IconContext.Provider>
      </div>
      <div className="flex flex-row border-collapse w-44">
        {data.map((data) => (
          <ModelSelectButton selected={true} key={data.id}>
            <span className="py-2">{data.name}</span>
          </ModelSelectButton>
        ))}
      </div>
    </div>
  );
};
