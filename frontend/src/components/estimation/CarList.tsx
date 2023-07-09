import { useNavigate } from "react-router-dom";
import { Car } from "../../types/Car";
import { convertPrice } from "../../common/utils/price-utils";

interface CarProps {
  car: Car;
}

function Car({ car }: CarProps) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`?carId=${car.carId}`);
  };

  return (
    <button
      className="flex flex-col items-center px-2 py-2 w-44"
      onClick={onClick}
    >
      <div>
        <img src={`/images/${car.carImg}`} className="object-cover"></img>
      </div>
      <div className="font-bold text-sm">{car.carName}</div>
      <div className="text-xs text-gray-500">
        {convertPrice(car.lowPrice, 10000)}만원 ~
      </div>
    </button>
  );
}

interface CarListProps {
  cars: Car[];
}

export default ({ cars }: CarListProps) => {
  return (
    <div className="flex flex-row">
      {cars.map((car) => (
        <Car car={car} key={car.carId}></Car>
      ))}
    </div>
  );
};
