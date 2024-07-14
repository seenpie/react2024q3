import Layout from "../../components/Layout/Layout.tsx";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <Layout>
      <div>Not Found</div>
      <Link to="/">back</Link>
    </Layout>
  );
}

export default NotFoundPage;
