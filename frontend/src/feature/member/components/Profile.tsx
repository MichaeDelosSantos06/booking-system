import { LockKeyhole, Pencil } from "lucide-react";
import Button from "../../../components/ui/Button";
import type { ProfileData } from "../../../types/user.type";
import { formatDate } from "../../../utils/DateFormatterHelper";
import UpdateProfile from "./UpdateModal";
import ChangePassword from "./ChangePassword";

const MyProfile = ({
  userData,
  loading,
  onEdit,
  isEditing,
  isSubmitting,
  onSubmitProfile,
  onCancelProfile,
  onChangePassword,
  isChangingPassword,
  passwordSubmitting,
  passwordError,
  onSubmitPassword,
  onCancelPassword,
}: ProfileData) => {
  return (
    <main className="min-h-full bg-[#f7f6f2] px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-3xl">
        {/* Profile Info */}
        <section className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.04)] sm:p-7">
          {/* Profile Header */}
          {isEditing && userData ? (
            <UpdateProfile
              isEditing={isEditing}
              defaultValues={{
                name: userData.name,
                contact: userData.contact,
              }}
              isSubmitting={isSubmitting}
              onSubmit={onSubmitProfile}
              onCancel={onCancelProfile}
            />
          ) : loading ? (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 animate-pulse rounded-2xl bg-slate-200" />

                <div className="space-y-2">
                  <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />

                  <div className="h-3 w-56 animate-pulse rounded bg-slate-200" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 border-t border-slate-100 pt-6 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index}>
                    <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />

                    <div className="mt-2 h-4 w-44 animate-pulse rounded bg-slate-200" />
                  </div>
                ))}
              </div>
            </div>
          ) : userData ? (
            <>
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-4">
                  {/* Avatar */}
                  <div
                    className="
                    flex h-16 w-16 shrink-0 items-center justify-center
                    rounded-2xl
                    bg-red-50
                    text-xl font-extrabold text-red-500
                    ring-1 ring-red-100
                  "
                  >
                    {userData.name[0].toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-bold text-slate-950">
                      {userData.name}
                    </h2>

                    <p className="mt-0.5 truncate text-sm text-slate-500">
                      {userData.email}
                    </p>

                    <span
                      className="
                      mt-2 inline-flex items-center gap-1.5
                      rounded-full
                      bg-emerald-50
                      px-2.5 py-1
                      text-xs font-semibold text-emerald-600
                      ring-1 ring-emerald-100
                    "
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {userData.status} Member
                    </span>
                  </div>
                </div>

                {/* Edit Button */}
                <Button onClick={onEdit}>
                  <span className="flex items-center gap-1.5">
                    <Pencil size={14} />
                    Edit Profile
                  </span>
                </Button>
              </div>

              <div className="mt-7 grid grid-cols-1 gap-x-8 gap-y-6 border-t border-slate-100 pt-6 sm:grid-cols-2">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Email
                  </span>

                  <p className="mt-1.5 text-sm font-semibold text-slate-900">
                    {userData.email}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Phone
                  </span>

                  <p className="mt-1.5 text-sm font-semibold text-slate-900">
                    {userData.contact}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Membership Status
                  </span>

                  <p className="mt-1.5 text-sm font-semibold text-slate-900">
                    {userData.status}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Member Since
                  </span>

                  <p className="mt-1.5 text-sm font-semibold text-slate-900">
                    {formatDate(userData.createdAt)}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div>No Data</div>
          )}
        </section>

        {/* Password & Security */}
        <section className="mt-5 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.04)] sm:p-7">
          {isChangingPassword ? (
            <ChangePassword
              isChanging={isChangingPassword}
              isSubmitting={passwordSubmitting}
              error={passwordError}
              onSubmit={onSubmitPassword}
              onCancel={onCancelPassword}
            />
          ) : (
            <>
              <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-4">
              {/* Security Icon */}
              <div
                className="
                    flex h-10 w-10 shrink-0 items-center justify-center
                    rounded-xl
                    bg-slate-50
                    text-slate-500
                    ring-1 ring-slate-100
                  "
              >
                <LockKeyhole size={18} strokeWidth={1.8} />
              </div>

              {/* Security Info */}
              <div>
                <h2 className="text-sm font-bold text-slate-950">
                  Password & Security
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Update your account password
                </p>
              </div>
            </div>

            <Button onClick={onChangePassword}>Change Password</Button>
          </div>

          {/* Password Status */}
          <div className="mt-6 border-t border-slate-100 pt-5">
            <div className="flex items-center gap-3">
              <LockKeyhole
                size={16}
                className="shrink-0 text-slate-400"
                strokeWidth={1.8}
              />

              <div>
                <p className="text-sm font-medium text-slate-600">
                  Password last changed
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  Account creation
                </p>
              </div>
            </div>
          </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default MyProfile;
