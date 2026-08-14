import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useForm } from "react-hook-form";
import type { LoginDto } from "../../types/user.type";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { loginSchema } from "../../schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import LoginBranding from "../../components/LoginBranding";
import { FiAlertCircle, FiEye, FiEyeOff } from "react-icons/fi";
import IconLogo from "../../components/IconLogo";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginDto) => {
    setErrorMessage(null);

    try {
      await login(data);
      navigate("/dashboard");
    } catch {
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Desktop Branding */}
      <LoginBranding />

      {/* Login Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-1 flex-col justify-center space-y-6 rounded-2xl border border-slate-200 bg-white px-6 shadow-xl shadow-slate-200/50 sm:p-10 md:px-50 lg:px-25 xl:px-32 2xl:px-40"
      >
        {/* Mobile / Medium Branding */}
        <IconLogo />
        {/* Header */}
        <div className="mb-8 flex flex-col items-center space-y-1 sm:mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Welcome back
          </h1>

          <p className="font-poppins text-[13px] text-slate-500">
            Sign in to continue to your account.
          </p>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2 font-poppins">
          <label
            htmlFor="email"
            className="text-sm font-semibold text-slate-700"
          >
            Email address
          </label>

          <Input
            type="email"
            placeholder="you@example.com"
            id="email"
            {...register("email")}
            className="h-11 w-full rounded-xl border-slate-300 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition placeholder:text-[13px] placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-3 focus:ring-red-500/10"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2 font-poppins">
          <label
            htmlFor="pass"
            className="text-sm font-semibold text-slate-700"
          >
            Password:
          </label>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              id="pass"
              {...register("password")}
              className="h-11 w-full rounded-xl border-slate-300 bg-slate-50 px-3 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-[13px] placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-3 focus:ring-red-500/10"
            />

            {/* Show / Hide Password */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>

          {/* Forgot Password */}
          <Link
            to="/forgot-password"
            className="font-medium text-red-500 ml-auto text-xs"
          >
            Forgot password?
          </Link>
        </div>

        {/* Form Error */}
        {(errors.email || errors.password || errorMessage) && (
          <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <FiAlertCircle size={16} className="mt-0.5 shrink-0 text-red-500" />

            <p className="font-poppins text-[13px] font-medium leading-5 text-red-600">
              {errorMessage ??
                (errors.email && errors.password
                  ? "Please fill in all fields."
                  : (errors.email?.message ?? errors.password?.message))}
            </p>
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex h-11 w-full items-center justify-center rounded-xl bg-red-600 font-semibold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 hover:shadow-red-600/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Button>

        {/* Register */}
        <div className="flex justify-center font-poppins text-[13px]">
          <span className="opacity-[.6]">Don't have an account?&nbsp;</span>

          <Link to="/regis" className="font-medium text-red-500">
            Create one
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
