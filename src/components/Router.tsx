import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "pages/home";
import PostListPage from "pages/posts";
import PostDetail from "pages/posts/detail";
import PostNew from "pages/posts/new";
import PostEdit from "pages/posts/edit";
import ProfilePage from "pages/profile";
import ProfileEdit from "pages/profile/edit";
import SearchPage from "pages/search";
import NotificationsPage from "pages/notifications/notifications";
import LoginPage from "pages/users/login";
import SignupPage from "pages/users/singup";
export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>

      {/* 1. POST */}
      <Route path="/posts" element={<PostListPage />}></Route>
      <Route path="/posts/:id" element={<PostDetail />}></Route>
      <Route path="/posts/new" element={<PostNew />}></Route>
      <Route path="/posts/edit/:id" element={<PostEdit />}></Route>

      {/* 2. PROFILE */}
      <Route path="/profile" element={<ProfilePage />}></Route>
      <Route path="/profile/edit" element={<ProfileEdit />}></Route>

      {/* 3. NOTIFICATIONS */}
      <Route path="/notifications" element={<NotificationsPage />}></Route>

      {/* 4. SEARCH */}
      <Route path="/search" element={<SearchPage />}></Route>

      {/* 5. USERS */}
      <Route path="/users/login" element={<LoginPage />}></Route>
      <Route path="/users/signup" element={<SignupPage />}></Route>
      <Route path="*" element={<Navigate replace to="/" />}></Route>
    </Routes>
  );
}
