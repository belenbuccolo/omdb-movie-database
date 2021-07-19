import React from "react";

// Material-ui components
import TextField from "@material-ui/core/TextField";

// Local
import s from "./style.module.css";

const searchForm = function ({ handleQuery, query }) {
  return (
    <div className={s["search-form"]}>
      <TextField
        className={s.input}
        id="outlined-basic"
        label="Search..."
        variant="outlined"
        value={query}
        onChange={handleQuery}
      />
    </div>
  );
};

export default searchForm;
