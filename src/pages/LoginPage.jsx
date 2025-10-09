import AuthCard from "../components/auth/AuthCard";
import SplitScreen from "../components/layout/SplittScreen";
import WelcomeContent from "../components/ui/WelcomeContent";



const LoginPage = () => {

  return (
    <SplitScreen
      leftContent={<WelcomeContent/>}
      rightContent={<AuthCard />}
    />
  );
  
};

export default LoginPage;