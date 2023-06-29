import styled from "styled-components";
import Category from "./Category";
import NavItems from "./NavItems";
import { useSetRecoilState } from "recoil";
import { useQuery } from "react-query";
import { CommonResponseType } from "../common/types/commonResponse";
import { CarCategoryCars } from "./types";
import axios from "axios";
import {
  carCategoryCarsState,
  focusedCarCategoryState,
} from "../home/home_state";
import { API_SERVER, ONE_HOUR } from "../common/constants";

const Wrapper = styled.div`
  display: flex;
  height: 30rem;
`;

function fetchCarCategoryCars(): Promise<
  CommonResponseType<CarCategoryCars[]>
> {
  return axios.get(`${API_SERVER}/car/category/cars`).then((res) => res.data);
}

function ModelNavigation() {
  const setCarCategoryCars = useSetRecoilState(carCategoryCarsState);
  const setIsCategoryFocused = useSetRecoilState(focusedCarCategoryState);

  const { isLoading, error } = useQuery<CommonResponseType<CarCategoryCars[]>>(
    "carCategoryCars",
    fetchCarCategoryCars,
    {
      onSuccess: (data) => {
        if (data.data && data.code === 0) {
          setCarCategoryCars(data.data);
          data.data.length && setIsCategoryFocused(data.data[0].categoryId);
        }
      },
      staleTime: ONE_HOUR,
    }
  );

  if (isLoading) return "로딩중...";

  if (error) return `오류가 발생했습니다. : ${error}`;

  return (
    <Wrapper>
      <Category />
      <NavItems />
    </Wrapper>
  );
}

export default ModelNavigation;
