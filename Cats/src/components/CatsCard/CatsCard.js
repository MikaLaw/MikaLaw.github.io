import React from "react";
import "./CatsCard.css";
import { ReactComponent as Heart } from "../../assets/img/heart.svg";
import { ReactComponent as HeartActive } from "../../assets/img/heart-active.svg";

const CatsCard = ({ cat, changeFavourite }) => {
  const { url, image } = cat;

  const changeFavouriteHandle = () =>
    changeFavourite({
      image_id: cat.id,
      sub_id: "User-1234",
    });

  return (
    <div className="CatsCard__item">
      <div className="CatsCard__img">
        <img src={url ? url : image.url} alt="" />
      </div>
      <div className="CatsCard__btn">
        <Heart className="CatsCard__btn-icon--static" />
        <HeartActive
          className="CatsCard__btn-icon--hover"
          onClick={changeFavouriteHandle}
        />
      </div>
    </div>
  );
};

export default CatsCard;
