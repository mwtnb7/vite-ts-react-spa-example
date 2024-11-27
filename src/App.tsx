import { Routes, Route } from "react-router-dom";
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
	const FRONT_URL = import.meta.env.VITE_FRONT_URL;

	return (
		<FormProvider>
			<PropertyProvider>
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
			</PropertyProvider>
		</FormProvider>
	);
};

export default App;
