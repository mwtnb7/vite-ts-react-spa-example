import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useProperty } from "../contexts/PropertyProvider";
import { useForm } from "../contexts/FormProvider";
import StepIndicator from "./StepIndicator";
import FormFooter from "./FormFooter";
import ErrorMessage from "./ErrorMessage";
import type { PropertyData } from "../types/types";

const Step1: React.FC = () => {
	const { property, setProperty } = useProperty();
	const { setFormError } = useForm();
	const [properties, setProperties] = useState<PropertyData[]>([]);
	const [localPropertyId, setLocalPropertyId] = useState<number | null>(null);
	const location = useLocation();
	const navigate = useNavigate();
	const FRONT_URL = import.meta.env.VITE_FRONT_URL;

	const searchParams = new URLSearchParams(location.search);
	const propertyId = searchParams.get("id");

	useEffect(() => {
		if (!propertyId) {
			navigate(`${FRONT_URL}/?id=${propertyId}`, { replace: true });
		}
		const fetchProperties = async () => {
			try {
				const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/property`);
				const data = await response.json();
				setProperties(data);
			} catch (error) {
				console.error("物件の取得に失敗しました:", error);
			}
		};

		void fetchProperties();
	}, []);

	useEffect(() => {
		if (!propertyId) {
			setProperty(null);
		}
	}, [property]);

	const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedId = parseInt(event.target.value);

		if (selectedId) {
			setLocalPropertyId(selectedId);
			setFormError(null);

			navigate(`${FRONT_URL}/?id=${selectedId}`, { replace: true });
		}
	};

	const handleCancelSelection = () => {
		setProperty(null);
		setLocalPropertyId(null);

		const searchParams = new URLSearchParams(location.search);
		searchParams.delete("id");
		navigate(`${FRONT_URL}/?${searchParams.toString()}`, { replace: true });
	};

	return (
		<>
			<div className="c-forms">
				<StepIndicator
					currentStep={1}
					totalSteps={5}
				/>
				<div className="c-forms__inner">
					<h2 className="c-forms__head is-mb-sm">ご希望の物件をお選びください</h2>
					{/* エラーメッセージの表示 */}
					<ErrorMessage />
					<div className="c-forms__blocks">
						<div className="c-forms__block">
							<div className="c-forms__content">
								<div className="c-forms__select-property js-select-property">
									{property ? (
										<div
											className="c-forms__select-property-selected"
											style={{ display: "block" }}>
											<div className="c-forms__propety">
												<button
													className="c-forms__propety-cancel js-select-property-cancel"
													onClick={handleCancelSelection}>
													<span className="u-visually-hidden">解除</span>
												</button>
												<div className="c-forms__propety-image">
													<img
														src={property.featured_image_url}
														alt={property.title.rendered}
													/>
												</div>
												<div className="c-forms__propety-content">
													<div className="c-forms__propety-title">
														{property.title.rendered}
													</div>
													<div className="c-forms__propety-labels">
														{property.feature_labels &&
															Object.entries(property.feature_labels).map(
																([label, className], index) => (
																	<span
																		key={index}
																		className={`c-label ${className}`}>
																		{label}
																	</span>
																)
															)}
													</div>
												</div>
											</div>
										</div>
									) : (
										<div className="c-forms__select-property-select">
											<div className="c-forms__select">
												<select
													name="property-name"
													onChange={handleSelectChange}
													defaultValue="">
													<option
														value=""
														disabled>
														選択してください
													</option>
													{properties.map((p) => (
														<option
															key={p.id}
															value={p.id}>
															{p.title.rendered}
														</option>
													))}
												</select>
											</div>
											<div className="u-text-right u-mbs is-top is-xxs">
												<a
													className="c-button-text"
													href="/find/">
													物件一覧ページを見る<span className="c-button-icon"></span>
												</a>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<FormFooter
				step={1}
				totalSteps={5}
				isNextDisabled={!property && !localPropertyId}
			/>
		</>
	);
};

export default Step1;
