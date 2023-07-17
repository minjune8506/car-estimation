import { IconContext } from "react-icons";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsFillXCircleFill } from "react-icons/bs";
import { convertPrice } from "src/common/utils/price-utils";
import { ConstraintCheck, SpecOption } from "src/types/Spec";
import BackDrop from "src/components/common/BackDrop";
import styled from "styled-components";

function deleteOptions(
  selectedOptions: SpecOption[],
  delOptions: SpecOption[]
) {
  return selectedOptions.filter((selected) =>
    delOptions.find((option) => selected.optionId === option.optionId)
  );
}

function addOption(selectedOptions: SpecOption[], addOptions: SpecOption[]) {
  return selectedOptions.concat(addOptions);
}

interface Props {
  data: ConstraintCheck;
  targetOption: SpecOption;
  setTargetOption: (option: SpecOption | undefined) => void;
  selectedOptions: SpecOption[];
  setSelectedOptions: (options: SpecOption[]) => void;
  setConstraintCheck: (data: ConstraintCheck | undefined) => void;
  carNameEn: string;
}

function OptionConstraintsModal({
  data,
  carNameEn,
  targetOption,
  selectedOptions,
  setSelectedOptions,
  setConstraintCheck,
  setTargetOption,
}: Props) {
  const { delOptions, addOptions } = data;
  const deleted = deleteOptions(selectedOptions, delOptions);
  const remainOptions = addOption(deleted, addOptions);

  const priceDiff =
    addOptions.reduce((acc, cur) => acc + cur.price, 0) -
    delOptions.reduce((acc, cur) => acc + cur.price, 0);
	
  const onAccept = () => {
    setSelectedOptions(remainOptions);
	setConstraintCheck(undefined);
	setTargetOption(undefined);
  };

  const onClose = () => {
    setConstraintCheck(undefined);
    setTargetOption(undefined);
  };

  const sourceOptions = addOptions
    .filter((option) => option.optionId !== targetOption.optionId)
    .concat(
      delOptions.filter((option) => option.optionId !== targetOption.optionId)
    );
  const sourceOption = sourceOptions[0];

  const action = addOptions.length > 1 ? "추가" : "삭제";

  return (
    <BackDrop>
      <ModalBody>
        <div className="flex flex-col text-sm font-bold bg-white justify-center items-center p-6 ">
          <div className="text-lg py-4">
            {targetOption.optionName}옵션은 {sourceOption.optionName} {action}{" "}
            후 선택 가능합니다.
          </div>
          <div>
            {sourceOption.optionName} {action} 후 {targetOption.optionName}를
            추가하시겠습니까?
          </div>
          <div className="w-full my-8">
            {addOptions.length > 0 && (
              <div className="flex flex-col">
                <h2 className="mb-2">추가되는 품목</h2>
                <ul
                  style={{
                    borderTop: "1px solid black",
                    borderBottom: "1px solid black",
                  }}
                >
                  {addOptions.map((option) => {
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
                            <IconContext.Provider
                              value={{ color: "#007FA8", size: "15px" }}
                            >
                              <AiFillCheckCircle />
                            </IconContext.Provider>
                          </div>
                        </div>
                        <div className="grow">{option.optionName}</div>
                        <div>{convertPrice(option.price)}원</div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {delOptions.length > 0 && (
              <div className="flex flex-col mt-6">
                <h2 className="mb-2">삭제되는 품목</h2>
                <ul
                  style={{
                    borderTop: "1px solid black",
                    borderBottom: "1px solid black",
                  }}
                >
                  {delOptions.map((option) => {
                    return (
                      <li
                        key={option.optionId}
                        className="flex flex-row w-full items-center justify-center py-6"
                        style={{ borderBottom: "0.5px solid gray" }}
                      >
                        <div className="relative mr-2">
                          <img
                            src={`/images/car/${carNameEn}/option/${option.img}`}
                            className="w-16 h-12 mr-2"
                          />
                          <div className="absolute -top-1 right-0">
                            <IconContext.Provider
                              value={{ color: "red", size: "15px" }}
                            >
                              <BsFillXCircleFill />
                            </IconContext.Provider>
                          </div>
                        </div>
                        <span className="grow">{option.optionName}</span>
                        <span>{convertPrice(option.price)}원</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
          <div className="flex flex-row w-full justify-between text-lg">
            <span>변경 금액</span>
            <span className="text-[#007FA8]">
              {priceDiff > 0
                ? `+${convertPrice(priceDiff)}`
                : convertPrice(priceDiff)}
              원
            </span>
          </div>
          <div className="flex flex-row w-full justify-center my-4 text-white font-medium">
            <button className="py-2 px-8 mr-1 bg-[#666666]" onClick={onClose}>
              취소
            </button>
            <button className="py-2 px-8 bg-[#002C5F]" onClick={onAccept}>
              확인
            </button>
          </div>
        </div>
      </ModalBody>
    </BackDrop>
  );
}

export default OptionConstraintsModal;

const ModalBody = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 700px;
  overflow-y: scroll;
`;
