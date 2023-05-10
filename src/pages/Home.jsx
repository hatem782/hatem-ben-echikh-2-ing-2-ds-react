import React, { useEffect, useState } from "react";
import HeaderFilter from "../components/HeaderFilter";

import { fetchRecipes } from "../services/Service";
import Recipe from "../components/Recette";

function Home() {
  const [loading, setloading] = useState(true);
  const [filter, setfilter] = useState({ title: "", category: "all" });
  const [recettes, setrecettes] = useState([]);

  useEffect(() => {
    setloading(true);
    fetchRecipes().then((data) => {
      console.log(filter);

      let filter_by_title = data.filter((one) => {
        if (filter.title === "") {
          return true;
        } else {
          return (
            one.title.toLowerCase().indexOf(filter.title.toLowerCase()) !== -1
          );
        }
      });

      let filter_by_categs = filter_by_title.filter((one) => {
        if (filter.category === "all") {
          return true;
        } else {
          return one.category === filter.category;
        }
      });

      setrecettes(filter_by_categs);
      setloading(false);
    });
  }, [filter]);

  useEffect(() => {}, [filter]);

  return (
    <div>
      <HeaderFilter getFilter={setfilter} />
      {loading ? (
        <h2>Loading ...</h2>
      ) : (
        <div>
          {recettes.map((recette, key) => {
            return <Recipe key={key} recette={recette} />;
          })}
        </div>
      )}
    </div>
  );
}

export default Home;
