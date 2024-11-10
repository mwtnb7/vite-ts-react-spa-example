import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Header from "./layouts/Header";
import PageHeader from "./layouts/PageHeader";
import Footer from "./layouts/Footer";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import Step5 from "./components/Step5";
import Complete from "./components/Complete";
import { PropertyProvider } from "./contexts/PropertyProvider";
import { FormProvider } from "./contexts/FormProvider";

const App: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const FRONT_URL = import.meta.env.VITE_FRONT_URL;

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const propertyId = searchParams.get("id");

		if (!propertyId) {
			navigate(`${FRONT_URL}/`, { replace: true });
		}
	}, [location.search]);

	return (
		<PropertyProvider>
			<FormProvider>
				<div className="l-root-container">
					<Header />
					<PageHeader />
					<section className="l-section is-bottom is-xlg">
						<div className="l-container is-sp-lg">
							<div className="u-mbs is-top is-sm"></div>
							<Routes>
								<Route
									path={`${FRONT_URL}/`}
									element={<Step1 />}
								/>
								<Route
									path={`${FRONT_URL}/step2`}
									element={<Step2 />}
								/>
								<Route
									path={`${FRONT_URL}/step3`}
									element={<Step3 />}
								/>
								<Route
									path={`${FRONT_URL}/step4`}
									element={<Step4 />}
								/>
								<Route
									path={`${FRONT_URL}/step5`}
									element={<Step5 />}
								/>
								<Route
									path={`${FRONT_URL}/complete`}
									element={<Complete />}
								/>
							</Routes>
						</div>
					</section>
					<Footer />
				</div>
			</FormProvider>
		</PropertyProvider>
	);
};

export default App;
