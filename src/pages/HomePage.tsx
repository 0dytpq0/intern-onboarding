import { useNavigate } from "react-router-dom";
import Button from "../components/atom/Button";

function HomePage() {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate("/user")}>마이 페이지</Button>
    </div>
  );
}

export default HomePage;
