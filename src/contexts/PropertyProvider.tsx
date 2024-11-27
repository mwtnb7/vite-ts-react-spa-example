import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { PropertyData } from "../types/types";
import { useNavigate, useLocation } from "react-router-dom";
import usePropertyIdFromUrl from "../hooks/usePropertyIdFromUrl";
import { useForm } from "../contexts/FormProvider";

interface PropertyContextType {
	property: PropertyData | null;
	setProperty: (property: PropertyData | null) => void;
	fetchProperty: (id: number) => Promise<void>;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const useProperty = () => {
	const context = useContext(PropertyContext);
	if (!context) throw new Error("usePropertyはPropertyProvider内で使用してください");
	return context;
};

export const PropertyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [property, setProperty] = useState<PropertyData | null>(null);
	const propertyId = usePropertyIdFromUrl();
	const navigate = useNavigate();
	const location = useLocation();
	const { setFormError } = useForm();

	useEffect(() => {
		const currentPath = location.pathname;
		const baseUrl = import.meta.env.VITE_FRONT_URL || ""; //  "simulation/"
		const adjustedBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;

		// 相対パスを取得
		const relativePath = currentPath.startsWith(adjustedBaseUrl)
			? currentPath.slice(adjustedBaseUrl.length)
			: currentPath;

		const normalizedPath = relativePath === "" ? "/" : relativePath;

		// リセットページ対象
		const isResetPage = normalizedPath === "/" || normalizedPath === "/complete/";

		// リセットページ && 物件IDが存在しない場合は物件データをリセット
		if (isResetPage && !propertyId) {
			setProperty(null);
		} else if (propertyId && Number(property?.id) !== propertyId) {
			void fetchProperty(propertyId);
		}
	}, [propertyId, location.pathname]);

	useEffect(() => {
		if (propertyId && property === null) {
			void fetchProperty(propertyId);
		}
	}, []);

	const fetchProperty = async (id: number) => {
		try {
			const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/property/${id}/`);

			if (!response.ok) {
				const errorData = await response.json();
				console.log("エラーレスポンス:", errorData);

				if (errorData?.code === "rest_post_invalid_id") {
					console.error("無効な物件ID:", id);
					navigate(`${import.meta.env.VITE_FRONT_URL}/`, { replace: true });
					setFormError("再度、物件を選択してください。");
					return;
				}

				throw new Error("物件データの取得中に予期しないエラーが発生しました");
			}

			const data = await response.json();
			console.log(data);
			setProperty(data);
		} catch (error) {
			console.error("物件データの取得に失敗しました:", error);
			navigate(`${import.meta.env.VITE_FRONT_URL}/`, { replace: true });
		}
	};

	return (
		<PropertyContext.Provider value={{ property, setProperty, fetchProperty }}>{children}</PropertyContext.Provider>
	);
};
