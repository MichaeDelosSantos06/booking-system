import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import MyProfile from "../../feature/member/components/Profile";
import useFetchUserInformation from "../../hooks/useUserInformation";
import { useAuth } from "../../hooks/useAuth";
import UserService from "../../services/user.service";
import type {
  UpdateProfileDto,
  ChangePasswordDto,
} from "../../types/user.type";

const ProfilePage = () => {
  const { info, loading, refetch } = useFetchUserInformation();
  const { refreshUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordSubmitting, setPasswordSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleOpenChangePassword = () => {
    setPasswordError(null);
    setIsChangingPassword(true);
  };

  const handleCancelChangePassword = () => {
    setPasswordError(null);
    setIsChangingPassword(false);
  };

  const handleUpdateProfile = async (data: UpdateProfileDto) => {
    setIsSubmitting(true);

    try {
      await UserService.updateProfile(data);

      await Promise.all([refetch(), refreshUser()]);

      setIsEditing(false);

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        const errors = error.response?.data?.errors;

        if (errors?.length) {
          toast.error(errors[0].message);
        } else {
          toast.error(error.response?.data?.message ?? "Something went wrong");
        }
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangePassword = async (data: ChangePasswordDto) => {
    setPasswordError(null);
    setPasswordSubmitting(true);

    try {
      await UserService.changePassword(data);

      setIsChangingPassword(false);

      toast.success("Password changed successfully!");
    } catch (error) {
      console.error(error);

      // Show the server's message (e.g. wrong current password)
      // inside the form so the user knows why it was rejected.
      if (axios.isAxiosError(error)) {
        const errors = error.response?.data?.errors;

        if (errors?.length) {
          setPasswordError(errors[0].message);
        } else {
          setPasswordError(
            error.response?.data?.message ?? "Something went wrong"
          );
        }
      } else {
        setPasswordError("Something went wrong");
      }
    } finally {
      setPasswordSubmitting(false);
    }
  };

  return (
    <MyProfile
      userData={info}
      loading={loading}
      onEdit={handleEdit}
      isEditing={isEditing}
      isSubmitting={isSubmitting}
      onSubmitProfile={handleUpdateProfile}
      onCancelProfile={handleCancel}
      onChangePassword={handleOpenChangePassword}
      isChangingPassword={isChangingPassword}
      passwordSubmitting={passwordSubmitting}
      passwordError={passwordError}
      onSubmitPassword={handleChangePassword}
      onCancelPassword={handleCancelChangePassword}
    />
  );
};

export default ProfilePage;
