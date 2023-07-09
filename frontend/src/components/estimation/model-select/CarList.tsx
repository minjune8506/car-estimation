import { useNavigate } from "react-router-dom";
import { Car } from "../../../types/Car";
import CarItem from "src/components/navigation/Car";

interface CarListProps {
  cars: Car[];
}

export default ({ cars }: CarListProps) => {
  const navigate = useNavigate();
  const navigateToModelSelect = (carId: number) => {
    navigate(`/estimation/model?carId=${carId}`);
  };

  return (
    <div className="flex flex-row">
      {cars.map((car) => (
        <CarItem
          car={car}
          key={car.carId}
          onClick={navigateToModelSelect}
          hoverBackground="#F6F3F2"
          width="200px"
          height="150px"
        />
      ))}
    </div>
  );
};
