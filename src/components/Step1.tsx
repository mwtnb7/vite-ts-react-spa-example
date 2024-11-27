import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactModal from "react-modal";
import { useProperty } from "../contexts/PropertyProvider";
import { useForm } from "../contexts/FormProvider";
import usePropertyIdFromUrl from "../hooks/usePropertyIdFromUrl";
import StepIndicator from "./StepIndicator";
import PropertyCard from "./PropertyCard";
import FormFooter from "./FormFooter";
import ErrorMessage from "./ErrorMessage";
import type { PropertyData } from "../types/types";

const modalStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		width: "90%",
		maxWidth: "600px",
		maxHeight: "75%",
		padding: "2rem",
		borderRadius: "8px",
		boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
		overflow: "hidden",
	},
	overlay: {
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		zIndex: 9999,
	},
};

const Step1: React.FC = () => {
	const { property, setProperty } = useProperty();
	const propertyId = usePropertyIdFromUrl();

	const { setFormError } = useForm();
	const [properties, setProperties] = useState<PropertyData[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();
	const FRONT_URL = import.meta.env.VITE_FRONT_URL;

	useEffect(() => {
		const fetchProperties = async () => {
			try {
				const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/property?order=asc&per_page=100`);

				if (!response.ok) {
					throw new Error(`HTTPステータスコード: ${response.status}`);
				}

				const data = await response.json();
				setProperties(data);
			} catch (error) {
				console.error("物件の取得に失敗しました:", error);
			}
		};
		void fetchProperties();
	}, []);

	const handleCancelSelection = () => {
		setProperty(null);
		navigate(`${FRONT_URL}/`, { replace: true });
	};

	const handlePropertySelect = (selectedId: number) => {
		setFormError(null);
		setIsModalOpen(false);
		navigate(`${FRONT_URL}/?id=${selectedId}`, { replace: true });
	};

	const handleSelectClick = (e: React.MouseEvent<HTMLSelectElement>) => {
		e.preventDefault();
		setIsModalOpen(true);
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
					<ErrorMessage />
					<div className="c-forms__blocks">
						<div className="c-forms__block">
							<div className="c-forms__content">
								<div className="c-forms__select-property js-select-property">
									{property && propertyId ? (
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
													onClick={handleSelectClick}
													defaultValue="">
													<option
														value=""
														disabled>
														選択してください
													</option>
												</select>
											</div>
											<ReactModal
												isOpen={isModalOpen}
												style={modalStyles}
												onRequestClose={() => setIsModalOpen(false)}
												contentLabel="物件選択モーダル">
												<button
													className="c-forms__propety-cancel"
													onClick={() => setIsModalOpen(false)}
													aria-label="閉じる">
													<span className="u-visually-hidden">閉じる</span>
												</button>
												<div className="c-modal-inner">
													<h2 className="c-heading is-sm is-modal">物件一覧</h2>
													<div
														className="c-property-modal-inner"
														style={{
															maxHeight: "60vh",
															overflowY: "auto",
														}}>
														{properties.map((p) => (
															<PropertyCard
																key={p.id}
																property={p}
																onClick={() => handlePropertySelect(Number(p.id))}
															/>
														))}
													</div>
												</div>
											</ReactModal>
											<div className="u-text-right u-mbs is-top is-xxs">
												<a
													className="c-button-text"
													href="/find/"
													target="_blank">
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
				isNextDisabled={!propertyId}
			/>
		</>
	);
};

export default Step1;
