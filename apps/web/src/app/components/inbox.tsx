import { Outlet } from "react-router-dom";

export function Inbox() {
  return (
    <main className="page lists-show">
      <nav>
        <h1 className="title-page">TaskBox</h1>
      </nav>
      <Outlet />
    </main>
  );
}
export default Inbox;
