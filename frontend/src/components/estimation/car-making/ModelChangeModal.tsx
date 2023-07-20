import { IconContext } from "react-icons";
import { RiArrowRightSLine } from "react-icons/ri";
import { Model } from "src/types/Model";
import { convertPrice } from "src/common/utils/price-utils";
import { ChangeModel, SpecOption } from "src/types/Spec";
import BackDrop from "src/components/common/BackDrop";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import QueryString from "qs";
import OptionChange from "./OptionChange";

interface Props {
  beforeModel: Model;
  currentPrice: number;
  selectedOption: SpecOption[];
  data: ChangeModel;
  carNameEn: string;
  cancel: () => void;
}

function ModelChangeModal({
  beforeModel,
  data,
  currentPrice,
  selectedOption,
  carNameEn,
  cancel,
}: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const carId = parseInt(queryParams.carId as string);

  const remainOptions = selectedOption.filter(
    (selected) =>
      !data.delOptions.find(
        (delOption) => delOption.optionId === selected.optionId
      ) && selected.optionCategoryId !== 9
  );
  const newPrice =
    remainOptions.reduce((acc, cur) => acc + cur.price, data.modelInfo.price) +
    data.addOptions.reduce((acc, cur) => acc + cur.price, 0);
  const priceDiff = newPrice - currentPrice;

  const onModelChange = () => {
    navigate(`/estimation/making?carId=${carId}&modelId=${data.modelInfo.id}`, {
      state: {
        exteriorColor: data.exteriorColor,
        interiorColor: data.interiorColor,
        selectedOptions: remainOptions,
      },
      relative: "route",
    });
    cancel();
  };

  return (
    <BackDrop
      width={window.screen.width}
      height={window.screen.availHeight}
      position="fixed"
    >
      <ModalBody>
        <div className="flex flex-col text-sm font-bold bg-white justify-center items-center p-6 ">
          <div className="text-lg py-4">
            {data.interiorColor.name}색상은 트림 변경 후 선택 가능합니다.
          </div>
          <div>트림을 변경하시겠습니까?</div>
          <div className="flex flex-row justify-center items-center">
            <div className="flex flex-col w-1/2 items-center">
              <div>현재 트림</div>
              <div className="bg-[#F6F3F2] p-4">
                <img src={`/images/${beforeModel.imgPath}`}></img>
                <div className="flex flex-col">
                  <span>{beforeModel.trimName}</span>
                  <span>{convertPrice(beforeModel.price)}원</span>
                </div>
              </div>
            </div>
            <div className="h-full flex items-center">
              <IconContext.Provider value={{ size: "30px" }}>
                <RiArrowRightSLine />
              </IconContext.Provider>
            </div>
            <div className="flex flex-col w-1/2 items-center">
              <div>변경 트림</div>
              <div className="bg-[#F6F3F2] p-4">
                <img src={`/images/${data.modelInfo.imgPath}`}></img>
                <div className="flex flex-col">
                  <span>{data.modelInfo.trimName}</span>
                  <span>{convertPrice(data.modelInfo.price)}원</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full my-8">
            {data.delOptions.length > 0 && (
              <div className="flex flex-col">
                <h2 className="mb-2">변경 시 선택 해제되는 품목</h2>
                <ul
                  style={{
                    borderTop: "1px solid black",
                    borderBottom: "1px solid black",
                  }}
                >
                  {data.delOptions.map((delOption) => {
                    return (
                      <OptionChange
                        key={delOption.optionId}
                        option={delOption}
                        carNameEn={carNameEn}
                      ></OptionChange>
                    );
                  })}
                </ul>
              </div>
            )}
            {data.addOptions.length > 0 && (
              <div className="flex flex-col mt-6">
                <h2 className="mb-2">추가되는 품목</h2>
                <ul
                  style={{
                    borderTop: "1px solid black",
                    borderBottom: "1px solid black",
                  }}
                >
                  {data.addOptions.map((addOption) => {
                    return (
                      <OptionChange
                        key={addOption.optionId}
                        option={addOption}
                        carNameEn={carNameEn}
						add={true}
                      ></OptionChange>
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
            <button className="py-2 px-8 mr-1 bg-[#666666]" onClick={cancel}>
              취소
            </button>
            <button className="py-2 px-8 bg-[#002C5F]" onClick={onModelChange}>
              확인
            </button>
          </div>
        </div>
      </ModalBody>
    </BackDrop>
  );
}

export default ModelChangeModal;

const ModalBody = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 700px;
  overflow-y: scroll;

  @media (max-width: 800px) {
    width: 500px;
  }
`;
