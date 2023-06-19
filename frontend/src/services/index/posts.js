import axios from "axios";

export const getAllPosts = async ({ token,searchData }) => {
  try {

    if (token!='') {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      if (searchData.searchQuery!=''){
        console.log("AAA")
        const { data } = await axios.get("/api/v1/personalizedArticle?params="+searchData.searchQuery, config);
        return data.data;
      }else {
        const { data } = await axios.get("/api/v1/personalizedArticle", config);
        return data.data;
      }
    }else{
      if (searchData.searchQuery!=''){
        const {data} = await axios.get("/api/v1/articles?params="+searchData.searchQuery);
        return data.data;
      }else {
        const {data} = await axios.get("/api/v1/articles");
        return data.data;
      }
    }
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getSinglePost = async ({ slug }) => {
  try {
    const { data } = await axios.get(`/api/v1/posts/${slug}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
