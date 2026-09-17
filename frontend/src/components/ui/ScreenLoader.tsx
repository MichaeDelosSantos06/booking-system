import { Dumbbell } from "lucide-react";

const FullScreenLoader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center">
        {/* Logo */}
        <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
          <div className="absolute inset-0 animate-ping rounded-2xl bg-red-500/5" />

          <Dumbbell className="relative h-8 w-8 text-red-500" />
        </div>

        {/* Brand */}
        <h1 className="text-xl font-bold tracking-wide text-white">
          Fit<span className="text-red-500">Book</span>
        </h1>

        {/* Loading indicator */}
        <div className="mt-5 flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-red-500 [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-red-500 [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-red-500" />
        </div>

        <p className="mt-3 text-xs text-slate-500">Loading...</p>
      </div>
    </div>
  );
};

export default FullScreenLoader;
