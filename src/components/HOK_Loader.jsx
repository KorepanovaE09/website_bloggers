import Loader from "./Loader";

const HOK_Loader = ({ isLoading, data, children }) => {
  if (isLoading || !data) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default HOK_Loader;
