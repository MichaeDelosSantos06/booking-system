import { LockKeyhole, Pencil, UserRound } from "lucide-react";

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
    <main className="min-h-full w-full min-w-0 bg-[#f7f6f2]">
      <div className="mx-auto w-full max-w-4xl space-y-3.5 sm:space-y-5">
        {/* Profile Information */}
        <section className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.04)] sm:rounded-2xl">
          {isEditing && userData ? (
            <div className="p-3.5 sm:p-5 lg:p-7">
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
            </div>
          ) : loading ? (
            /* =========================
               Profile Loading
            ========================= */
            <div className="p-3.5 sm:p-5 lg:p-7">
              <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl">
                {/* Skeleton Header */}
                <div className="absolute inset-x-0 top-0 h-20 animate-pulse bg-slate-200 sm:h-24" />

                <div className="relative p-3.5 pt-7 sm:p-5 sm:pt-9 lg:p-6 lg:pt-10">
                  {/* Profile Header Skeleton */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex min-w-0 items-end gap-2.5 sm:gap-4">
                      {/* Avatar */}
                      <div className="h-14 w-14 shrink-0 animate-pulse rounded-xl border-4 border-white bg-slate-300 shadow-md sm:h-20 sm:w-20 sm:rounded-2xl" />

                      {/* User Info */}
                      <div className="min-w-0 flex-1 space-y-1.5 pb-0.5 sm:space-y-2">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                          <div className="h-3.5 w-24 animate-pulse rounded bg-slate-200 sm:h-5 sm:w-40" />
                          <div className="h-4.5 w-12 animate-pulse rounded-full bg-slate-200 sm:h-5 sm:w-16" />
                        </div>

                        <div className="h-2.5 w-32 animate-pulse rounded bg-slate-200 sm:h-3 sm:w-56" />
                      </div>
                    </div>

                    {/* Edit Button */}
                    <div className="h-9 w-full animate-pulse rounded-lg bg-slate-200 sm:h-10 sm:w-28 sm:rounded-xl" />
                  </div>

                  {/* Details Skeleton */}
                  <div className="mt-4 grid grid-cols-2 overflow-hidden rounded-lg border border-slate-100 bg-slate-50/60 sm:mt-6 sm:rounded-xl">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div
                        key={index}
                        className={`min-w-0 p-2.5 sm:p-4 ${
                          index < 2 ? "border-b border-slate-100" : ""
                        } ${
                          index % 2 === 0 ? "border-r border-slate-100" : ""
                        }`}
                      >
                        <div className="h-2 w-12 animate-pulse rounded bg-slate-200 sm:h-2.5 sm:w-20" />

                        <div className="mt-2 h-3 w-20 animate-pulse rounded bg-slate-200 sm:mt-2.5 sm:h-4 sm:w-40" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : userData ? (
            /* =========================
               Profile
            ========================= */
            <div className="p-3.5 sm:p-5 lg:p-7">
              <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl">
                {/* Premium Background Accent */}
                <div className="absolute inset-x-0 top-0 h-20 bg-gray-500/50 sm:h-24" />

                <div className="relative p-3.5 pt-7 sm:p-5 sm:pt-9 lg:p-6 lg:pt-10">
                  {/* Profile Header */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
                    {/* Identity */}
                    <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3.5 lg:gap-4">
                      {/* Avatar */}
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border-4 border-white bg-red-50 text-lg font-extrabold text-red-500 shadow-md sm:h-16 sm:w-16 sm:rounded-2xl sm:text-xl lg:h-20 lg:w-20 lg:text-2xl">
                        {userData.name?.charAt(0).toUpperCase()}
                      </div>

                      {/* User Information */}
                      <div className="min-w-0 flex-1 sm:mb-0 lg:mb-2">
                        {/* Name + Status */}
                        <div className="flex min-w-0 flex-wrap items-center gap-1.5 sm:gap-2 lg:gap-2.5">
                          <h2 className="min-w-0 text-sm font-bold leading-tight tracking-tight text-white sm:text-base lg:text-lg">
                            {userData.name}
                          </h2>

                          {/* Active Member — hidden on mobile */}
                          <span className="hidden shrink-0 items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[7px] font-semibold text-emerald-600 ring-1 ring-emerald-100 sm:inline-flex sm:gap-1 sm:px-2 sm:text-[8px] lg:px-2.5 lg:text-[9px]">
                            <span className="h-0.5 w-0.5 shrink-0 rounded-full bg-emerald-500 sm:h-1 sm:w-1" />
                            {userData.status} Member
                          </span>
                        </div>

                        {/* Email */}
                        <p className="max-w-full break-all text-[10px] leading-tight text-white/75 sm:text-[11px] lg:text-[11px]">
                          {userData.email}
                        </p>
                      </div>
                    </div>

                    {/* Edit Button */}
                    <Button
                      onClick={onEdit}
                      className="flex h-9 w-full shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-[10px] font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 hover:shadow sm:h-10 sm:w-auto sm:rounded-xl sm:px-4 sm:text-xs"
                    >
                      <span className="flex items-center justify-center gap-1 sm:gap-1.5">
                        <Pencil
                          size={12}
                          strokeWidth={2}
                          className="sm:h-[14px] sm:w-[14px]"
                        />
                        Edit Profile
                      </span>
                    </Button>
                  </div>

                  {/* Profile Details */}
                  <div className="mt-4 grid grid-cols-2 overflow-hidden rounded-lg border border-slate-100 bg-slate-50/60 sm:mt-6 sm:rounded-xl">
                    {/* Email */}
                    <div className="min-w-0 border-b border-r border-slate-100 p-2.5 sm:p-4">
                      <span className="text-[8px] font-semibold uppercase tracking-[0.1em] text-slate-400 sm:text-[11px]">
                        Email
                      </span>

                      <p className="mt-1 truncate text-[10px] font-semibold text-slate-900 sm:mt-1.5 sm:text-sm">
                        {userData.email}
                      </p>
                    </div>

                    {/* Phone */}
                    <div className="min-w-0 border-b border-slate-100 p-2.5 sm:p-4">
                      <span className="text-[8px] font-semibold uppercase tracking-[0.1em] text-slate-400 sm:text-[11px]">
                        Phone
                      </span>

                      <p className="mt-1 truncate text-[10px] font-semibold text-slate-900 sm:mt-1.5 sm:text-sm">
                        {userData.contact}
                      </p>
                    </div>
                    {/* Membership Status */}
                    <div className="min-w-0 border-r border-slate-100 p-2.5 sm:border-b-0 sm:p-4">
                      <span className="block truncate text-[8px] font-semibold uppercase tracking-[0.08em] text-slate-400 sm:text-[11px] sm:tracking-[0.12em]">
                        Membership Status
                      </span>

                      <div className="mt-1 sm:mt-1.5">
                        <span className="inline-flex max-w-full items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-600 ring-1 ring-emerald-100 sm:gap-1.5 sm:px-2.5 sm:py-1 sm:text-xs">
                          <span className="h-1 w-1 shrink-0 rounded-full bg-emerald-500 sm:h-1.5 sm:w-1.5" />

                          {/* Mobile: Active Member | sm+: Active */}
                          <span className="truncate">
                            <span className="sm:hidden">
                              {userData.status} Member
                            </span>
                            <span className="hidden sm:inline">
                              {userData.status}
                            </span>
                          </span>
                        </span>
                      </div>
                    </div>
                    {/* Member Since */}
                    <div className="min-w-0 p-2.5 sm:p-4">
                      <span className="text-[8px] font-semibold uppercase tracking-[0.1em] text-slate-400 sm:text-[11px]">
                        Member Since
                      </span>

                      <p className="mt-1 truncate text-[10px] font-semibold text-slate-900 sm:mt-1.5 sm:text-sm">
                        {formatDate(userData.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* =========================
               Empty State
            ========================= */
            <div className="p-3.5 sm:p-5 lg:p-7">
              <div className="flex min-h-36 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50 px-4 text-center sm:min-h-40 sm:rounded-2xl sm:px-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-400 shadow-sm ring-1 ring-slate-200 sm:h-11 sm:w-11 sm:rounded-xl">
                  <UserRound
                    size={16}
                    strokeWidth={1.8}
                    className="sm:h-[18px] sm:w-[18px]"
                  />
                </div>

                <p className="mt-2.5 text-xs font-semibold text-slate-700 sm:mt-3 sm:text-sm">
                  No profile data available
                </p>

                <p className="mt-1 max-w-xs text-[10px] leading-relaxed text-slate-400 sm:text-xs">
                  Your profile information could not be loaded. Please try
                  again.
                </p>
              </div>
            </div>
          )}
        </section>
        {/* Password & Security — UNCHANGED */}

        <section className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.04)] sm:rounded-2xl">
          {isChangingPassword ? (
            <div className="flex justify-center p-3.5 sm:p-5 lg:p-7">
              <ChangePassword
                isChanging={isChangingPassword}
                isSubmitting={passwordSubmitting}
                error={passwordError}
                onSubmit={onSubmitPassword}
                onCancel={onCancelPassword}
              />
            </div>
          ) : (
            <div className="p-3.5 sm:p-5 lg:p-7">
              {/* Security Header */}
              <div className="flex flex-col gap-3.5 sm:gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex min-w-0 items-start gap-2.5 sm:gap-3.5 lg:gap-4">
                  {/* Security Icon */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-white shadow-sm sm:h-10 sm:w-10 sm:rounded-xl">
                    <LockKeyhole
                      size={15}
                      strokeWidth={1.8}
                      className="sm:h-[17px] sm:w-[17px]"
                    />
                  </div>

                  {/* Security Info */}
                  <div className="min-w-0">
                    <h2 className="text-xs font-bold tracking-tight text-slate-950 sm:text-sm lg:text-base">
                      Password & Security
                    </h2>

                    <p className="mt-0.5 text-[10px] leading-relaxed text-slate-500 sm:mt-1 sm:text-xs lg:text-sm">
                      Manage your account password and security.
                    </p>
                  </div>
                </div>

                {/* Change Password Button */}
                <Button
                  onClick={onChangePassword}
                  className="flex h-9 w-full shrink-0 items-center justify-center rounded-lg bg-slate-950 px-3 text-[10px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-800 hover:shadow-md sm:h-10 sm:w-auto sm:rounded-xl sm:px-4 sm:text-xs"
                >
                  Change Password
                </Button>
              </div>

              {/* Password Status */}
              <div className="mt-4 border-t border-slate-100 pt-4 sm:mt-6 sm:pt-5">
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 sm:h-8 sm:w-8">
                    <LockKeyhole
                      size={13}
                      className="text-slate-400 sm:h-[15px] sm:w-[15px]"
                      strokeWidth={1.8}
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-700 sm:text-sm">
                      Password last changed
                    </p>

                    <p className="mt-0.5 text-[10px] text-slate-400 sm:text-xs">
                      Account creation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default MyProfile;
