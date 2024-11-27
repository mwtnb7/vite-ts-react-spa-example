import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../contexts/FormProvider";
import { useProperty } from "../contexts/PropertyProvider";
import usePropertyIdFromUrl from "../hooks/usePropertyIdFromUrl";
import StepIndicator from "./StepIndicator";
import FormFooter from "./FormFooter";
import ErrorMessage from "./ErrorMessage";

const Step3: React.FC = () => {
	const { property } = useProperty();
	const { updateFormData, formData, setFormError } = useForm();
	const [selectedMealPlan, setSelectedMealPlan] = useState<number | null>(
		formData.mealPlan ? Number(formData.mealPlan) : null
	);
	const navigate = useNavigate();
	const propertyId = usePropertyIdFromUrl();
	const FRONT_URL = import.meta.env.VITE_FRONT_URL;

	useEffect(() => {
		if (!formData.roomType) {
			setFormError("ご希望の個室タイプを選択してください。");
			navigate(`${FRONT_URL}/step2/?id=${propertyId}`, { replace: true });
		}
	}, [formData.roomType, setFormError, navigate, propertyId]);

	const handleMealPlanChange = (mealPlan: number) => {
		setSelectedMealPlan(mealPlan);
		updateFormData("mealPlan", mealPlan);
		setFormError(null);

		navigate(`${FRONT_URL}/step4/?id=${propertyId}`);
	};

	return (
		<>
			<div className="c-forms">
				<StepIndicator
					currentStep={3}
					totalSteps={5}
				/>
				<div className="c-forms__inner">
					<h2 className="c-forms__head is-mb-sm">食事のご契約形態をお選びください</h2>
					<ErrorMessage />
					{property?.meal_type_labels && Object.keys(property.meal_type_labels).length > 0 ? (
						<div className="c-forms__blocks">
							<div className="c-forms__block">
								<div className="c-forms__content">
									<div className="c-forms__radio is-design is-border">
										<span>
											<span>
												{Object.entries(property.meal_type_labels).map(([key, label]) => (
													<span key={key}>
														<label>
															<input
																type="radio"
																name="meal-plan"
																value={key}
																checked={selectedMealPlan === Number(key)}
																onChange={() => handleMealPlanChange(Number(key))}
															/>
															<span>{label}</span>
														</label>
													</span>
												))}
											</span>
										</span>
									</div>
									<div className="c-forms__note">
										※多くの方が食事込を選択されますが、契約期間中に一度のみ変更することも可能です。
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className="c-forms__error">「選択できる項目が存在しません。」</div>
					)}
				</div>
			</div>
			<FormFooter
				step={3}
				totalSteps={5}
				isNextDisabled={!formData.mealPlan}
			/>
		</>
	);
};

export default Step3;
