import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../contexts/FormProvider";
import { useProperty } from "../contexts/PropertyProvider";
import usePropertyIdFromUrl from "../hooks/usePropertyIdFromUrl";
import StepIndicator from "./StepIndicator";
import FormFooter from "./FormFooter";
import ErrorMessage from "./ErrorMessage";

const Step4: React.FC = () => {
	const { formData, updateFormData, setFormError } = useForm();
	const [selectedYears, setSelectedYears] = useState<number | null>(
		formData.contractYears ? Number(formData.contractYears) : null
	);
	const navigate = useNavigate();
	const { property } = useProperty();
	const propertyId = usePropertyIdFromUrl();
	const FRONT_URL = import.meta.env.VITE_FRONT_URL;

	useEffect(() => {
		if (!formData.mealPlan) {
			setFormError("食事プランを選択してください。");
			navigate(`${FRONT_URL}/step3/?id=${propertyId}`, { replace: true });
		}
	}, [formData.mealPlan, setFormError, navigate, propertyId, FRONT_URL]);

	const handleContractYearsChange = (years: number) => {
		setSelectedYears(years);
		updateFormData("contractYears", years);
		setFormError(null);

		navigate(`${FRONT_URL}/step5/?id=${propertyId}`);
	};

	// Determine selectable years
	const selectableYears = property?.acf?.p_kind === "マンションタイプ" ? [2] : [1, 2, 3, 4];

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
											{selectableYears.map((year) => (
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
