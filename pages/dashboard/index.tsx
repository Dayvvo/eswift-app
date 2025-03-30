import Wrapper from "@/components/Wrapper"
import useAuth from "@/hooks/useAuth";
import DashboardScreen from "@/screens/overview/adminDashboard";
import OverviewScreen from "@/screens/overview/customer";
import { Skeleton, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const Dashboard = () => {
  const { user, isWindow } = useAuth();
  const navigate = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isWindow) return;

    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return decodeURIComponent(parts.pop()?.split(";").shift() || "");
      }
    };

    const myCookie = getCookie("auth-cookie");

    if (myCookie) {
      const userData = localStorage.getItem("userData");
      if (!userData) {
        localStorage.setItem("userData", myCookie);
      }

      // Redirect only if authRoute exists
      const authRoute = sessionStorage.getItem("authRoute");
      if (authRoute) {
        sessionStorage.removeItem("authRoute");
        navigate.push(authRoute);
      } else {
        navigate.push("/dashboard"); // Ensure we stay on the dashboard
      }
    }

    // if (!user && !myCookie) {
    //   navigate.push("/auth");
    //   return;
    // }



    setLoading(false);
  }, [isWindow]);

  if (loading) {
    
    return (
          <Stack spacing={4} mt="30px">
              <Skeleton height='30px' />
              <Skeleton height='30px' />
              <Skeleton height='30px' />
           </Stack>
        )

  }

  return (
    <Wrapper>
      {user?.role === "ADMIN" ? <DashboardScreen /> : <OverviewScreen />}
    </Wrapper>
  );
};

export default Dashboard;