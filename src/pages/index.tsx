import { Link } from "react-router-dom";

function Index() {
  return (
    <>
      <Link to="/main">Main</Link> <Link to="/jill">Jill</Link>{" "}
      <Link to="/stream">Stream</Link>
    </>
  );
}

export default Index;
