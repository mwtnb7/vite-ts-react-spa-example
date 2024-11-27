import { useLocation } from "react-router-dom";

function usePropertyIdFromUrl() {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const propertyId = Number(searchParams.get("id") ?? 0);
	return propertyId || null;
}

export default usePropertyIdFromUrl;
