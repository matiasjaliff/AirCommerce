import React, { useEffect, useState } from "react";
import find from "../utils/functions/findFunction";
import reviews from "../utils/reviews.json";
import ReviewCard from "../components/ReviewCard";
import "../styles/Carousel.scss";

const Carousel = ({id}) => {
    let reviewsAux = [];
    for (let i = 0; i < reviews.length; i++) {
        if (reviews[i].productId.toString() === id) {
            reviewsAux.push(reviews[i])
        }
    }
   

/*     const productId = id;
    const [reviews, setReviews] = useState({})
    useEffect(() => {
        find(`/reviews/${productId}`)
        .then(reviewObj => setReviews(reviewObj))
        .catch(error => console.log(error))
    }, []) */
    //console.log(reviewsAux)
    return(
        <div className="contenedor">
        <div className="slider">
            <ul> 
                {reviewsAux.map(review => <ReviewCard key={review.id} review={review}/>)}    
            </ul>
        </div>
        </div>
    )

}

export default Carousel;