import { Outlet } from "react-router-dom";
import Header from './components/Header'
import { user } from "../../types";

type LayoutProps = {
  user: user,
  setUser: (arg0: user) => void
}


const Layout = ({ user, setUser }: LayoutProps) => {
  return (
    <>
      <Header user={user} setUser={setUser} />
      <Outlet />
    </>
  )
}



export default Layout
