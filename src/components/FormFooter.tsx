// FormFooter.tsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "../contexts/FormProvider";

interface FormFooterProps {
	step: number;
	totalSteps: number;
	isNextDisabled?: boolean;
	onSubmit?: () => void;
}

const FormFooter: React.FC<FormFooterProps> = ({ step, totalSteps, isNextDisabled = false, onSubmit }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const { setFormError } = useForm(); // setFormErrorを取得

	const FRONT_URL = import.meta.env.VITE_FRONT_URL;
	const searchParams = location.search;

	const handlePrevClick = () => {
		setFormError(null); // 「前へ」ボタンクリック時にエラーメッセージをクリア

		if (step > 2) {
			navigate(`${FRONT_URL}/step${step - 1}/${searchParams}`);
		} else if (step === 2) {
			navigate(`${FRONT_URL}/${searchParams}`);
		} else {
			window.location.href = "/";
		}
	};

	const handleNextClick = () => {
		if (step < totalSteps) {
			navigate(`${FRONT_URL}/step${step + 1}/${searchParams}`);
		} else if (onSubmit) {
			onSubmit(); // Call onSubmit directly on the final step
		}
	};

	return (
		<div className="c-form-footer">
			<div className="c-form-footer__prev">
				<button
					className="c-form-footer__prev-button"
					onClick={handlePrevClick}>
					戻る
				</button>
			</div>
			{step < totalSteps && !isNextDisabled ? (
				<div className="c-form-footer__submit">
					<button
						className="c-button is-lg"
						onClick={handleNextClick}>
						次へ
					</button>
				</div>
			) : step === totalSteps ? (
				<div className="c-form-footer__submit">
					<button
						className="c-button is-lg"
						disabled={isNextDisabled}
						onClick={onSubmit}>
						送信する
					</button>
				</div>
			) : null}
		</div>
	);
};

export default FormFooter;
