import { Car } from "../../types/Car";

interface CarProps {
  car: Car;
}

function Car({ car }: CarProps) {
  return (
    <button className="flex flex-col items-center px-2 py-2 w-44">
      <div>
        <img src={`/images/${car.carImg}`} className="object-cover"></img>
      </div>
      <div className="font-bold text-sm">{car.carName}</div>
      <div className="text-xs text-gray-500">{car.lowPrice}만원 ~</div>
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
