import AppLayout from "../../../layouts/AppLayout";

import UserSettingsHeader from "../../../components/user/settings/UserSettingsHeader";
import UserProfileSettings from "../../../components/user/settings/UserProfileSettings";

const SettingsPage = () => {
  return (
    <AppLayout>

      {/* Header */}

      <UserSettingsHeader />

      {/* Settings Content */}

      <div className="mt-6 sm:mt-8">
        <UserProfileSettings />
      </div>

    </AppLayout>
  );
};

export default SettingsPage;