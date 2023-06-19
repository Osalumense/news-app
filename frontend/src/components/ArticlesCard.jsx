import React from "react";
import { images } from "../constants";

const ArticlesCard = ({ post, className }) => {
  return (
    <div
      className={`rounded-sm shadow-lg ${className}`}
    >
      <a href={`${post.url}`} target="_blank">
        <img
          src={
            post.images
              ?post.images
              : images.samplePostImage
          }
          alt="title"
          className="w-full rounded-md object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60"
        />
      </a>
      <div className="p-5">
        <a href={`${post.url}`} target="_blank">
          <p className="bg-green-500 w-24 items-center leading-none text-sm font-medium text-gray-50 pt-1.5 pr-3 pb-1.5 pl-3 rounded-full uppercase inline-block">
            {post.source_name}
          </p>
          <h2 className="text-lg font-bold sm:text-xl md:text-2xl">
            {post.title}
          </h2>          
        </a>
        <div className="pt-8 pr-0 pb-0 pl-0 flex justify-between">
              <p className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-0 underline">
                {post.author}
              </p>
              <p className="font-bold text-dark-light italic text-sm md:text-base">· 
                {new Date(post.published_at).getDate()}{" "}
                {new Date(post.published_at).toLocaleString("default", {
                  month: "long",
                })}
              </p>
          </div>          
        </div>
      </div>
  );
};

export default ArticlesCard;
