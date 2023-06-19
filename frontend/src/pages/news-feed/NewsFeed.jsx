import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import MainLayout from "../../components/MainLayout";
import {getSource, updateNewsFeed} from "../../services/index/users";
import { userActions } from "../../store/reducers/userReducers";
import { toast } from "react-hot-toast";

const NewsFeed = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);
  const [dataSourceCheckboxItem, setDataSourceCheckboxItem] = useState([]);

  const {
    data: dataSource,
  } = useQuery({
    queryFn: () => {
      return getSource({ token: userState.userInfo.token });
    },
    queryKey: ["news-feed"],
  });

  const { mutate, isLoading: updateLoading } = useMutation({
    mutationFn: ({ dataSourceCheckboxItem }) => {
      return updateNewsFeed({
        token: userState.userInfo.token,
        userData: { dataSourceCheckboxItem},
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries(["profile"]);
      toast.success("Profile is updated");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    if (!userState.userInfo) {
      navigate("/");
    }
    if (userState.userInfo.interested) {
      setDataSourceCheckboxItem(userState.userInfo.interested);
    }
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });


  const submitHandler = (data) => {
    const { name, email, password } = data;
    mutate({ dataSourceCheckboxItem});
  };

  const handelDataSourceCheckbox = (item) => {
    const isChecked = (dataSourceCheckboxItem && dataSourceCheckboxItem.includes(item));
    if (isChecked) {
      // Item is already checked, remove it from the checkedItems array
      setDataSourceCheckboxItem(dataSourceCheckboxItem.filter((checkedItem) => checkedItem !== item));
    } else {
      // Item is not checked, add it to the checkedItems array
      setDataSourceCheckboxItem([...dataSourceCheckboxItem, item]);
    }
  };




  return (
      <MainLayout>
        <section className="container mx-auto px-5 py-10">
          <div className="w-full max-w-sm mx-auto">
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="flex flex-col mb-6 w-full">
                <h1 className="mb-2 font-bold">Select Data Source</h1>
                {dataSource && dataSource.source.map((item) => (
                    <div key={item} className="flex items-center space-x-4">
                      <input
                          type="checkbox"
                          id={`checkbox-${item}`}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          checked={item !== undefined && dataSourceCheckboxItem && dataSourceCheckboxItem.includes(item)}
                          onChange={() => handelDataSourceCheckbox(item)}
                      />
                      <label
                          htmlFor={`checkbox-${item}`}
                          className="flex items-center cursor-pointer"
                      >
                        <span className="ml-2 text-gray-700">{item}</span>
                      </label>
                    </div>
                ))}
              </div>

              <div className="flex flex-col mb-6 w-full">
                <h1 className="mb-2 font-bold">Select Author</h1>
                {dataSource && dataSource.author.map((item) => (
                    <div key={item} className="flex items-center space-x-4">
                      <input
                          type="checkbox"
                          id={`checkbox-${item}`}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          checked={item !== undefined && dataSourceCheckboxItem && dataSourceCheckboxItem.includes(item)}
                          onChange={() => handelDataSourceCheckbox(item)}
                      />
                      <label
                          htmlFor={`checkbox-${item}`}
                          className="flex items-center cursor-pointer"
                      >
                        <span className="ml-2 text-gray-700">{item}</span>
                      </label>
                    </div>
                ))}
              </div>

              <div className="flex flex-col mb-6 w-full">
                <h1 className="mb-2 font-bold">Select Category</h1>
                {dataSource && dataSource.category.map((item) => (
                    <div key={item} className="flex items-center space-x-4">
                      <input
                          type="checkbox"
                          id={`checkbox-${item}`}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          checked={item !== undefined && dataSourceCheckboxItem && dataSourceCheckboxItem.includes(item)}
                          onChange={() => handelDataSourceCheckbox(item)}
                      />
                      <label
                          htmlFor={`checkbox-${item}`}
                          className="flex items-center cursor-pointer"
                      >
                        <span className="ml-2 text-gray-700">{item}</span>
                      </label>
                    </div>
                ))}
              </div>


              <button
                  type="submit"
                  disabled={!isValid  || updateLoading}
                  className="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                Update
              </button>
            </form>
          </div>
        </section>
      </MainLayout>
  );
};

export default NewsFeed;
