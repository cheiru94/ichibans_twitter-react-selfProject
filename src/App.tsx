import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>HomePage</h1>}></Route>
      <Route path="/posts" element={<h1>게시글 리스트</h1>}></Route>
      <Route path="/posts/:id" element={<h1>게시글 상세</h1>}></Route>
      <Route path="/posts/edit/:id" element={<h1>게시글 수정</h1>}></Route>
      <Route path="/profile" element={<h1>프로필</h1>}></Route>
      <Route path="/profile/edit" element={<h1>프로필 수정</h1>}></Route>
      <Route path="/search" element={<h1>해시태그 검색</h1>}></Route>
      <Route path="/notifications" element={<h1>알림</h1>}></Route>
      <Route path="/users/login" element={<h1>로그인</h1>}></Route>
      <Route path="/users/signup" element={<h1>회원가입</h1>}></Route>
      <Route path="*" element={<Navigate replace to="/" />}></Route>
    </Routes>
  );
}

export default App;
