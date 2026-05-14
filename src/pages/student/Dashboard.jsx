import EarnedCertificate from "../../components/student/EarnedCertificate";
import WelcomeDashboard from "../../components/student/WelcomeDashboard";
import YourSubjects from "../../components/student/YourSubjects";

const Dashboard = () => {
  const studentId = JSON.parse(localStorage.getItem("pmsc"))?.id;

  return (
    <>
      <WelcomeDashboard />
      <div className="subjects-lesson-progress">
        <div className="row">
          <YourSubjects />
          <EarnedCertificate studentId={studentId} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
