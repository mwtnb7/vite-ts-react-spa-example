import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProperty } from "../contexts/PropertyProvider";
import { useForm } from "../contexts/FormProvider";
import usePropertyIdFromUrl from "../hooks/usePropertyIdFromUrl";
import StepIndicator from "./StepIndicator";
import FormFooter from "./FormFooter";
import ErrorMessage from "./ErrorMessage";

const Step2: React.FC = () => {
	const { property } = useProperty();
	const { updateFormData, formData, setFormError } = useForm();
	// const [selectedRoomType, setSelectedRoomType] = useState<string | null>(
	// 	formData.roomType ? formData.roomType : null
	// );
	const navigate = useNavigate();
	const propertyId = usePropertyIdFromUrl();
	const FRONT_URL = import.meta.env.VITE_FRONT_URL;

	useEffect(() => {
		if (!propertyId) {
			setFormError("物件が選択されていません。");
			navigate(`${FRONT_URL}/`, { replace: true });
		}
	}, [propertyId, setFormError, navigate]);

	// 重複を除去した部屋タイプを取得
	const getUniqueRooms = () => {
		if (!property?.acf?.p_room_data) return [];

		const uniqueRooms = new Map();

		property.acf.p_room_data.forEach((room, index) => {
			const key = room.note ? `${room.type}/${room.note}` : room.type;
			if (!uniqueRooms.has(key)) {
				uniqueRooms.set(key, { ...room, originalIndex: index + 1 });
			}
		});

		return Array.from(uniqueRooms.values());
	};

	const handleRoomTypeChange = (value: string) => {
		// setSelectedRoomType(value);
		updateFormData("roomType", value);
		setFormError(null);

		// Step3に遷移
		navigate(`${FRONT_URL}/step3/?id=${propertyId}`);
	};

	const uniqueRooms = getUniqueRooms();

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
											{uniqueRooms.map((room) => (
												<span key={room.originalIndex}>
													<label>
														<input
															type="radio"
															name="room-type"
															value={room.type}
															checked={formData.roomType === room.type}
															onChange={() => handleRoomTypeChange(room.type)}
														/>
														<span>
															{room.type}
															{room.note ? `/${room.note}` : ""}
														</span>
													</label>
												</span>
											))}
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
