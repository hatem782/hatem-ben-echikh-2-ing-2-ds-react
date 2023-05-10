import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipeById, fetchIngredients } from "../services/Service";

function RecettePage() {
  const [recette, setrecette] = useState(null);
  const [my_ingreds, set_my_ingreds] = useState([]);
  const [all_ingreds, setall_ingreds] = useState([]);
  const [not_exist_ingreds, set_not_exist_ingreds] = useState([]);

  const [select, setselect] = useState("");

  const { _id } = useParams();

  useEffect(() => {
    fetchRecipeById(_id).then((data) => {
      setrecette(data);
      if (data.ingredients) {
        set_my_ingreds(data.ingredients);
      }
    });

    fetchIngredients().then((data) => {
      setall_ingreds(data);
    });
  }, [_id]);

  useEffect(() => {
    if (recette && recette.ingredients) {
      let exist_ingreds = recette.ingredients.map((item) => {
        return item.id;
      });

      let new_not_exist_ingreds = all_ingreds.filter((item) => {
        return exist_ingreds.indexOf(item.id) === -1;
      });

      set_not_exist_ingreds(new_not_exist_ingreds);
    } else {
      set_not_exist_ingreds(all_ingreds);
    }
  }, [recette, all_ingreds]);

  const handle_add_ingred = (e) => {
    setselect(e.target.value);
    const ingred_id = Number(e.target.value);
    if (ingred_id) {
      let new_my_ingredients = [
        ...my_ingreds,
        { id: ingred_id, quantity: "0" },
      ];
      set_my_ingreds(new_my_ingredients);

      let new_not_exist_ingreds = not_exist_ingreds.filter((item) => {
        return item.id !== ingred_id;
      });
      set_not_exist_ingreds(new_not_exist_ingreds);
      setselect("");
    }
  };

  return (
    <div>
      {!recette ? (
        <h2>Loading ..</h2>
      ) : (
        <div>
          <h3>Title : {recette.title} </h3>
          <h3>Category : {recette.category} </h3>
          <ul>
            {my_ingreds.map((ingred, key) => {
              return (
                <li key={key}>
                  <input type="text" defaultValue={ingred.quantity} />{" "}
                  {
                    all_ingreds.find((item) => {
                      return item.id === ingred.id;
                    }).name
                  }
                </li>
              );
            })}
          </ul>
          Add New Ingredient
          <select
            style={{ width: "100px" }}
            value={select}
            onChange={handle_add_ingred}
          >
            <option value=""></option>
            {not_exist_ingreds.map((item, key) => {
              return (
                <option key={key} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
      )}
    </div>
  );
}

export default RecettePage;
