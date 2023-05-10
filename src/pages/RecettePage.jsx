import React from "react";
import { useParams } from "react-router-dom";
import { fetchRecipeById } from "../services/Service";

function RecettePage() {
  const [recette, setrecette] = useState(null);
  const { _id } = useParams();

  useEffect(() => {
    fetchRecipeById(_id).then((data) => {
      console.log(data);
    });
  }, [_id]);

  return <div>Recette page {_id}</div>;
}

export default RecettePage;
