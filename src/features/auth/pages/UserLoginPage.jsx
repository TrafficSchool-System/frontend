// src/pages/user/UserLoginPage.jsx
import MagicLinkForm from "../components/MagicLinkForm";
import SplitScreen from "@shared/components/layout/SplitScreen";
import WelcomeContent from "../../user-dashboard/components/WelcomeContent";

const UserLoginPage = () => {
  return (
    <SplitScreen
      leftContent={<WelcomeContent />}
      rightContent={<MagicLinkForm />}
    />
  );
};

export default UserLoginPage;
