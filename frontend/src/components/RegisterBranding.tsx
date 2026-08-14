import RegisterBrand from "../assets/images/gym-branding-1.jpg";

const RegisterBranding = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#0f1115]">
      <img
        src={RegisterBrand}
        alt="Fitness training"
        className="absolute inset-0 w-full h-full object-cover opacity-35"
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
            START YOUR
            <br />
            FITNESS JOURNEY.
          </h1>
          <p className="text-white/60 text-base max-w-sm leading-relaxed">
            Join thousands of members who have transformed their fitness
            routines with FitBook's easy class booking.
          </p>
          <div className="mt-8 space-y-3">
            {[
              "Access 30+ class types",
              "Book in under 60 seconds",
              "Cancel anytime, no fees",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#e63946] flex items-center justify-center shrink-0">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-white/70 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterBranding;
