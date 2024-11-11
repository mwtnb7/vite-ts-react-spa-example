import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { SimulationFormData } from "../types/types";
import { useProperty } from "./PropertyProvider";
import { useNavigate } from "react-router-dom";

interface FormContextType {
	formData: SimulationFormData;
	updateFormData: (field: keyof SimulationFormData, value: string | number) => void;
	submitFormData: () => Promise<{ success: boolean; step?: number; message?: string }>;
	formError: string | undefined | null;
	setFormError: React.Dispatch<React.SetStateAction<string | null>>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useForm = () => {
	const context = useContext(FormContext);
	if (!context) throw new Error("useForm must be used within a FormProvider");
	return context;
};

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const { propertyId, setProperty } = useProperty();
	const [formError, setFormError] = useState<string | null>(null);
	const navigate = useNavigate();

	// formDataの初期化にpropertyIdを含める
	const [formData, setFormData] = useState<SimulationFormData>(() => {
		const savedData = sessionStorage.getItem("formData");
		return savedData
			? JSON.parse(savedData)
			: {
					propertyId: propertyId || 0,
					roomType: 0,
					mealPlan: 0,
					contractYears: 0,
					fullName: "",
					email: "",
					phone: "",
			  };
	});

	// formDataが変更されるたびにsessionStorageに保存
	useEffect(() => {
		sessionStorage.setItem("formData", JSON.stringify(formData));
	}, [formData]);

	// propertyIdが変更されたらformDataに反映
	useEffect(() => {
		if (propertyId) {
			updateFormData("propertyId", propertyId); // propertyIdをそのまま設定
		}
	}, [propertyId]);

	// updateFormDataをuseCallbackでメモ化して、依存の影響を避ける
	const updateFormData = (field: keyof SimulationFormData, value: string | number) => {
		let processedValue: string | number = value;

		// 必要なフィールドを数値として扱う
		if (["contractYears", "mealPlan", "propertyId", "roomType"].includes(field) && typeof value === "string") {
			processedValue = parseInt(value, 10);
		}

		setFormData((prev) => {
			const updatedData = { ...prev, [field]: processedValue };
			sessionStorage.setItem("formData", JSON.stringify(updatedData));
			return updatedData;
		});
	};

	const submitFormData = async (): Promise<{ success: boolean; step?: number; message?: string }> => {
		try {
			setFormError(null);
			const response = await fetch(`${import.meta.env.VITE_API_ORG_URL}/simulation/v2/submit`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				const errorData = await response.json();

				// console.log(errorData.message);

				const errorMessage = errorData.message || "サーバーエラーが発生しました。";
				setFormError(errorMessage);
				return { success: false, message: errorMessage };
			}

			const result = await response.json();

			if (result.success) {
				sessionStorage.removeItem("formData");
				setProperty(null);
				setFormError(null);
				return { success: true };
			} else {
				const errorMessage = result.message || "送信に失敗しました。再度お試しください。";
				setFormError(errorMessage);

				// エラーステップへのリダイレクト
				if (result.step) {
					navigate(`${import.meta.env.VITE_FRONT_URL}/step${result.step}`, { replace: true });
				}

				return {
					success: false,
					step: result.step,
					message: errorMessage,
				};
			}
		} catch (error) {
			console.error("フォーム送信に失敗しました:", error);
			setFormError("ネットワークエラーが発生しました。再度お試しください。");
			return {
				success: false,
				message: "ネットワークエラーが発生しました。再度お試しください。",
			};
		}
	};

	return (
		<FormContext.Provider value={{ formData, updateFormData, submitFormData, formError, setFormError }}>
			{children}
		</FormContext.Provider>
	);
};
