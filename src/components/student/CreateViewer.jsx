import { useLocation } from "react-router-dom";

const CreateViewer = () => {
  const location = useLocation();

  return (
    <iframe
            src={`${location?.state?.pdf}#toolbar=0&navpanes=0&scrollbar=0`}
            width="100%"
            height="1000vh"
            style={{ border: "none" }}
            />
  );
};

export default CreateViewer;