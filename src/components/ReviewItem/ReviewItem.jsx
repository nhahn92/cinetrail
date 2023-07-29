import React, { useState } from "react";
import "./ReviewItem.css"
import Avatar from "/avatar.jpeg";

export default function ReviewItem({review}) {
    const [showCompleteReview, setShowCompleteReview] = useState(false);

  return (
    <div className="review">
        <div className="avatar-container">
            <img src={Avatar} alt="Avatar" className="avatar" />
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