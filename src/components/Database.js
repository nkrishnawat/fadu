import axios from "axios";
import { useState, useEffect } from "react";

export const [users, setUsers] = useState([]);
export const [currentPage, setCurrentPage] = useState(1);
const [isLoading, setIsLoading] = useState(false);


const getUsers = (count) => {
  setIsLoading(true);
  axios.get(`https://randomuser.me/api/?page=${currentPage}&results=${count}`)
    .then(res => {
      //setUsers(res.data.results);
      alert('API call happened..')
      setUsers([...users, ...res.data.results]);
      setIsLoading(false);
    });
};

useEffect(() => {
  getUsers(count);
}, [currentPage]);