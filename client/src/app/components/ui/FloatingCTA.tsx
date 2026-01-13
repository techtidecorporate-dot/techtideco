export function FloatingCTA() {
  const openDrawer = () => {
    window.dispatchEvent(new CustomEvent("open-partner-drawer"));
  };

  return (
    <div className="fixed -right-2 top-1/2 -translate-y-1/2 z-50 h-[180px] w-[56px] flex items-center justify-center">
      <div className="rotate-[270deg]">
        <button
          onClick={openDrawer}
          className="
            relative px-5 py-2.5 
            rounded-tl-[22px] rounded-tr-[22px]
            text-white font-semibold whitespace-nowrap
            transition-all duration-300 ease-out
            hover:-translate-y-0.5 active:translate-y-0
            shadow-[0_12px_30px_-10px_rgba(69,58,188,0.7)]
            hover:shadow-[0_18px_45px_-12px_rgba(96,195,227,0.9)]
            focus:outline-none
          "
          style={{
            background:
              "linear-gradient(95deg, rgb(69, 58, 188) 0%, rgb(96, 195, 227) 100%)",
          }}
        >
          {/* Soft glass highlight */}
          <span className="absolute inset-0 rounded-tl-[22px] rounded-tr-[22px] bg-white/10 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />

          {/* Text */}
          <span className="relative z-10 tracking-wide">Partner with Us</span>
        </button>
      </div>
    </div>
  );
}
