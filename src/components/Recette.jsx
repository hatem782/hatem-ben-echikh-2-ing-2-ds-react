import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Recette({ recette }) {
  const [open, setOpen] = useState(false);
  const show_steps = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (open && !recette?.steps) {
      alert("nothing to show");
    }
  }, [open]);

  return (
    <div className="recipe">
      <NavLink to={`/recette/${recette.id}`}>Update</NavLink>
      <h3>{recette.title}</h3>
      <h3>{recette.category}</h3>
      <h3 onClick={show_steps}>Show steps</h3>
      {open && (
        <ul>
          {recette?.steps?.map((step, key) => {
            return (
              <li>
                <h4 key={key}>{step}</h4>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Recette;
