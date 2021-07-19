import React from "react";
import { Link } from "react-router-dom";

// Material-ui components
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";

// Material-ui icons
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

// Local
import s from "./style.module.css";

const movieCard = function ({
  id,
  title,
  year,
  poster,
  setMovie,
  addToFavorites,
  isFavorite,
}) {
  return (
    <Grid item xs={6} md={3}>
      <Card className={s.movie_card}>
        <CardContent onClick={() => setMovie(id)}>
          <Link to={`/movies/${id}`}>
            <CardMedia component="img" className={s.movie_card_img} image={poster} />
          </Link>
          <div className={s.card_content}>
            <div className={s.movie_title}>{`${title} (${year})`}</div>
            <Button>
              {!isFavorite(id) && (
                <FavoriteBorderIcon
                  className={s.favorites_icon}
                  onClick={() => addToFavorites(id)}
                />
              )}
              {isFavorite(id) && <FavoriteIcon />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default movieCard;
