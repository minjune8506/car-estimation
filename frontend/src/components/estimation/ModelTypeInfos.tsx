import useModelFilter from "../../hooks/queries/model/useModelFilter";
import Engine from "./Engine";
import Mission from "./Mission";
import Drivingtype from "./Drivingtype";

interface ModelTypeInfosProps {
  carId: number;
}

export default ({ carId }: ModelTypeInfosProps) => {
  console.log("model type info re-rendered");

  const { data, isLoading, error } = useModelFilter({
    carId,
  });

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (error) {
    return <div>{`오류 발생 ${error}`}</div>;
  }

  console.log("date fetch success", data);

  return (
    <div className="flex flex-row">
      <Engine engines={data.engines} carId={carId}></Engine>
      <Mission missions={data.missions} carId={carId}></Mission>
      <Drivingtype drivingTypes={data.drivingTypes}></Drivingtype>
    </div>
  );
};
