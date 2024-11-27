import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../contexts/FormProvider";
import usePropertyIdFromUrl from "../hooks/usePropertyIdFromUrl";
import { z } from "zod";
import StepIndicator from "./StepIndicator";
import FormFooter from "./FormFooter";
import ErrorMessage from "./ErrorMessage";

// Zodを使用してバリデーションスキーマを定義
const formSchema = z.object({
	fullName: z.string().min(1, "氏名を入力してください。").optional(),
	email: z.string().email("有効なメールアドレスを入力してください。").optional(),
	phone: z
		.string()
		.min(10, { message: "電話番号は10文字以上で入力してください。" })
		.regex(/^[0-9\-]+$/, "電話番号は半角数字とハイフンのみで入力してください。")
		.refine((val) => !val.startsWith("-") && !val.endsWith("-"), {
			message: "電話番号の最初と最後にはハイフンを使用しないでください。",
		})
		.optional(),
});

type FormDataSchema = z.infer<typeof formSchema>;

const Step5: React.FC = () => {
	const { formData, updateFormData, submitFormData, setFormError } = useForm();
	const [errors, setErrors] = useState<Partial<FormDataSchema>>({});
	const [isFormValid, setIsFormValid] = useState(false);
	const navigate = useNavigate();
	const propertyId = usePropertyIdFromUrl();
	const FRONT_URL = import.meta.env.VITE_FRONT_URL;

	// 必要なデータがない場合のリダイレクト
	useEffect(() => {
		if (!formData.contractYears) {
			setFormError("ご契約年数を選択してください。");
			navigate(`${FRONT_URL}/step4/?id=${propertyId}`, { replace: true });
		}
	}, [formData.contractYears, setFormError, navigate, propertyId, FRONT_URL]);

	// フォームデータのバリデーション
	useEffect(() => {
		const validate = formSchema.safeParse(formData);
		if (validate.success) {
			setIsFormValid(true);
			setErrors({});
		} else {
			const newErrors: Partial<FormDataSchema> = {};
			validate.error.errors.forEach((err) => {
				const fieldName = err.path[0] as keyof FormDataSchema;
				if (formData[fieldName]) {
					newErrors[fieldName] = err.message;
				}
			});
			setErrors(newErrors);
			setIsFormValid(false);
		}
	}, [formData]);

	// フォーム入力の変更
	const handleInputChange = (field: keyof FormDataSchema, value: string) => {
		updateFormData(field, value);
	};

	// フォーム送信
	const handleSubmit = async () => {
		const validate = formSchema.safeParse(formData);
		if (!validate.success) {
			const newErrors: Partial<FormDataSchema> = {};
			validate.error.errors.forEach((err) => {
				const fieldName = err.path[0] as keyof FormDataSchema;
				newErrors[fieldName] = err.message;
			});
			setErrors(newErrors);
			setIsFormValid(false);
			return;
		}

		// APIへの送信とレスポンスの処理
		const { success, message } = await submitFormData();

		if (success) {
			sessionStorage.clear();
			navigate(`${FRONT_URL}/complete/?id=${propertyId}`);
		} else {
			setFormError(message || "送信に失敗しました。再度お試しください。");
		}
	};

	return (
		<>
			<div className="c-forms">
				<StepIndicator
					currentStep={5}
					totalSteps={5}
				/>
				<div className="c-forms__inner">
					<h2 className="c-forms__head is-mb-sm">
						<span className="is-minus-margin">
							シミュレーション結果の送信先を
							<br className="u-visible-sm" />
							教えてください
						</span>
					</h2>
					{/* エラーメッセージの表示 */}
					<ErrorMessage />
					<div className="c-forms__blocks">
						<div className="c-forms__block">
							<div className="c-forms__title">
								氏名<span className="c-forms__label">必須</span>
							</div>
							<div className="c-forms__content">
								<div className="c-forms__input">
									<input
										type="text"
										name="your-name"
										placeholder="山田　一郎"
										value={formData.fullName || ""}
										onChange={(e) => handleInputChange("fullName", e.target.value)}
									/>
									{errors.fullName && <p style={{ color: "red" }}>{errors.fullName}</p>}
								</div>
							</div>
						</div>
						<div className="c-forms__block">
							<div className="c-forms__title">
								メールアドレス<span className="c-forms__label">必須</span>
							</div>
							<div className="c-forms__content">
								<div className="c-forms__input">
									<input
										type="email"
										name="your-email"
										placeholder="info@mail.jp"
										value={formData.email || ""}
										onChange={(e) => handleInputChange("email", e.target.value)}
									/>
									{errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
								</div>
							</div>
						</div>
						<div className="c-forms__block">
							<div className="c-forms__title">
								電話番号<span className="c-forms__label">必須</span>
							</div>
							<div className="c-forms__content">
								<div className="c-forms__input">
									<input
										type="tel"
										name="tel-number"
										placeholder="123-456-7890"
										value={formData.phone || ""}
										onChange={(e) => handleInputChange("phone", e.target.value)}
									/>
									{errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<FormFooter
				step={5}
				totalSteps={5}
				isNextDisabled={!isFormValid}
				onSubmit={handleSubmit}
			/>
		</>
	);
};

export default Step5;
