import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import List from "./List";
import axios from "axios";
import { DropdownButton, Dropdown } from "react-bootstrap";

function ComMain() {
  const [PostList, setPostList] = useState([]);
  const [Sort, setSort] = useState("최신순");
  //   useEffect(() => {
  //     getPostList;
  //   }, [Sort]);
  useEffect(() => {
    let body = {
      sort: Sort,
    };
    axios
      .post("api/post/list", body)
      .then((response) => {
        if (response.data.success) {
          console.log("처음", response.data);
          setPostList([...response.data.postList]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Sort]);
  return (
    <div>
      <Link to="/upload">글쓰기</Link>

      <DropdownButton variant="outline-secondary" title={Sort}>
        <Dropdown.Item onClick={() => setSort("최신순")}>최신순</Dropdown.Item>
        <Dropdown.Item onClick={() => setSort("인기순")}>최신순</Dropdown.Item>
      </DropdownButton>
      <List PostList={PostList} />
    </div>
  );
}

export default ComMain;
