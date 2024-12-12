import Wrapper from "@/components/Wrapper"
import useAuth from "@/hooks/useAuth";
import DashboardScreen from "@/screens/overview/adminDashboard";
import OverviewScreen from "@/screens/overview/customer";


const Dashboard =()=> {
    const { user } = useAuth();
    return (
        <Wrapper>
          {
            user?.role === 'ADMIN' ? <DashboardScreen/> : <OverviewScreen/>
          }
        </Wrapper>
    )
}

export default Dashboard;