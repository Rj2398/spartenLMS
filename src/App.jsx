import { useSelector } from "react-redux";
import AppRouter from "./routes/AppRouter";
import Loading from "./pages/common/Loading";

function App() {
  const studentDashboardLoading = useSelector((state) => state.auth?.loading);  // Student Loading
  const studentProgressLoading = useSelector((state) => state.student?.loading);
  const studentSubjectLoading = useSelector((state) => state.subject?.loading);
  const studentLessionLoading = useSelector((state) => state.lession?.loading);
  const dashboardLoading = useSelector((state) => state.dashboard?.loading);  // Teacher Loading
  const progressLoading = useSelector((state) => state.progress?.loading);
  const mwlLoading = useSelector((state) => state.mwl?.loading);
  const principalDashboard = useSelector((state) => state.principalDashboard?.loading);  // Principal loading
  const principalProgressLoading = useSelector((state) => state.teacherAndStudents?.loading);
  const principalLoading = useSelector((state) => state.principalProgress?.loading);

  const loading = dashboardLoading || progressLoading || mwlLoading || principalDashboard || principalProgressLoading || principalLoading || studentDashboardLoading || studentProgressLoading || studentSubjectLoading || studentLessionLoading;

  return (
    <>
      {loading && <Loading />}
      <AppRouter />
    </>
  );
}

export default App;
