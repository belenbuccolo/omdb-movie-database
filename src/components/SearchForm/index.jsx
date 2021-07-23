import React from "react";

// Material-ui components
import TextField from "@material-ui/core/TextField";

// Local
import s from "./style.module.css";

const searchForm = function ({ handleQuery, query, search }) {
  return (
    <div className={s["search-form"]}>
      <TextField
        className={s.input}
        margin="none"
        type="string"
        id="outlined-basic"
        label="Search..."
        autoFocus
        variant="filled"
        size="small"
        value={query}
        onChange={handleQuery}
        onKeyUp={search}
      />
    </div>
  );
};

export default searchForm;
