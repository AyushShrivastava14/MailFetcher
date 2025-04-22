import { BallTriangle } from "react-loader-spinner";

export default function Loading() {
  return <>
  <BallTriangle
    height={60}
    width={60}
    radius={5}
    color="white"
    ariaLabel="ball-triangle-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />
  <h5>Please Wait...</h5>
  </>
}
