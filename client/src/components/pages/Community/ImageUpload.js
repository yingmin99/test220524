import React from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

function ImageUpload(props) {
  /* 
    네이버클라우드 Object Storage 사용
    참고: 정규 계정 사용, 유료입니다.
    1. 사용자가 이미지를 업로드
    2. 업로드 한 이미지를 받아서 서버에서 저장
    3. 저장한 이미지의 경로를 클라이언트에게 전송
    4. 경로를 받아 post model에 저장 
    */
  const FileUpload = (e) => {
    console.log("파일업로드이벤트", e.target.files);
    var formData = new FormData();
    //append로 데이터 추가: file이라는 이름으로, 어떤 것(첫 번째 원소를) 추가
    formData.append("file", e.target.files[0]);
    //console.log(forData)를 하면 그냥 빈 오브젝트가 나옴 {}
    //-> XMLHttpRequest: 전송할 키와 벨류의 집합을 컴파일한 특수한 집합의 형태이므로 반복문으로 출력해야 함
    for (const keyValue of formData) console.log("키벨류", keyValue);

    axios.post("/api/post/image/upload", formData).then((response) => {
      console.log("응답 데이터", response.data);
      props.setImage(response.data.filepath);
    });
  };
  return (
    <div>
      <Form.Control
        type="file"
        className="shadow-none"
        accept="image/*"
        onChange={(e) => FileUpload(e)}
      />
    </div>
  );
}

export default ImageUpload;
