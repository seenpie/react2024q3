import Wrapper from "../../components/Wrapper/Wrapper.tsx";
import { Link } from "@remix-run/react";

function NotFoundPage() {
  return (
    <Wrapper>
      <div>Not Found</div>
      <Link to="/" reloadDocument>
        back
      </Link>
    </Wrapper>
  );
}

export default NotFoundPage;
