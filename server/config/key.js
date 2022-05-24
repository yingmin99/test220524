if (process.env.NODE_ENV === "production") {
  //배포상태
  module.exports = require("./prod");
} else {
  //개발상태
  module.exports = require("./dev");
}
//콘솔에 모드 바꿀떄 set node_ENV = production / dev (노드js에서 개발환경설정)
