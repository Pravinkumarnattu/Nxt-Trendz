import { useParams } from "react-router-dom";
const ParamsWrapper = ({ render }) => {
  const { id } = useParams();
  return render(id);
};

export default ParamsWrapper;
