import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/clerk-react";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";

export const HomePage = () => {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col items-center md:gap-12 lg:gap-6 h-full w-full overflow-scroll ">
			<section className="sticky top-0 bg-primary-foreground/80 z-10 flex flex-col items-center gap-6 py-3 w-full border-b shadow-md backdrop-blur-sm ">
				<div className="text-center">
					<h2 className="text-4xl font-mono font-semibold">
						{t("home.headerTitle")}
					</h2>
					<h4>{t("home.subHeader")}</h4>
				</div>

				<Suspense>
					<SignedOut>
						<SignUpButton
							mode="modal"
							forceRedirectUrl="/"
							signInForceRedirectUrl="/"
						>
							<Button>{t("home.getStarted")}</Button>
						</SignUpButton>
					</SignedOut>

					<SignedIn>
						<Link to="/dashboard">
							<Button>{t("home.dashboard")}</Button>
						</Link>
					</SignedIn>
				</Suspense>
			</section>

			<div className="flex flex-col md:items-center  gap-[20dvh] md:gap-12 lg:gap-24 h-full w-full px-4 md:px-0">
				<section className="min-h-[45%] flex flex-col md:flex-row items-center w-full md:w-fit gap-6">
					<div className="h-fit w-2/3 md:w-[35%]">
						<img
							src="dyingPlant_1-transparent.png"
							className="h-full w-full object-cover"
						/>
					</div>
					<div className="flex flex-col gap-4 w-full md:w-1/3">
						<h2 className="text-[20px] md:text-[26px]">
							{t("home.section1Title")}
						</h2>
						<p className="text-[12px] md:text-[14px]">
							{t("home.section1Description")}
						</p>
					</div>
				</section>

				<section className="min-h-[45%] flex flex-col md:flex-row items-center justify-between w-full md:w-3/4">
					<div className="flex flex-col gap-4 w-full md:w-[40%] text-balance text">
						<h2 className="text-[20px] md:text-[26px]">
							{t("home.section2Title")}
						</h2>
						<p className="text-[12px] md:text-[14px]">
							{t("home.section2Description")}
						</p>
					</div>
					<div className="h-fit w-1/2 md:w-auto order-first md:order-last">
						<img
							src="pot_dreemy_transparent.png"
							className="h-full w-full object-cover"
						/>
					</div>
				</section>

				<section className="min-h-[30%] flex flex-col w-full md:w-[90%]">
					<h2 className="text-[28px] md:text-[36px]">
						{t("home.betterTitle")}
					</h2>

					<ul className="flex flex-col md:flex-row gap-4 pb-12">
						<li className="border rounded-lg w-full md:w-fit px-4 py-2">
							<h3 className="text-[14px] md:text-[16px]">
								{t("home.features.modularDesign")}
							</h3>
						</li>
						<li className="border rounded-lg w-full md:w-fit px-4 py-2">
							<h3 className="text-[14px] md:text-[16px]">
								{t("home.features.precisionMonitoring")}
							</h3>
						</li>
						<li className="border rounded-lg w-full md:w-fit px-4 py-2">
							<h3 className="text-[14px] md:text-[16px]">
								{t("home.features.ecoFriendly")}
							</h3>
						</li>
						<li className="border rounded-lg w-full md:w-fit px-4 py-2">
							<h3 className="text-[14px] md:text-[16px]">
								{t("home.features.intuitiveUsage")}
							</h3>
						</li>
						<li className="border rounded-lg w-full md:w-fit px-4 py-2">
							<h3 className="text-[14px] md:text-[16px]">
								{t("home.features.futureProof")}
							</h3>
						</li>
					</ul>
				</section>
			</div>
		</div>
	);
};
