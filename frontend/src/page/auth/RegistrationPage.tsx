import { useForm } from "react-hook-form";
import type { CreateUserDto } from "../../types/user.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../schema/user.schema";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import RegisterBranding from "../../components/RegisterBranding";
import { FiAlertCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

const RegistrationPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserDto>({
    resolver: zodResolver(registerSchema),
  });

  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: CreateUserDto) => {
    try {
      await registerUser(data);

      toast.success("Successfully Registered!");
      reset();
      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Registration Failed");
        return;
      }

      toast.error("Something went wrong.");
    }
  };

  const firstError = Object.values(errors)[0];

  const values = getValues();

  const allFieldsEmpty =
    !values.name &&
    !values.email &&
    !values.contact &&
    !values.password &&
    !values.confirmPassword;

  const errorMessage = allFieldsEmpty
    ? "Please enter all required fields."
    : (firstError?.message ?? "Please check your input.");

  return (
    <div className="flex min-h-screen">
      {/* Branding */}
      <RegisterBranding />

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-1 flex-col space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/50 sm:p-10 md:px-50 lg:px-25 xl:px-32 2xl:px-40"
      >
        {/* Header */}
        <div className="flex flex-col items-center space-y-1 pt-10 sm:mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Create your account
          </h1>

          <p className="font-poppins text-[13px] text-slate-500">
            Enter your information to get started.
          </p>
        </div>

        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="fullname"
            className="font-poppins text-sm font-semibold text-slate-700"
          >
            Full name <span className="text-red-500">*</span>
          </label>

          <Input
            id="fullname"
            type="text"
            placeholder="Juan Dela Cruz"
            className="h-11 w-full rounded-xl border-slate-300 bg-slate-50 px-3 font-poppins text-sm text-slate-900 outline-none transition placeholder:text-[13px] placeholder:text-slate-400 focus:border-red-500 focus:bg-white focus:ring-3 focus:ring-red-500/10"
            {...register("name")}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="font-poppins text-sm font-semibold text-slate-700"
          >
            Email address <span className="text-red-500">*</span>
          </label>

          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="h-11 w-full rounded-xl border-slate-300 bg-slate-50 px-3 font-poppins text-sm text-slate-900 outline-none transition placeholder:text-[13px] placeholder:text-slate-400 focus:border-red-500 focus:bg-white focus:ring-3 focus:ring-red-500/10"
            {...register("email")}
          />
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact"
            className="font-poppins text-sm font-semibold text-slate-700"
          >
            Contact number <span className="text-red-500">*</span>
          </label>

          <Input
            id="contact"
            type="tel"
            placeholder="09XX XXX XXXX"
            className="h-11 w-full rounded-xl border-slate-300 bg-slate-50 px-3 font-poppins text-sm text-slate-900 outline-none transition placeholder:text-[13px] placeholder:text-slate-400 focus:border-red-500 focus:bg-white focus:ring-3 focus:ring-red-500/10"
            {...register("contact")}
          />
        </div>

        {/* Password + Confirm Password */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {/* Password */}
          <div className="flex min-w-0 flex-col gap-2">
            <label
              htmlFor="password"
              className="font-poppins text-sm font-semibold text-slate-700"
            >
              Password <span className="text-red-500">*</span>
            </label>

            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              className="h-11 w-full min-w-0 rounded-xl border-slate-300 bg-slate-50 px-3 font-poppins text-sm text-slate-900 outline-none transition placeholder:text-[11px] placeholder:text-slate-400 focus:border-red-500 focus:bg-white focus:ring-3 focus:ring-red-500/10 sm:placeholder:text-[13px]"
              {...register("password")}
            />
          </div>

          {/* Confirm Password */}
          <div className="flex min-w-0 flex-col gap-2">
            <label
              htmlFor="confirmPassword"
              className="font-poppins text-sm font-semibold text-slate-700"
            >
              Confirm password <span className="text-red-500">*</span>
            </label>

            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              className="h-11 w-full min-w-0 rounded-xl border-slate-300 bg-slate-50 px-3 font-poppins text-sm text-slate-900 outline-none transition placeholder:text-[11px] placeholder:text-slate-400 focus:border-red-500 focus:bg-white focus:ring-3 focus:ring-red-500/10 sm:placeholder:text-[13px]"
              {...register("confirmPassword")}
            />
          </div>
        </div>

        {/* Validation Error */}
        {Object.keys(errors).length > 0 && (
          <div className="flex animate-in items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <FiAlertCircle size={16} className="mt-0.5 shrink-0 text-red-500" />

            <p className="font-poppins text-[13px] font-medium leading-5 text-red-600">
              {errorMessage}
            </p>
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          className="h-11 w-full rounded-xl bg-red-600 font-semibold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 hover:shadow-red-600/30 disabled:cursor-not-allowed disabled:opacity-60 flex flex-col justify-center items-center font-poppins text-sm"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Create Account"}
        </Button>

        {/* Register */}
        <div className="flex justify-center font-poppins text-[13px]">
          <span className="opacity-[.6]">Already have an account?&nbsp;</span>

          <Link to="/" className="font-medium text-red-500">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
