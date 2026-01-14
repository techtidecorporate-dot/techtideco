import svgPaths from "./svg-rd6r3l2ft8";

function Group1() {
  return (
    <div className="absolute contents left-[895px] top-[433px]">
      <div className="absolute border border-black border-solid h-[306px] left-[895px] opacity-20 rounded-[50px] top-[433px] w-[520px]" style={{ backgroundImage: "linear-gradient(92.2882deg, rgb(69, 58, 188) 0%, rgb(96, 195, 227) 103.41%)" }} />
      <p className="absolute font-['Poppins:SemiBold',sans-serif] h-[253px] leading-[normal] left-[930px] not-italic text-[20px] text-[rgba(255,255,255,0.4)] top-[464px] w-[448px]">To develop cutting-edge technology that enables businesses to transform digitally, increase operational efficiency, and achieve significant business outcomes through innovative solutions tailored to their unique needs.</p>
    </div>
  );
}

function BtnPrimary() {
  return (
    <div className="content-stretch flex items-center justify-center px-[30px] py-[19px] relative rounded-tl-[20px] rounded-tr-[20px] shadow-[0px_4px_49px_0px_rgba(0,0,0,0.15)]" data-name="Btn-Primary" style={{ backgroundImage: "linear-gradient(94.3185deg, rgb(69, 58, 188) 0%, rgb(96, 195, 227) 103.41%)" }}>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[14px] not-italic relative shrink-0 text-[#fafafa] text-[14px] text-nowrap">Partner with US</p>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[370px] top-[512px]">
      <div className="absolute h-[454px] left-[370px] top-[512px] w-[815px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 815 454">
          <path d={svgPaths.p5e3fe80} fill="url(#paint0_linear_1_656)" id="Rectangle 15" opacity="0.7" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_656" x1="-1.34105" x2="860.049" y1="24.3017" y2="60.6618">
              <stop stopColor="#453ABC" />
              <stop offset="1" stopColor="#60C3E3" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <p className="absolute font-['Poppins:SemiBold',sans-serif] h-[334px] leading-[normal] left-[423px] not-italic text-[30px] text-white top-[572px] w-[709px]">To become the leading technology company by providing innovative solutions that drive global business advancement and create a more connected, efficient digital ecosystem for organizations worldwide.</p>
    </div>
  );
}

export default function VisionMission() {
  return (
    <div className="bg-white relative size-full" data-name="Vision & Mission">
      <Group1 />
      <p className="absolute bg-clip-text font-['Poppins:Bold',sans-serif] leading-[normal] left-[89px] not-italic text-[60px] text-nowrap top-[81px]" style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(101.892deg, rgb(69, 58, 188) 0%, rgb(96, 195, 227) 103.41%)" }}>{`Vision & Mission Statment`}</p>
      <p className="absolute font-['Poppins:SemiBold',sans-serif] leading-[normal] left-[1147px] not-italic text-[40px] text-[rgba(86,53,182,0.7)] text-nowrap top-[373px]">Our Mission</p>
      <p className="absolute font-['Poppins:SemiBold',sans-serif] leading-[normal] left-[401px] not-italic text-[40px] text-nowrap text-white top-[442px]">Our Vision</p>
      <div className="absolute flex h-[167px] items-center justify-center left-[1388px] top-[397px] w-[52px]" style={{ "--transform-inner-width": "104.25", "--transform-inner-height": "14" } as React.CSSProperties}>
        <div className="flex-none rotate-[270deg]">
          <BtnPrimary />
        </div>
      </div>
      <Group />
    </div>
  );
}