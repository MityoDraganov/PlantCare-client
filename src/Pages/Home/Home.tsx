import { handleScroll } from "../../lib/functions";
import { Leaf, Droplet, Sun, Wind, Zap } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useTranslation } from "react-i18next";
import { LanguageSelect } from "../../components/LanguageSelect";

import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
} from "@clerk/clerk-react";
import { Suspense } from "react";
import { Link } from "react-router-dom";

export const HomePage = () => {
	const { t } = useTranslation();
	const howItWorksSteps = [
		t("home.howItWorks.steps.0"),
		t("home.howItWorks.steps.1"),
		t("home.howItWorks.steps.2"),
		t("home.howItWorks.steps.3"),
	];
	return (
		<div className="relative flex flex-col min-h-screen overflow-y-scroll pt-[5%]">

			<main className="flex-grow">
				<section className="bg-gradient-to-b from-green-50 to-white py-20">
					<div className="container mx-auto px-4">
						<div className="flex flex-col md:flex-row items-center">
							<div className="md:w-1/2 mb-10 md:mb-0">
								<h1 className="text-4xl md:text-5xl font-bold mb-6">
									{t("home.hero.title")}
								</h1>
								<p className="text-xl mb-6 text-gray-600">
									{t("home.hero.subtitle")}
								</p>
								<Suspense>
									<SignedIn>
										<Link to="/dashboard">
											<Button
												size="lg"
												className="bg-green-600 hover:bg-green-700"
											>
												{t("home.hero.cta")}
											</Button>
										</Link>
									</SignedIn>
									<SignedOut>
										<ul className="flex gap-2 items-center">
											<SignInButton
												mode="modal"
												forceRedirectUrl={
													window.location.href
												}
												signUpForceRedirectUrl={
													window.location.href
												}
											>
												<Button variant="secondary">
													{t("home.header.signIn")}
												</Button>
											</SignInButton>
											<SignUpButton
												mode="modal"
												forceRedirectUrl={
													window.location.href
												}
												signInForceRedirectUrl={
													window.location.href
												}
											>
												<Button className="bg-green-600 hover:bg-green-700">
													{t(
														"home.header.getStarted"
													)}
												</Button>
											</SignUpButton>
										</ul>
									</SignedOut>
								</Suspense>
							</div>
							<div className="md:w-1/2">
								<img
									src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-11%20at%200.57.43-ihGpCwvdLu8lcRe9OaP3M0idzdYRVA.png"
									alt="PlantsCare Smart Pot"
									width={600}
									height={400}
									className="rounded-lg shadow-lg"
								/>
							</div>
						</div>
					</div>
				</section>

				<section id="features" className="py-20">
					<div className="container mx-auto px-4">
						<h2 className="text-3xl font-bold text-center mb-12">
							{t("home.features.title")}
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<FeatureCard
								icon={
									<Droplet className="h-8 w-8 text-blue-500" />
								}
								title={t("home.features.cards.watering.title")}
								description={t(
									"home.features.cards.watering.description"
								)}
							/>
							<FeatureCard
								icon={
									<Sun className="h-8 w-8 text-yellow-500" />
								}
								title={t("home.features.cards.lighting.title")}
								description={t(
									"home.features.cards.lighting.description"
								)}
							/>
							<FeatureCard
								icon={
									<Wind className="h-8 w-8 text-green-500" />
								}
								title={t(
									"home.features.cards.airControl.title"
								)}
								description={t(
									"home.features.cards.airControl.description"
								)}
							/>
						</div>
					</div>
				</section>

				<section id="how-it-works" className="bg-green-50 py-20">
					<div className="container mx-auto px-4">
						<h2 className="text-3xl font-bold text-center mb-12">
							{t("home.howItWorks.title")}
						</h2>
						<div className="flex flex-col md:flex-row items-center justify-between">
							<div className="md:w-1/2 mb-10 md:mb-0">
								<img
									src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-11%20at%200.57.40-s3laLqPdIxcVECd3SJIiaJNelsIhyh.png"
									alt="PlantsCare System Diagram"
									width={600}
									height={400}
									className="rounded-lg shadow-lg"
								/>
							</div>
							<div className="md:w-1/2 md:pl-10">
								<ol className="space-y-4">
									{howItWorksSteps.map((step, index) => (
										<li
											key={index}
											className="flex items-center space-x-3"
										>
											<div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white font-bold">
												{index + 1}
											</div>
											<span>{step}</span>
										</li>
									))}
								</ol>
							</div>
						</div>
					</div>
				</section>

				<section id="contact" className="py-20">
					<div className="container mx-auto px-4 text-center">
						<h2 className="text-3xl font-bold mb-8">
							{t("home.cta.title")}
						</h2>
						<p className="text-xl mb-8">{t("home.cta.subtitle")}</p>
						<Button
							size="lg"
							className="bg-green-600 hover:bg-green-700 mx-auto"
						>
							{t("home.cta.button")}
						</Button>
					</div>
				</section>
			</main>

		</div>
	);
};

function FeatureCard({
	icon,
	title,
	description,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
}) {
	return (
		<Card>
			<CardContent className="p-6">
				<div className="flex items-center space-x-4 mb-4">
					{icon}
					<h3 className="text-xl font-semibold">{title}</h3>
				</div>
				<p className="text-gray-600">{description}</p>
			</CardContent>
		</Card>
	);
}
