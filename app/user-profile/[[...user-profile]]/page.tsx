import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
  <div className="text-center text-lg flex flex-col align-middle items-center gap-8">
    {/* <div>Other stuff</div> */}
    <UserProfile path="/user-profile" routing="path" />
  </div>
);

export default UserProfilePage;
