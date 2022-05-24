import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
//configureStore를 통해서 리덕스 스토어 생성가눙
import userSlice from "./userSlice";
export default configureStore({
  reducer: {
    user: userSlice,
  },
  //비직렬화 관련 에러를 보지 않기 위해 세팅
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
