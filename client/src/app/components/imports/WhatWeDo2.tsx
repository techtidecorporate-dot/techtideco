import svgPaths from "./svg-u8n82bcb3n";
import imgFrame34 from "figma:asset/5991d38925f70f707e902dac1e2ab7475afb2167.png";

function Wrapper() {
  return (
    <div
      className="absolute content-stretch flex flex-col gap-[12px] items-center justify-center left-[calc(50%-1px)] not-italic overflow-clip pb-[45px] pt-0 px-0 top-[119px] translate-x-[-50%] w-[770px]"
      data-name="wrapper"
    >
      <p
        className="bg-clip-text font-['Poppins:SemiBold',sans-serif] leading-[normal] relative shrink-0 text-[18px] text-nowrap"
        style={{
          WebkitTextFillColor: "transparent",
          backgroundImage:
            "linear-gradient(95.6204deg, rgb(69, 58, 188) 0%, rgb(96, 195, 227) 103.41%)",
        }}
      >
        What We Do
      </p>
      <p className="font-['Poppins:Bold',sans-serif] leading-[60px] relative shrink-0 text-[#191a23] text-[48px] text-nowrap">
        Our{" "}
        <span
          className="bg-clip-text bg-gradient-to-r from-[#3b82f6] from-[48.077%] to-[69.712%] to-[rgba(0,201,255,0.9)]"
          style={{ WebkitTextFillColor: "transparent" }}
        >
          Services
        </span>
      </p>
      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] min-w-full relative shrink-0 text-[#374151] text-[16px] text-center w-[min-content]">{`Discover Techtide Co.'s expertise in web development, mobile app development, and digital marketing. We build modern, scalable, and results-driven solutions to help your business grow online.`}</p>
    </div>
  );
}

function CaretRight() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="caret-right">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="caret-right">
          <path
            d={svgPaths.p1f32cb80}
            fill="var(--fill-0, black)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start justify-center left-[511.5px] overflow-clip rounded-[26px] top-[95px]">
      <CaretRight />
    </div>
  );
}

