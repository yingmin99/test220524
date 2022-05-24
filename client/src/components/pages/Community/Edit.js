import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { UploadDiv, UploadForm, UploadButtonDiv } from "../../Style/UploadCSS";
import ImageUpload from "./ImageUpload.js";

function Edit() {
  let params = useParams();
  let navigate = useNavigate();

  const [Content, setContent] = useState("");
  const [Title, setTitle] = useState("");
  const [setPostInfo] = useState({}); // Object type
  const [Image, setImage] = useState("");
  const [Flag, setFlag] = useState(false);

  //글 정보 불러오기
  useEffect(() => {
    let body = {
      postNum: params.postNum,
    };
    axios
      .post("/api/post/detail", body)
      .then((response) => {
        if (response.data.success) {
          setPostInfo(response.data.post);
          setTitle(response.data.post.title);
          setContent(response.data.post.content);
          setImage(response.data.post.image);
          console.log("현재 글의 이미지", response.data.post.image);

          setFlag(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.postNum,setPostInfo]);

  //글 번호에 해당하는 정보로 수정폼 채워넣기
  // useEffect(() => {
  // setTitle(response.data.post.title);
  // setContent(response.data.post.content);
  // setImage(response.data.post.image);
  // }, [PostInfo]);
  //두번 불러와지는 오류 있었음 처음 undefined, 두번째 실제 value로 받아와짐
  //(undefined일 때 uncontrolled value이기 때문에)
  //선생님이 조건에 PostInfo를 넣어둔 이유가 뭔지..?

  //글 수정
  const onSubmit = (e) => {
    e.preventDefault();

    if (Title === "" || Content === "") {
      return alert("모든 항목을 채워주세요");
    }

    let body = {
      title: Title,
      content: Content,
      postNum: params.postNum,
      image: Image,
    };

    axios
      .post("/api/post/edit", body)
      .then((response) => {
        if (response.data.success) {
          alert("글 수정이 완료되었습니다.");
          navigate(`/post/${params.postNum}`);
        } else {
          alert("글 수정에 실패하였습니다");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <UploadDiv>
      {Flag && (
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
              className="cancel"
              onClick={(e) => {
                e.preventDefault();
                navigate("/list");
              }}
            >
              취소
            </button>
            <button
              onClick={(e) => {
                onSubmit(e);
              }}
            >
              수정
            </button>
          </UploadButtonDiv>
        </UploadForm>
      )}
    </UploadDiv>
  );
}

export default Edit;
