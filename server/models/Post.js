const mongoose = require("mongoose");
//const { default: userSlice } = require("../../client/src/Reducer/userSlice.js");

//글 데이터용 스키마
const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    postNum: Number,
    image: String,
    author: {
      //DB간 연동을 위해서 userID에 해당하는 모든 정보가 author에 해당
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //User스키마에 대한 모든 데이터가 author이라는 이름으로 Post스키마에 저장되는거야~
    },
  },
  { collection: "posts", timestamps: true }
  //timestamps 지정: createdAt, updatedAt 으로 생성시간, 수정시간 알 수 있음
);

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
