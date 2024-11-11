import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { PropertyData } from "../types/types";
import { useLocation, useNavigate } from "react-router-dom";

interface PropertyContextType {
	property: PropertyData | null;
	setProperty: (property: PropertyData | null) => void;
	propertyId: number | null;
	setPropertyId: (id: number | null) => void;
	fetchProperty: (id: number) => Promise<void>;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const useProperty = () => {
	const context = useContext(PropertyContext);
	if (!context) throw new Error("useProperty must be used within a PropertyProvider");
	return context;
};

export const PropertyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [property, setProperty] = useState<PropertyData | null>(null);
	const [propertyId, setPropertyId] = useState<number | null>(null);
	const location = useLocation();
	const navigate = useNavigate();

	// URLのidパラメータが変更された場合にpropertyIdを設定
	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const id = Number(searchParams.get("id") ?? 0);
		if (id) {
			setPropertyId(id);
		} else {
			setProperty(null);
			setPropertyId(null);
		}
	}, [location.search]);

	// propertyIdの変更を監視してfetchPropertyを実行
	useEffect(() => {
		if (propertyId) {
			void fetchProperty(propertyId);
		}
	}, [propertyId]);

	const fetchProperty = async (id: number) => {
		try {
			const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/property/${id}/`);

			if (!response.ok) {
				const errorData = await response.json();
				console.log("Error response:", errorData);

				if (errorData?.code === "rest_post_invalid_id") {
					console.error("Invalid property ID:", id);
					navigate(`${import.meta.env.VITE_FRONT_URL}/`, { replace: true });
					return;
				}

				throw new Error("Unexpected error during property fetch");
			}

			const data = await response.json();
			setProperty(data);
		} catch (error) {
			console.error("物件データの取得に失敗しました:", error);
			navigate(`${import.meta.env.VITE_FRONT_URL}/`, { replace: true });
		}
	};

	return (
		<PropertyContext.Provider value={{ property, setProperty, propertyId, setPropertyId, fetchProperty }}>
			{children}
		</PropertyContext.Provider>
	);
};
