import Branding from "../assets/images/gym-branding.jpg";

const LoginBranding = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#0f1115]">
      <img
        src={Branding}
        alt="Gym interior"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="relative z-10 flex flex-col justify-between p-12 w-full">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#e63946] rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z" />
            </svg>
          </div>
          <span
            className="text-white text-2xl font-black tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            FITBOOK
          </span>
        </div>
        <div>
          <h1
            className="text-white text-5xl font-black leading-tight mb-4"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.02em",
            }}
          >
            TRAIN HARDER.
            <br />
            BOOK SMARTER.
          </h1>
          <p className="text-white/60 text-base max-w-sm leading-relaxed">
            Your all-in-one gym class booking platform. Browse hundreds of
            classes, book your spot in seconds, and track your fitness journey.
          </p>
          <div className="flex items-center gap-8 mt-8">
            {[
              ["500+", "Classes Monthly"],
              ["48", "Expert Trainers"],
              ["2,400+", "Active Members"],
            ].map(([stat, label]) => (
              <div key={label}>
                <div
                  className="text-white text-2xl font-black"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {stat}
                </div>
                <div className="text-white/40 text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginBranding;
