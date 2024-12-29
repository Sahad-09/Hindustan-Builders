import { ModeToggle } from "@/components/mode-toggle";

function Snowfall() {
  const snowflakes = Array.from({ length: 100 }, (_, i) => i); // Generate 100 snowflakes

  return (
    <div className="snowfall z-50">
      {snowflakes.map((flake) => (
        <div key={flake} className="snowflake ">
          ❄
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* <ModeToggle /> */}
      <Snowfall />
      <Snowfall />
      <div className="text-center space-y-6 mt-10">
        {/* Title */}
        <h1
          className="text-6xl md:text-8xl leading-[5rem] md:leading-[8rem] font-extrabold tracking-tight text-transparent 
          bg-clip-text bg-gradient-to-r from-orange-500  via-white via-50% to-green-500 
          animate-bounce"
        >
          Hindustan Builders
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl ">
          Something amazing is coming soon.
        </p>
      </div>
    </div>
  );
}