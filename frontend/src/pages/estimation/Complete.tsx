import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { convertPrice } from "src/common/utils/price-utils";
import { Car } from "src/types/Car";
import { ExteriorColor, InteriorColor } from "src/types/Color";
import { Model } from "src/types/Model";
import { SpecOption } from "src/types/Spec";
import styled from "styled-components";
import html2canvas from "html2canvas";

interface Props {
  carInfo: Car;
  modelInfo: Model;
  selectedOptions: SpecOption[];
  exteriorColor: ExteriorColor;
  interiorColor: InteriorColor;
}

function Complete() {
  const state: Props = useLocation().state;
  const navigate = useNavigate();

  const [isInterior, setIsInterior] = useState<boolean>(false);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const optionPrice = state.selectedOptions.reduce(
    (acc, cur) => acc + cur.price,
    0
  );
  const totalPrice = state.selectedOptions.reduce(
    (acc, cur) => acc + cur.price,
    state.modelInfo.price
  );

  const download = async () => {
    const data = document.getElementById("complete");

    if (data && buttonRef.current) {
      buttonRef.current.style.setProperty("display", "none");

      const canvas = await html2canvas(data);
      const img = canvas.toDataURL();
      const a = document.createElement("a");
      a.href = img;
      a.download = "estimation.png";
      a.click();
      buttonRef.current.style.setProperty("display", "block");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center" id="complete">
        <div className="w-full flex flex-col items-center justify-center font-bold text-lg py-12">
          <h1 className="text-2xl my-2">
            나의 {state.carInfo.carName}(이)가 완성되었습니다.
          </h1>
          <span className="mb-4">{state.modelInfo.name}</span>
          <img
            src={
              isInterior
                ? `/images/car/${state.carInfo.carNameEn}/color/interior/${state.interiorColor.code}/img-interior.png`
                : `/images/car/${state.carInfo.carNameEn}/color/exterior/${state.exteriorColor.code}/001.png`
            }
            alt="차량 이미지"
            className="my-4 w-[800px]"
          />
          <div className="flex flex-row text-sm my-4" ref={buttonRef}>
            <StyledButton
              active={!isInterior}
              onClick={() => setIsInterior(false)}
            >
              Exterior
            </StyledButton>
            <StyledButton
              active={isInterior}
              onClick={() => setIsInterior(true)}
            >
              Interior
            </StyledButton>
          </div>
        </div>
        <div className="flex flex-col w-[800px]">
          <h2
            className="font-bold py-8"
            style={{ borderBottom: "1.5px solid black" }}
          >
            차량 선택사항
          </h2>
          <div
            className="flex flex-row items-center p-8"
            style={{ borderBottom: "1px solid gray" }}
          >
            <div className="w-1/5">
              <h3 className="font-bold mb-4">모델</h3>
              <span className="text-sm">
                {convertPrice(state.modelInfo.price)} 원
              </span>
            </div>
            <div className="grow px-8">
              <h4 className="font-bold text-lg">{state.modelInfo.name}</h4>
            </div>
          </div>
          <div
            className="flex flex-row justify-center p-8"
            style={{ borderBottom: "1px solid gray" }}
          >
            <div className="w-1/5">
              <h3 className="font-bold mb-4">색상</h3>
              <span className="text-sm">0 원</span>
            </div>
            <div className="grow flex flex-row">
              <div className="flex flex-row mr-8">
                <h4 className="font-bold text-sm mr-2">외장색상</h4>
                <img
                  src={`/images/car/${state.carInfo.carNameEn}/color/exterior/${state.exteriorColor.code}/${state.exteriorColor.code}.png`}
                  className="w-[75px] h-[75px] mr-2"
                />
                <span className="text-sm">{state.exteriorColor.name}</span>
              </div>
              <div className="flex flex-row">
                <h4 className="font-bold text-sm mr-2">내장색상</h4>
                <img
                  src={`/images/car/${state.carInfo.carNameEn}/color/interior/${state.interiorColor.code}/${state.interiorColor.code}.png`}
                  className="w-[75px] h-[75px] mr-2"
                />
                <span className="text-sm">{state.interiorColor.name}</span>
              </div>
            </div>
          </div>
          <div
            className="flex flex-row p-8"
            style={{ borderBottom: "1px solid gray" }}
          >
            <div className="w-1/5">
              <h3 className="font-bold mb-4">옵션</h3>
              <span className="text-sm">{convertPrice(optionPrice)} 원</span>
            </div>
            <div className="flex flex-col grow">
              {state.selectedOptions.map((selected) => (
                <div
                  className="grow flex flex-row py-2 items-center"
                  key={selected.optionId}
                >
                  <img
                    src={`/images/car/${state.carInfo.carNameEn}/option/${selected.img}`}
                    className="w-[150px] mr-2"
                  />
                  <span className="text-sm grow">{selected.optionName}</span>
                  <span className="text-sm">
                    {convertPrice(selected.price)} 원
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-row justify-end py-8 items-center">
            <span className="mr-4 text-sm">총 차량 가격</span>
            <span className="text-lg font-bold">
              {convertPrice(totalPrice)} 원
            </span>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center py-8 gap-3">
        <StyledButton active={true} onClick={download}>
          이미지 다운로드
        </StyledButton>
        <StyledButton active={true} onClick={() => navigate("/")}>
          홈으로 이동하기
        </StyledButton>
      </div>
    </>
  );
}

export default Complete;

const StyledButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 2rem;
  font-size: small;
  text-align: center;

  background-color: ${(props) => (props.active ? "#007FA8" : "#E4DCD3")};
  color: ${(props) => (props.active ? "white" : "black")};
`;
