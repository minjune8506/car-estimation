import { IconContext } from "react-icons";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsFillXCircleFill } from "react-icons/bs";
import { convertPrice } from "src/common/utils/price-utils";
import { SpecOption } from "src/types/Spec";

interface Props {
  option: SpecOption;
  carNameEn: string;
  add?: boolean;
}

function OptionChange({ option, carNameEn, add }: Props) {
  return (
    <li
      key={option.optionId}
      className="flex flex-row w-full items-center justify-center py-6"
      style={{ borderBottom: "0.5px solid gray" }}
    >
      <div className="relative mr-2">
        <img
          src={`/images/car/${carNameEn}/option/${option.img}`}
          className="w-16 h-12"
        />
        <div className="absolute -top-1 -right-1">
          {add ? (
            <IconContext.Provider value={{ color: "#007FA8", size: "15px" }}>
              <AiFillCheckCircle />
            </IconContext.Provider>
          ) : (
            <IconContext.Provider value={{ color: "red", size: "15px" }}>
              <BsFillXCircleFill />
            </IconContext.Provider>
          )}
        </div>
      </div>
      <div className="grow">{option.optionName}</div>
      <div>{convertPrice(option.price)}원</div>
    </li>
  );
}

export default OptionChange;