function CaretLeft() {
  return (
    <div
      className="absolute h-[19.751px] left-0 top-0 w-[19.501px]"
      data-name="caret-left"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 19.5008 19.7507"
      >
        <g id="caret-left">
          <path
            d={svgPaths.p18ac09f0}
            fill="var(--fill-0, black)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame8() {
  return (
    <div className="absolute bg-white left-[7.5px] overflow-clip rounded-[26px] size-[20px] top-[95px]">
      <CaretLeft />
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute h-[230px] left-[19.8px] overflow-clip rounded-[12px] top-[21.8px] w-[518px]">
      <img
        alt="Web Development service preview"
        className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[12px] size-full"
        src={imgFrame34}
      />

      <Frame7 />
      <Frame8 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex gap-[12px] items-center left-[21px] top-[17px]">
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[18px] text-nowrap text-white">
        Read More
      </p>
      <div className="relative shrink-0 size-[14px]" data-name="Vector">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 14 14"
        >
          <path
            d={svgPaths.p3d59f400}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </svg>
      </div>
    </div>
  );
}

function PrimaryButton() {
  return (
    <div
      className="bg-[#453abc] h-[61px] overflow-clip relative rounded-[8px] shrink-0 w-[161px]"
      data-name="Primary Button"
    >
      <div className="absolute bg-[rgba(217,217,217,0.2)] left-[16px] rounded-[31px] size-[30px] top-[15px]" />
      <Frame />
    </div>
  );
}

function Content() {
  return (
    <div
      className="absolute content-stretch flex flex-col gap-[12px] items-start left-[19.8px] top-[271.8px] w-[539px]"
      data-name="Content"
    >
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[#191a23] text-[32px] w-[min-content]">{`Web Development `}</p>
      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[#374151] text-[16px] w-[min-content]">
        We create fast, secure, and responsive websites that help your business
        grow online with custom SEO-friendly solutions optimized for
        performance.
      </p>
      <PrimaryButton />
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute bg-white border-[0.2px] border-[rgba(102,102,102,0.5)] border-solid h-[501px] left-[139px] opacity-50 overflow-clip rounded-[12px] shadow-[0px_0px_14.3px_0px_rgba(0,0,0,0.14)] top-[180px] w-[559px]">
      <Frame6 />
      <Content />
    </div>
  );
}

function CaretRight1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="caret-right">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="caret-right">
          <path
            d={svgPaths.p1f32cb80}
            fill="var(--fill-0, black)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start justify-center left-[511.5px] overflow-clip rounded-[26px] top-[95px]">
      <CaretRight1 />
    </div>
  );
}

function CaretLeft1() {
  return (
    <div
      className="absolute h-[19.751px] left-0 top-0 w-[19.501px]"
      data-name="caret-left"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 19.5008 19.7507"
      >
        <g id="caret-left">
          <path
            d={svgPaths.p18ac09f0}
            fill="var(--fill-0, black)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute bg-white left-[7.5px] overflow-clip rounded-[26px] size-[20px] top-[95px]">
      <CaretLeft1 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute h-[230px] left-[19.8px] overflow-clip rounded-[12px] top-[21.8px] w-[539px]">
      <img
        alt="Mobile App Development service preview"
        className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[12px] size-full"
        src={imgFrame34}
      />

      <Frame9 />
      <Frame10 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex gap-[12px] items-center left-[21px] top-[17px]">
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[18px] text-nowrap text-white">
        Read More
      </p>
      <div className="relative shrink-0 size-[14px]" data-name="Vector">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 14 14"
        >
          <path
            d={svgPaths.p3d59f400}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </svg>
      </div>
    </div>
  );
}

function PrimaryButton1() {
  return (
    <div
      className="bg-[#453abc] h-[61px] overflow-clip relative rounded-[8px] shrink-0 w-[161px]"
      data-name="Primary Button"
    >
      <div className="absolute bg-[rgba(217,217,217,0.2)] left-[16px] rounded-[31px] size-[30px] top-[15px]" />
      <Frame1 />
    </div>
  );
}

function Content1() {
  return (
    <div
      className="absolute content-stretch flex flex-col gap-[12px] items-start left-[19.8px] top-[271.8px] w-[539px]"
      data-name="Content"
    >
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[#191a23] text-[32px] w-[min-content]">{`Web Development `}</p>
      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[#374151] text-[16px] w-[min-content]">
        We create fast, secure, and responsive websites that help your business
        grow online with custom SEO-friendly solutions optimized for
        performance.
      </p>
      <PrimaryButton1 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute bg-white border-[0.2px] border-[rgba(102,102,102,0.5)] border-solid h-[501px] left-[-114px] opacity-50 overflow-clip rounded-[12px] shadow-[0px_0px_14.3px_0px_rgba(0,0,0,0.14)] top-[180px] w-[559px]">
      <Frame11 />
      <Content1 />
    </div>
  );
}

function CaretRight2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="caret-right">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="caret-right">
          <path
            d={svgPaths.p1f32cb80}
            fill="var(--fill-0, black)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame12() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start justify-center left-[511.5px] overflow-clip rounded-[26px] top-[95px]">
      <CaretRight2 />
    </div>
  );
}

function CaretLeft2() {
  return (
    <div
      className="absolute h-[19.751px] left-0 top-0 w-[19.501px]"
      data-name="caret-left"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 19.5008 19.7507"
      >
        <g id="caret-left">
          <path
            d={svgPaths.p18ac09f0}
            fill="var(--fill-0, black)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute bg-white left-[7.5px] overflow-clip rounded-[26px] size-[20px] top-[95px]">
      <CaretLeft2 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="absolute h-[230px] left-[19.8px] overflow-clip rounded-[12px] top-[21.8px] w-[539px]">
      <img
        alt="Digital Marketing service preview"
        className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[12px] size-full"
        src={imgFrame34}
      />

      <Frame12 />
      <Frame13 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute content-stretch flex gap-[12px] items-center left-[21px] top-[17px]">
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[18px] text-nowrap text-white">
        Read More
      </p>
      <div className="relative shrink-0 size-[14px]" data-name="Vector">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 14 14"
        >
          <path
            d={svgPaths.p3d59f400}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </svg>
      </div>
    </div>
  );
}

function PrimaryButton2() {
  return (
    <div
      className="bg-[#453abc] h-[61px] overflow-clip relative rounded-[8px] shrink-0 w-[161px]"
      data-name="Primary Button"
    >
      <div className="absolute bg-[rgba(217,217,217,0.2)] left-[16px] rounded-[31px] size-[30px] top-[15px]" />
      <Frame2 />
    </div>
  );
}

function Content2() {
  return (
    <div
      className="absolute content-stretch flex flex-col gap-[12px] items-start left-[19.8px] top-[271.8px] w-[539px]"
      data-name="Content"
    >
      <p className="font-['Poppins:SemiBold',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[#191a23] text-[32px] w-[min-content]">{`Web Development `}</p>
      <p className="font-['Poppins:Regular',sans-serif] leading-[normal] min-w-full not-italic relative shrink-0 text-[#374151] text-[16px] w-[min-content]">
        We create fast, secure, and responsive websites that help your business
        grow online with custom SEO-friendly solutions optimized for
        performance.
      </p>
      <PrimaryButton2 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute bg-white border-[0.2px] border-[rgba(102,102,102,0.5)] border-solid h-[508px] left-0 rounded-[12px] shadow-[0px_0px_14.3px_0px_rgba(0,0,0,0.14)] top-[112px] w-[579px]">
      <Frame14 />
      <Content2 />
    </div>
  );
}

function ProjectsSlider() {
  return (
    <div
      className="absolute h-[750px] left-[441px] top-[205px] w-[1179px]"
      data-name="Projects Slider"
    >
      <Frame4 />
      <Frame5 />
      <Frame3 />
    </div>
  );
}

function Image() {
  return (
    <div
      className="absolute h-[578px] left-[587px] rounded-[12px] top-[258px] w-[608px]"
      data-name="image"
    />
  );
}

export default function WhatWeDo() {
  return (
    <div className="bg-white relative size-full" data-name="What We Do - 2">
      <Wrapper />
      <ProjectsSlider />
      <Image />
    </div>
  );
}
