import React from "react";
import { Link } from "react-router-dom";
import { ListDiv, ListItem } from "../../Style/ListCSS";
import moment from "moment";
import "moment/locale/ko";

function List(props) {
  const SetTime = (a, b) => {
    if (a !== b) {
      return moment(b).format("YYYY년 MMMM Do, hh:mm") + " (수정됨)";
    } else {
      return moment(a).format("YYYY년 MMMM Do, hh:mm");
    }
  };
  return (
    <ListDiv>
      {props.PostList.map((post, index) => {
        console.log("게시글", post);
        return (
          <ListItem key={index}>
            <Link to={`/post/${post.postNum}`}>
              <p className="title">{post.title}</p>
              <div className="author">
                <p> {post.author.Nickname}</p>
                <p className="time">
                  {SetTime(post.createdAt, post.updatedAt)}
                </p>
              </div>
              <p>{post.content}</p>
            </Link>
          </ListItem>
        );
      })}
    </ListDiv>
  );
}
export default List;
