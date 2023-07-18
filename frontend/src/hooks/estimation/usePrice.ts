import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getModelIdFrom } from "src/common/utils/location-utils";
import { SpecOption } from "src/types/Spec";
import { useModelInfo } from "../queries/model/Model";

interface Props {
  selectedOptions: SpecOption[];
}

function usePrice({ selectedOptions }: Props) {
  const [price, setPrice] = useState(0);

  const location = useLocation();
  const modelId = getModelIdFrom(location);

  const modelInfoQuery = useModelInfo(modelId);

  useEffect(() => {
    if (modelInfoQuery.data) {
      const newPrice = selectedOptions.reduce(
        (acc, cur) => acc + cur.price,
        modelInfoQuery.data.price
      );
      setPrice(newPrice);
    }
  }, [modelInfoQuery.data, selectedOptions]);

  return price;
}

export default usePrice;
