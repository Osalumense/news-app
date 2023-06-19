import React from "react";
import { FaArrowRight } from "react-icons/fa";

import ArticlesCard from "../../components/ArticlesCard";
import {useMutation, useQuery} from "@tanstack/react-query";
import { getAllPosts } from "../../services/index/posts";
import { toast } from "react-hot-toast";
import ArticleCardLoader from "../../components/ArticleCardLoader";
import ErrorMessage from "../../components/ErrorMessage";
import {useSelector} from "react-redux";
import {FiSearch} from "react-icons/fi";
import {images} from "../../constants";
import {useState} from "react";
import {updateProfile} from "../../services/index/users";
import {userActions} from "../../store/reducers/userReducers";

const Articles = () => {

  const userState = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAllPosts({ token: userState.userInfo?userState.userInfo.token:'',searchData: { searchQuery}, }),
    queryKey: ["posts",searchQuery],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  return (
      <>
      <section className="container mx-auto flex flex-col px-5 py-5 lg:flex-row">
          <div className="mt-10 lg:w-1/2">
              <h1 className="font-roboto text-3xl text-center font-bold text-dark-soft md:text-5xl lg:text-4xl xl:text-5xl lg:text-left lg:max-w-[540px]">
                  Read the most interesting articles
              </h1>
              <p className="text-dark-light mt-4 text-center md:text-xl lg:text-base xl:text-xl lg:text-left">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua
              </p>
              <div className="flex flex-col gap-y-2.5 mt-10 lg:mt-6 xl:mt-10 relative">
                  <div className="relative">
                      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#959EAD]" />
                      <input
                          className="placeholder:font-bold font-semibold text-dark-soft placeholder:text-[#959EAD] rounded-lg pl-12 pr-3 w-full py-3 focus:outline-none shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] md:py-4"
                          type="text"
                          placeholder="Search article title"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                      />
                  </div>
              </div>

          </div>
          <div className="hidden lg:block lg:1/2">
              <img
                  className="w-full"
                  src={images.HeroImage}
                  alt="users are reading articles"
              />
          </div>
      </section>

    <section className="flex flex-col container mx-auto px-5 py-10">
      <div className=" flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
        {isLoading ? (
          [...Array(3)].map((item, index) => (
            <ArticleCardLoader
              key={index}
              className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
            />
          ))
        ) : isError ? (
          <ErrorMessage message="Couldn't fetch the posts data" />
        ) : (
            data && data.map((post) => (
            <ArticlesCard
              key={post.id}
              post={post}
              className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
            />
          ))
        )}
      </div>
      <button className="mx-auto flex items-center gap-x-2 font-bold text-primary border-2 border-primary px-6 py-3 rounded-lg">
        <span>More articles</span>
        <FaArrowRight className="w-3 h-3" />
      </button>
    </section>
      </>
  );
};

export default Articles;
