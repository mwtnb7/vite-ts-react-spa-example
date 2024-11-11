import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "../contexts/FormProvider";
import StepIndicator from "./StepIndicator";
import FormFooter from "./FormFooter";
import ErrorMessage from "./ErrorMessage";

const Step3: React.FC = () => {
	const { updateFormData, formData, setFormError } = useForm();
	const [selectedMealPlan, setSelectedMealPlan] = useState<number | null>(
		formData.mealPlan ? parseInt(formData.mealPlan) : null
	);
	const navigate = useNavigate();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const propertyId = searchParams.get("id");
	const FRONT_URL = import.meta.env.VITE_FRONT_URL;

	useEffect(() => {
		if (!formData.roomType) {
			setFormError("ご希望の個室タイプを選択してください。");
			navigate(`${FRONT_URL}/step2/?id=${propertyId}`, { replace: true });
		}
	}, [formData.roomType]);

	const handleMealPlanChange = (mealPlan: number) => {
		setSelectedMealPlan(mealPlan);
		updateFormData("mealPlan", mealPlan.toString()); // 数値を文字列として保存
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
					<div className="c-forms__blocks">
						<div className="c-forms__block">
							<div className="c-forms__content">
								<div className="c-forms__radio is-design is-border">
									<span>
										<span>
											<span>
												<label>
													<input
														type="radio"
														name="meadPlan"
														value={1}
														checked={selectedMealPlan === 1}
														onChange={() => handleMealPlanChange(1)}
													/>
													<span>食事込</span>
												</label>
											</span>
											<span>
												<label>
													<input
														type="radio"
														name="meadPlan"
														value={2}
														checked={selectedMealPlan === 2}
														onChange={() => handleMealPlanChange(2)}
													/>
													<span>食事別</span>
												</label>
											</span>
										</span>
									</span>
								</div>
								<div className="c-forms__note">
									※多くの方が食事込を選択されますが、契約期間中に一度のみ変更することも可能です。
								</div>
							</div>
						</div>
					</div>
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
