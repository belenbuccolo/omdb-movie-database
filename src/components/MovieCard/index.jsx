import React from "react";
import { Link } from "react-router-dom";

// Material-ui components
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
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
    <Card className={s.movie_card}>
      <CardContent onClick={() => setMovie(id)}>
        <Link to={`/movies/${id}`}>
          <div className={s.image_container}>
            <img className={s.movie_card_img} src={poster} alt="movie-poster" />
          </div>
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
            {isFavorite(id) && <FavoriteIcon className={s.favorites_icon} />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default movieCard;
