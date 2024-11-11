import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useProperty } from "../contexts/PropertyProvider";
import { useForm } from "../contexts/FormProvider";
import StepIndicator from "./StepIndicator";
import FormFooter from "./FormFooter";
import ErrorMessage from "./ErrorMessage";

const Step2: React.FC = () => {
	const { property } = useProperty();
	const { updateFormData, formData, setFormError } = useForm();
	const [selectedRoomIndex, setSelectedRoomIndex] = useState<number | null>(
		formData.roomType ? parseInt(formData.roomType) : null
	);
	const navigate = useNavigate();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const propertyId = searchParams.get("id");
	const FRONT_URL = import.meta.env.VITE_FRONT_URL;

	useEffect(() => {
		if (!propertyId) {
			setFormError("物件が選択されていません。");
			navigate(`${FRONT_URL}/?id=${propertyId}`, { replace: true });
		}
	}, []);

	const handleRoomTypeChange = (index: number) => {
		setSelectedRoomIndex(index);
		updateFormData("roomType", index.toString());
		setFormError(null);

		// step3に遷移
		navigate(`${FRONT_URL}/step3/?id=${propertyId}`);
	};

	return (
		<>
			<div className="c-forms">
				<StepIndicator
					currentStep={2}
					totalSteps={5}
				/>
				<div className="c-forms__inner">
					<h2 className="c-forms__head is-mb-sm">
						ご希望の個室タイプを
						<br className="u-visible-sm" />
						お選びください
					</h2>
					<ErrorMessage />
					<div className="c-forms__blocks">
						<div className="c-forms__block">
							<div className="c-forms__content">
								<div className="c-forms__radio is-design is-border is-vertical">
									<span>
										<span>
											{property?.acf?.p_room_data?.map((room, index) => {
												const displayIndex = index + 1; // 1から始める
												return (
													<span key={displayIndex}>
														<label>
															<input
																type="radio"
																name="roomType"
																value={displayIndex}
																checked={selectedRoomIndex === displayIndex}
																onChange={() => handleRoomTypeChange(displayIndex)}
															/>
															<span>
																{room.type}
																{room.note ? `/${room.note}` : ""}
															</span>
														</label>
													</span>
												);
											})}
										</span>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<FormFooter
				step={2}
				totalSteps={5}
				isNextDisabled={!formData.roomType}
			/>
		</>
	);
};

export default Step2;
