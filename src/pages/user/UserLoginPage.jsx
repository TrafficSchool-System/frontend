// src/pages/user/UserLoginPage.jsx
import MagicLinkForm from "../../components/user/auth/MagicLinkForm";
import SplitScreen from "../../components/user/layout/SplitScreen";
import WelcomeContent from "../../components/shared/ui/WelcomeContent";

const UserLoginPage = () => {
  return (
    <SplitScreen
      leftContent={<WelcomeContent/>}
      rightContent={<MagicLinkForm />}
    />
  );
};

export default UserLoginPage;
