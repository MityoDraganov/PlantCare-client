import { SignIn } from "@clerk/clerk-react";
import { Button } from "../../components/ui/button";

export const HomePage = () => {
  return (
    <div className="flex flex-col items-center h-full pt-5 gap-6">
      <section className="flex flex-col gap-6">
        <h2 className="text-4xl font-mono">Plants Care</h2>
        <Button>Get started</Button>
      </section>

      <section className="h-[45%] flex items-center w-fit gap-6 ml-[2%]">
        <div className="h-full">
          <img src="dyingPlant_1-transparent.png" className="h-full" />
        </div>
        <div className="flex flex-col gap-4 w-1/3">
          <h2 className="text-[32px]">
            Understanding the Impact of insufficient plant care
          </h2>
          <p className="text-[16px]">
            Neglecting proper plant care can lead to more than just wilted
            leaves. It's crucial to understand that inadequate watering, poor
            sunlight exposure, and lack of nutrients can severely impact plant
            health, leading to stunted growth or even death.{" "}
          </p>
        </div>
      </section>
    </div>
  );
};
