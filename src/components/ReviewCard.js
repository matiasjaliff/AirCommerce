import React from "react";
import users from "../utils/users.json";
import { FaUserCircle } from "react-icons/fa";
import StarRating from "./StarRating";
import "../styles/Carousel.scss";

const ReviewCard = ({review}) => {
    const findUser = (reviewUserId) => {
        for (let i = 0; i < users.length; i++) {
            if (reviewUserId === users[i].id) {
                return `${ users[i].name} ${users[i].last_name}`  
            }
        }
    }

    return(
        <li >
            <span>
                {<FaUserCircle style={{color: 'grey', fontSize: '1em'}}/> } {findUser(review.userId)}
                {<StarRating review={review}/>}<br/>
                {review.review}
            </span>
        </li>
    )
}

export default ReviewCard;