import Router from "components/Router";
import { Layout } from "components/Layout";
function App() {
  return (
    /* Layout으로 Router를 감싸면서 모든 페이지에 적용 */
    <Layout>
      <Router /> {/* 경로 설정 */}
    </Layout>
  );
}

export default App;
