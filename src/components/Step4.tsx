import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "../contexts/FormProvider";
import StepIndicator from "./StepIndicator";
import FormFooter from "./FormFooter";
import ErrorMessage from "./ErrorMessage";

const Step4: React.FC = () => {
	const { formData, updateFormData, setFormError } = useForm();
	const [selectedYears, setSelectedYears] = useState<number | null>(
		formData.contractYears ? parseInt(formData.contractYears) : null
	);
	const navigate = useNavigate();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const propertyId = searchParams.get("id");
	const FRONT_URL = import.meta.env.VITE_FRONT_URL;

	useEffect(() => {
		if (!formData.mealPlan) {
			setFormError("食事プランを選択してください。");
			navigate(`${FRONT_URL}/step3/?id=${propertyId}`, { replace: true });
		}
	}, [formData.mealPlan]);

	const handleContractYearsChange = (years: number) => {
		setSelectedYears(years);
		updateFormData("contractYears", years.toString());
		setFormError(null);

		navigate(`${FRONT_URL}/step5/?id=${propertyId}`);
	};

	return (
		<>
			<div className="c-forms">
				<StepIndicator
					currentStep={4}
					totalSteps={5}
				/>
				<div className="c-forms__inner">
					<h2 className="c-forms__head is-mb-sm">ご契約年数をお選びください</h2>
					<ErrorMessage />
					<div className="c-forms__blocks">
						<div className="c-forms__block">
							<div className="c-forms__content">
								<div className="c-forms__radio is-design is-border">
									<span>
										<span>
											{Array.from({ length: 4 }, (_, i) => i + 1).map((year) => (
												<span key={year}>
													<label>
														<input
															type="radio"
															name="how-long"
															value={year}
															checked={selectedYears === year}
															onChange={() => handleContractYearsChange(year)}
														/>
														<span>{year}年</span>
													</label>
												</span>
											))}
										</span>
									</span>
								</div>
								<div className="c-forms__note">
									※一部の物件を除き、1年からお選びいただけます。卒業年度まで更新も可能です。
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<FormFooter
				step={4}
				totalSteps={5}
				isNextDisabled={!formData.contractYears}
			/>
		</>
	);
};

export default Step4;
