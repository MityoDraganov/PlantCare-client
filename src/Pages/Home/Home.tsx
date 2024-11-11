import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/clerk-react";
import { Suspense } from "react";
import { useTranslation } from 'react-i18next';

export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center gap-12 md:gap-12 lg:gap-6 h-full w-full overflow-scroll">
      <section className="sticky top-0 bg-primary-foreground/80 z-10 flex flex-col items-center gap-6 py-3 w-full border-b shadow-md backdrop-blur-sm">
        <div className="text-center">
          <h2 className="text-4xl font-mono font-semibold">{t('home.headerTitle')}</h2>
          <h4>{t('home.subHeader')}</h4>
        </div>

        <Suspense>
          <SignedOut>
            <SignUpButton mode="modal" forceRedirectUrl="/" signInForceRedirectUrl="/" >
              <Button>{t('home.getStarted')}</Button>
            </SignUpButton>
          </SignedOut> 

          <SignedIn>
            <Link to="/dashboard">
              <Button>{t("home.dashboard")}</Button>
            </Link>
          </SignedIn>
        </Suspense>
      </section>

      <div className="flex flex-col items-center gap-24 md:gap-12 lg:gap-6 h-full w-full">
        <section className="min-h-[45%] flex items-center w-fit gap-6">
          <div className="h-full w-[35%]">
            <img
              src="dyingPlant_1-transparent.png"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-4 w-1/3">
            <h2 className="text-[26px]">{t('home.section1Title')}</h2>
            <p className="text-[14px]">{t('home.section1Description')}</p>
          </div>
        </section>

        <section className="min-h-[45%] flex items-center justify-between w-3/4">
          <div className="flex flex-col gap-4 w-[40%] text-balance text">
            <h2 className="text-[26px]">{t('home.section2Title')}</h2>
            <p className="text-[14px]">{t('home.section2Description')}</p>
          </div>

          <div className="w-[40%]">
            <img
              src="pot_dreemy_transparent.png"
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        <section className="min-h-[30%] flex flex-col w-[90%]">
          <h2 className="text-[36px]">{t('home.betterTitle')}</h2>

          <ul className="flex gap-4">
            <li className="border rounded-lg w-fit px-4 py-2">
              <h3>{t('home.features.modularDesign')}</h3>
            </li>
            <li className="border rounded-lg w-fit px-4 py-2">
              <h3>{t('home.features.precisionMonitoring')}</h3>
            </li>
            <li className="border rounded-lg w-fit px-4 py-2">
              <h3>{t('home.features.ecoFriendly')}</h3>
            </li>
            <li className="border rounded-lg w-fit px-4 py-2">
              <h3>{t('home.features.intuitiveUsage')}</h3>
            </li>
            <li className="border rounded-lg w-fit px-4 py-2">
              <h3>{t('home.features.futureProof')}</h3>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};
