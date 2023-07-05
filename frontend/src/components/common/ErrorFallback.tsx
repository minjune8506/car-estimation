import BackDrop from "./BackDrop";
import { SelectButton } from "./button/Button";

interface ErrorFallBackProps {
  error?: Error;
  resetErrorBoundary: any;
}

export default function ErrorFallBack({
  error,
  resetErrorBoundary,
}: ErrorFallBackProps) {
  console.error(error?.message);

  return (
    <BackDrop>
      <div
        className="bg-white flex flex-col justify-center items-center w-96 h-72 top-1/2 left-1/2 absolute"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <h1 className="text-2xl mb-2">에러가 발생했습니다.</h1>
        <span className="text-lg mb-4">{error?.message}</span>
        <div className="w-24">
          <SelectButton onClick={resetErrorBoundary} primary={true}>
            다시 시도
          </SelectButton>
        </div>
      </div>
    </BackDrop>
  );
}
