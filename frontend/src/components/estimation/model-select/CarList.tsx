import { Car } from "../../../types/Car";
import CarItem from "src/components/navigation/Car";

interface CarListProps {
  cars: Car[];
  onNavigate: (carId: number) => void;
}

export default ({ cars, onNavigate }: CarListProps) => {
  return (
    <div className="flex flex-row">
      {cars.map((car) => (
        <CarItem
          car={car}
          key={car.carId}
          onClick={onNavigate}
          hoverBackground="#F6F3F2"
          width="200px"
          height="150px"
        />
      ))}
    </div>
  );
};
