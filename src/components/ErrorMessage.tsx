import React from "react";
import { useForm } from "../contexts/FormProvider";

interface ErrorMessageProps {
	message?: string | null | undefined;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
	const { formError } = useForm();

	const errorMessage = message || formError;

	if (!errorMessage) return null; // エラーメッセージがない場合は表示しない

	return <p style={{ color: "#d85438", marginBottom: "1rem" }}>{errorMessage}</p>;
};

export default ErrorMessage;
