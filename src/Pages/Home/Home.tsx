import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/clerk-react";
import { Suspense } from "react";
export const HomePage = () => {
	return (
		<div className="flex flex-col items-center  gap-12 md:gap-12 lg:gap-6 h-full w-full overflow-scroll">
			<section className="sticky top-0 bg-white/80 z-10 flex flex-col items-center gap-6 py-3 w-full border-b shadow-md backdrop-blur-sm">
				<div className="text-center">
					<h2 className="text-4xl font-mono font-semibold">
						Plants Care
					</h2>
					<h4>Autonomous Crop Pot</h4>
				</div>

				<Suspense>
					<SignedOut>
						<SignUpButton mode="modal">
							<Button>Get started</Button>
						</SignUpButton>
					</SignedOut> 

					<SignedIn>
						<Link to="/dashboard">
							<Button>Dashboard</Button>
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
						<h2 className="text-[26px]">
							Understanding the Impact of insufficient plant care
						</h2>
						<p className="text-[14px]">
							Neglecting proper plant care can lead to more than
							just wilted leaves. It's crucial to understand that
							inadequate watering, poor sunlight exposure, and
							lack of nutrients can severely impact plant health.
						</p>
					</div>
				</section>

				<section className="min-h-[45%] flex items-center justify-between w-3/4">
					<div className="flex flex-col gap-4 w-[40%] text-balance text">
						<h2 className="text-[26px]">
							Revolutionize Your Gardening with the Autonomous
							Crop Pot
						</h2>
						<p className="text-[14px]">
							Say goodbye to the guesswork of gardening! The
							Autonomous Crop Pot is here to transform your plant
							care routine. This cutting-edge product is designed
							to automatically manage watering, lighting, and
							nutrients, ensuring your plants receive optimal care
							even when you're away.
						</p>
					</div>

					<div className="w-[40%]">
						<img
							src="pot_dreemy_transparent.png"
							className="h-full w-full object-cover"
						/>
					</div>
				</section>

				<section className="min-h-[30%] flex flex-col w-[90%]">
					<h2 className="text-[36px]">Just better.</h2>

					<ul className="flex gap-4">
						<li className="border rounded-lg w-fit px-4 py-2">
							<h3>Modular design</h3>
						</li>

						<li className="border rounded-lg w-fit px-4 py-2">
							<h3>Precision Monitoring</h3>
						</li>

						<li className="border rounded-lg w-fit px-4 py-2">
							<h3>Environmentally Friendly</h3>
						</li>

						<li className="border rounded-lg w-fit px-4 py-2">
							<h3>Intuitive usage</h3>
						</li>

						<li className="border rounded-lg w-fit px-4 py-2">
							<h3>Future-Proof</h3>
						</li>
					</ul>
				</section>
			</div>
		</div>
	);
};
