import { useForm } from "react-hook-form";
import useRegister from "../hooks/useRegister";
import type { CreateUserDto } from "../types/user.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schema/user.schema";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
// import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

const RegistrationPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserDto>({
    resolver: zodResolver(registerSchema),
  });
  const { registerUser } = useRegister();
  //   const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: CreateUserDto) => {
    try {
      await registerUser(data);
      toast.success("Successfully Registered!");
      reset();
    } catch (error) {
      //   setErrorMessage("Registration Failed!");
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Registration Failed");
        return;
      }
      toast.error("Something went wrong.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50"
    >
      {/* Header */}
      <div className="space-y-2">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-600/20">
          T
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Create your account
        </h1>

        <p className="text-sm text-slate-500">
          Enter your information to get started.
        </p>
      </div>
      {/* Full Name */}
      <div className="space-y-2">
        <label
          htmlFor="fullname"
          className="text-sm font-medium text-slate-700"
        >
          Full name
        </label>

        <Input
          id="fullname"
          type="text"
          placeholder="Juan Dela Cruz"
          className="h-11 w-full rounded-xl border-slate-300 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
          {...register("name", { required: true })}
        />

        {errors.name && (
          <p className="text-sm font-medium text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>
      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-slate-700">
          Email address
        </label>

        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="h-11 w-full rounded-xl border-slate-300 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <p className="text-sm font-medium text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>
      {/* Contact */}
      <div className="space-y-2">
        <label htmlFor="contact" className="text-sm font-medium text-slate-700">
          Contact number
        </label>

        <Input
          id="contact"
          type="tel"
          placeholder="09XX XXX XXXX"
          className="h-11 w-full rounded-xl border-slate-300 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
          {...register("contact", { required: true })}
        />
        {errors.contact && (
          <p className="text-sm font-medium text-red-500">
            {errors.contact.message}
          </p>
        )}
      </div>
      {/* Password */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-sm font-medium text-slate-700"
        >
          Password
        </label>

        <Input
          id="password"
          type="password"
          placeholder="Create a password"
          className="h-11 w-full rounded-xl border-slate-300 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <p className="text-sm font-medium text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>
      {/* Confirm Password */}
      <div className="space-y-2">
        <label
          htmlFor="confirmPassword"
          className="text-sm font-medium text-slate-700"
        >
          Confirm password
        </label>

        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          className="h-11 w-full rounded-xl border-slate-300 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
          {...register("confirmPassword", { required: true })}
        />
        {errors.confirmPassword && (
          <p className="text-sm font-medium text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      {/* Server error
      {errorMessage && (
        <div className="flex items-center rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm font-medium text-red-600">{errorMessage}</p>
        </div>
      )} */}
      {/* Submit */}
      <Button
        type="submit"
        className="h-11 w-full rounded-xl bg-indigo-600 font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 hover:shadow-indigo-600/30"
        disabled={isSubmitting}
      >
        {isSubmitting ? "loading..." : "Create Account"}
      </Button>
      {/* Footer */}
      <p className="text-center text-xs text-slate-400">
        Already have an account?{" "}
        <span className="font-medium text-indigo-600">Sign in</span>
      </p>
    </form>
  );
};

export default RegistrationPage;
