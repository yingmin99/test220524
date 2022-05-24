var express = require("express");
var router = express.Router();
const multer = require("multer");
//const multer = require("multer-s3");

//model 사용
const { Post } = require("../models/Post.js");
const { Counter } = require("../models/Counter.js");

//모듈로써 이미지 외부저장 함수
const setUpload = require("../Util/upload.js");
const { User } = require("../models/User.js");

//글 제출
router.post("/submit", (req, res) => {
  console.log("16line" + req.body); // -여기서 지금 uid가 안나온다.
  let temp = {
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
  };
  Counter.findOne({ name: "counter" })
    .exec()
    .then((counter) => {
      temp.postNum = counter.postNum;
      User.findOne({ _id: req.body.uid }) // _id가 DB에 지정된 이름. 키값 정확히 지정해줘야함
        .exec()
        .then((userInfo) => {
          temp.author = userInfo._id;
          const CommunityPost = new Post(temp);
          CommunityPost.save().then(() => {
            Counter.updateOne(
              { name: "counter" },
              { $inc: { postNum: 1 } }
            ).then(() => {
              res.status(200).json({ success: true });
            });
          });
        });
    })
    .catch((error) => {
      console.log("글 제출 오류", error);
      res.status(400).json({ success: false });
    });
});

//글 목록
router.post("/list", (req, res) => {
  let sort = {};
  if (req.body.sort === "최신순") sort.createdAt = -1;
  // } else {
  //   //인기순 -> 댓글 많은 순으로 감
  //   //sort.repleNum = -1;

  // }
  Post.find()
    .populate("author") //키를 populate걸어준다 -> doc에 저장된 데이터 중 Obj ID로 저장된거 찾아서
    .sort(sort) //조건을 걸어둔 sort 지정
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, postList: doc });
    })
    .catch((err) => {
      console.log("글 목록 오류", err);
      res.status(400).json({ success: false });
    });
});
//글 세부
router.post("/detail", (req, res) => {
  Post.findOne({ postNum: Number(req.body.postNum) }) //postNum을 string -> number로 형변환
    .populate("author")
    .exec()
    .then((doc) => {
      console.log("글 세부 데이터", doc);
      res.status(200).json({ success: true, post: doc });
    })
    .catch((err) => {
      console.log("에러에러");
      res.status(400).json({ success: false });
    });
});

//글 수정
router.post("/edit", (req, res) => {
  console.log("글수정로그");
  let temp = {
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
  };
  Post.updateOne({ postNum: Number(req.body.postNum) }, { $set: temp })
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.log("글 수정 오류", err);
      res.status(400).json({ success: false });
    });
});

//글 삭제
router.post("/delete", (req, res) => {
  Post.deleteOne({ postNum: Number(req.body.postNum) })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.log("글 삭제 오류", err);
      res.status(400).json({ success: false });
    });
});

/*
//Multer 사용
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "image/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single("file");

//이미지 서버에 업로드
router.post("/image/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log("이미지 업로드 에러", err);
      res.status(400).json({ success: false });
    } else {
      console.log("서버에 이미지 데이터 업로드됨", res.req.file);
      res.status(200).json({ success: true, filepath: res.req.file.path });
    }
  });
});
*/

//네이버 클라우드 (외부저장소)에 이미지 업로드
//setUpload에서 기능이 구현이 되므로 미들웨어를 통해 setUpload()함수를 next인자로 주고
//setUpload에서 bucket의 인자값으로 줄 것을 넘겨준다 : "react-study/post"
router.post(
  "/image/upload",
  setUpload("react-study/post"),
  (req, res, next) => {
    res.status(200).json({ success: true, filepath: res.req.file.location });
  }
);

module.exports = router; //이거 안해주면 403에러남
