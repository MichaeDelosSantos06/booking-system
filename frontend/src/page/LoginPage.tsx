import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm } from "react-hook-form";
import type { LoginDto } from "../types/user.type";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { loginSchema } from "../schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";

// use Zod
// loading state
// display errors

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { login } = useAuth();

  const onSubmit = async (data: LoginDto) => {
    setErrorMessage(null);
    try {
      await login(data);
    } catch {
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50"
    >
      {/* Header */}
      <div className="space-y-2">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white shadow-lg shadow-indigo-600/20">
          T
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Welcome back
        </h1>

        <p className="text-sm text-slate-500">
          Sign in to continue to your account.
        </p>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-slate-700">
          Email address
        </label>

        <Input
          type="email"
          placeholder="you@example.com"
          id="email"
          {...register("email", { required: true })}
          className="h-11 w-full rounded-xl border-slate-300 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
        />

        {errors.email && (
          <p className="text-sm font-medium text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label htmlFor="pass" className="text-sm font-medium text-slate-700">
          Password
        </label>

        <Input
          type="password"
          placeholder="Enter your password"
          id="pass"
          {...register("password", { required: true })}
          className="h-11 w-full rounded-xl border-slate-300 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
        />

        {errors.password && (
          <p className="text-sm font-medium text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Server error */}
      {errorMessage && (
        <div className="flex items-center rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm font-medium text-red-600">{errorMessage}</p>
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-11 w-full rounded-xl bg-indigo-600 font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 hover:shadow-indigo-600/30 disabled:cursor-not-allowed disabled:opacity-60 flex items-center justify-center"
      >
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>

      {/* Footer */}
      <p className="text-center text-xs text-slate-400">
        Secure access to your tenant management system
      </p>
    </form>
  );
};

export default LoginPage;
