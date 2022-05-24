import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UploadDiv, UploadForm, UploadButtonDiv } from "../../Style/UploadCSS";
import ImageUpload from "./ImageUpload";
import Auth from "../../../hoc/auth";
import { useSelector } from "react-redux";

function Upload(props) {
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [Image, setImage] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData); //userData라는 obj를 끝까지 파고들어야했음
  //store와 reducer로 받아옴 user

  console.log("현재 로그인되어있는 유저", user);
  const onSubmit = (e) => {
    e.preventDefault();
    if (Title === "" || Content === "") {
      return alert("모든 항목을 채워주세요");
    }
    let body = {
      title: Title,
      content: Content,
      image: Image,
      uid: user._id, //데이터저장한것과 일치한것으로 불러와야하고
    };
    //console.log("28 line" + JSON.stringify(body));
    axios
      .post("/api/post/submit", body)
      .then((response) => {
        if (response.data.success) {
          alert("글 작성이 완료되었습니다.");
          navigate("/community");
        } else {
          alert("글 작성에 실패하였습니다");
        }
      })
      .catch((error) => {
        console.log("에러일떄", body);
        console.log(error);
      });
  };

  return (
    <UploadDiv>
      <UploadForm>
        <label htmlFor="label">제목</label>
        <input
          id="title"
          type="text"
          value={Title}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />
        <ImageUpload setImage={setImage} />
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          value={Content}
          onChange={(e) => {
            setContent(e.currentTarget.value);
          }}
        />
        <UploadButtonDiv>
          <button
            onClick={(e) => {
              onSubmit(e);
            }}
          >
            글쓰기
          </button>
        </UploadButtonDiv>
      </UploadForm>
    </UploadDiv>
  );
}

export default Auth(Upload, true);
