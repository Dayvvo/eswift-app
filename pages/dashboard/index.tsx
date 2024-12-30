import Wrapper from "@/components/Wrapper"
import useAuth from "@/hooks/useAuth";
import useProfile from "@/hooks/useProfile";
import DashboardScreen from "@/screens/overview/adminDashboard";
import OverviewScreen from "@/screens/overview/customer";
import { useRouter } from "next/router";
import { useEffect } from "react";


const Dashboard =()=> {
    const { user } = useAuth();
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

    return (
        <Wrapper>
          {
            user?.role === 'ADMIN' ? <DashboardScreen/> : <OverviewScreen/>
          }
        </Wrapper>
    )
}

export default Dashboard;