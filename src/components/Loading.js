import { CircularProgress } from "@material-ui/core";

const Loading = () => {
  return (
    <div className="flex justify-center align-center margin">
      <CircularProgress color="primary" />
    </div>
  );
};

export default Loading;
