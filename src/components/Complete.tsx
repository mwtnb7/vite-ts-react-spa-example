import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../contexts/FormProvider";
import { useProperty } from "../contexts/PropertyProvider";

const Complete: React.FC = () => {
	const navigate = useNavigate();
	const { setProperty } = useProperty();
	const { formData } = useForm();
	const FRONT_URL = import.meta.env.VITE_FRONT_URL || "";

	useEffect(() => {
		setProperty(null);

		if (
			!formData ||
			Object.entries(formData).every(([key, value]) => key === "propertyId" || value === "" || value === 0)
		) {
			navigate(`${FRONT_URL}/`, { replace: true });
		}
	}, [formData, navigate, setProperty, FRONT_URL]);

	return (
		<>
			<div className="c-forms">
				<div className="c-forms__inner">
					<p className="c-forms__head">
						ご回答
						<br className="u-visible-sm" />
						ありがとうございました。
					</p>
					<div className="c-forms__text">
						この度は料金シミュレーションにご回答いただき、誠にありがとうございます。
						<br />
						いただいた内容を元に、自動返信メールで結果をお送りいたしました。
						<br />
					</div>
				</div>
				<div className="c-forms__pagetop u-text-center">
					<a
						className="c-button"
						href={`${FRONT_URL}/`}>
						トップページに戻る
					</a>
				</div>
			</div>
		</>
	);
};

export default Complete;
