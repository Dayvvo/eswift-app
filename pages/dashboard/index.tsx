import Wrapper from "@/components/Wrapper"
import useAuth from "@/hooks/useAuth";
import useProfile from "@/hooks/useProfile";
import DashboardScreen from "@/screens/overview/adminDashboard";
import OverviewScreen from "@/screens/overview/customer";
import { useRouter } from "next/router";
import { useEffect } from "react";


const Dashboard =()=> {
    const { user, isWindow } = useAuth();
    const navigate = useRouter();

    // const logout = () => {
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("userData");
    //   navigate.push("/auth");
    // };
    

    // useEffect(()=> {
    //   if(!user){
    //     logout()
    //   }
    // })
    useEffect(() => {
      if (isWindow) {
        const getCookie = (name: string) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) {
            return decodeURIComponent(parts.pop()?.split(";").shift() || "");
          }
        };
  
        const myCookie = getCookie("auth-cookie");
        if (myCookie) {
          const userData = localStorage.getItem('userData');
          !userData && localStorage.setItem("userData", myCookie);
          const authRoute = sessionStorage.getItem("authRoute");
          if (authRoute) {
            navigate.push(authRoute);
          }
        }
      }
  
      return () => localStorage.removeItem("authRoute");
    }, [isWindow]);
  

    return (
        <Wrapper>
          {
            user?.role === 'ADMIN' ? <DashboardScreen/> : <OverviewScreen/>
          }
        </Wrapper>
    )
}

export default Dashboard;