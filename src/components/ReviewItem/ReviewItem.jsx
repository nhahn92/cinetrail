import React, { useState } from "react";
import "./ReviewItem.css"
import Avatar from "/avatar.jpeg";

export default function ReviewItem({review}) {
    const [showCompleteReview, setShowCompleteReview] = useState(false);

    let imgSrc = "";
    if (review?.author_details?.avatar_path !== null) {
        // Checks if the avatar_path doesn't include "https" or "http"
        if (!review?.author_details?.avatar_path?.includes("https") &&
            !review?.author_details?.avatar_path?.includes("http"))
            {
                // If the avatar_path doesn't have "https" or "http," include the BASE_IMAGE_URL
                imgSrc = `${import.meta.env.VITE_API_BASE_IMAGE_URL}${review?.author_details?.avatar_path}`
            } else {
                // If the avatar_path has "https" or "http," set the avatar to what's there
                // Slice cuts off the / at the beginning in the API
                imgSrc = review?.author_details?.avatar_path?.slice(1);
            }
    } else {
        // If the avatar_path has "null," sets the avatar to the default image
        imgSrc = Avatar;
    }

  return (
    <div className="review">
        <div className="avatar-container">
            <img src={imgSrc} alt="Avatar" className="avatar" />
            <p>{review.author}</p>
        </div>
        {
            showCompleteReview
            ? (
                <p className="content">
                    {review?.content}
                    <span className="read-less"
                    onClick={() => setShowCompleteReview(false)}>
                        Read Less
                    </span>
                </p>
            ) : (
                <p className="content">
                    {review?.content.slice(0, 300)}...
                    <span className="read-less" onClick={() => setShowCompleteReview(true)}>
                        Read More
                    </span>
                </p>
            )
        }
    </div>
  )
}