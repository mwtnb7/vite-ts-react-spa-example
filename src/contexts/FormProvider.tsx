import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { SimulationFormData } from "../types/types";
import { useNavigate } from "react-router-dom";
import useSessionStorageState from "../hooks/useSessionStorageState";
import usePropertyIdFromUrl from "../hooks/usePropertyIdFromUrl";

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
	if (!context) throw new Error("useFormはFormProvider内で使用してください");
	return context;
};

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const propertyId = usePropertyIdFromUrl();
	const [formError, setFormError] = useState<string | null>(null);
	const navigate = useNavigate();

	const [formData, setFormData] = useSessionStorageState<SimulationFormData>("formData", {
		propertyId: propertyId || 0,
		roomType: "",
		mealPlan: 0,
		contractYears: 0,
		fullName: "",
		email: "",
		phone: "",
	});

	useEffect(() => {
		if (!formData.propertyId && !propertyId) {
			console.log("propertyIdが存在しません。");
			setFormError("");
			// navigate(`${import.meta.env.VITE_FRONT_URL}/`, { replace: true });
			return;
		}

		if (!propertyId || formData.propertyId !== propertyId) {
			console.log("propertyIdが一致しないため、formDataをリセットします。");
			resetFormData();
		}
	}, [propertyId]);

	const resetFormData = () => {
		const initialData: SimulationFormData = {
			propertyId: propertyId || 0,
			roomType: "",
			mealPlan: 0,
			contractYears: 0,
			fullName: "",
			email: "",
			phone: "",
		};
		setFormData(initialData);
		sessionStorage.removeItem("formData");
	};

	const updateFormData = (field: keyof SimulationFormData, value: string | number) => {
		let processedValue: string | number = value;

		if (["contractYears", "mealPlan", "propertyId"].includes(field) && typeof value === "string") {
			processedValue = parseInt(value, 10);
		}

		setFormData((prev) => ({ ...prev, [field]: processedValue }));
		console.log("フォームデータ更新:", field, processedValue);
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
				const errorMessage = errorData.message || "サーバーエラーが発生しました。";
				setFormError(errorMessage);
				return { success: false, message: errorMessage };
			}

			const result = await response.json();

			if (result.success) {
				sessionStorage.removeItem("formData");
				setFormError(null);
				return { success: true };
			} else {
				const errorMessage = result.message || "送信に失敗しました。再度お試しください。";
				setFormError(errorMessage);

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
