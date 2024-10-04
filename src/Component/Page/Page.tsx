import { ReactElement } from "react";
import Spinner from "./Spinner";

interface PageProps {
  loading: boolean;
  children: ReactElement;
}

const Page = ({ loading, children }: PageProps) => {
  return (
    <>
      {loading ? (
        <Spinner/>
      ) : (
        children
      )}
    </>
  );
};

export default Page;
