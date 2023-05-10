import React, { useState, useEffect } from "react";
import "./styles.css";

import { fetchCategories } from "../services/Service";

function HeaderFilter({ getFilter = () => {} }) {
  const [local_filter, set_local_filter] = useState({
    title: "",
    category: "all",
  });

  const [categs, setcategs] = useState([]);

  useEffect(() => {
    fetchCategories().then((data) => {
      setcategs(data);
    });
  }, []);

  const handle_change = (e) => {
    const { name, value } = e.target;
    set_local_filter({ ...local_filter, [name]: value });
  };

  const handle_submit = () => {
    getFilter(local_filter);
  };

  return (
    <div className="header_filter">
      Titre : <input type="text" onChange={handle_change} name="title" />
      <br />
      Category{" "}
      <select
        style={{ width: "100px" }}
        name="category"
        onChange={handle_change}
      >
        <option value="all">all</option>
        {categs.map((categ, key) => {
          return (
            <option key={key} value={categ}>
              {categ}
            </option>
          );
        })}
      </select>
      <button onClick={handle_submit}>Search</button>
    </div>
  );
}

export default HeaderFilter;
