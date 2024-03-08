import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "pages/home";
import PostListPage from "pages/posts";
import PostDetail from "pages/posts/detail";
import PostNew from "pages/posts/new";
import PostEdit from "pages/posts/edit";
import ProfilePage from "pages/profile";
import ProfileEdit from "pages/profile/edit";
import SearchPage from "pages/search";
import NotificationsPage from "pages/notifications";
import LoginPage from "pages/users/login";
import SignupPage from "pages/users/signup";

/* 라우터에 해당 앱이 로그인 되어있는지 아닌지 판별하는 값을 app페이지로 부터 받기 */

/* 인증된 사용자가 로그인 되었는지 안되었는지 확인 */
interface RouterProps {
  isAuthenticated: boolean;
}

export default function Router({ isAuthenticated }: RouterProps) {
  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="/" element={<Homepage />} />

          {/* 1. POST */}
          <Route path="/posts" element={<PostListPage />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/posts/new" element={<PostNew />} />
          <Route path="/posts/edit/:id" element={<PostEdit />} />

          {/* 2. PROFILE */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />

          {/* 3. NOTIFICATIONS */}
          <Route path="/notifications" element={<NotificationsPage />} />

          {/* 4. SEARCH */}
          <Route path="/search" element={<SearchPage />} />

          <Route path="*" element={<Navigate replace to="/" />} />
        </>
      ) : (
        <>
          {/* 5. USERS */}
          <Route path="/users/login" element={<LoginPage />} />
          <Route path="/users/signup" element={<SignupPage />} />
          {/* 6. 로그인 하지않고 다른 경로로 요청할 때  */}
          <Route path="*" element={<Navigate replace to="/users/login" />} />
        </>
      )}
    </Routes>
  );
}
