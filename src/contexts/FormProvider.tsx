import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SimulationFormData } from '../types/types';
import { useProperty } from './PropertyProvider'; // Import the hook

interface FormContextType {
  formData: SimulationFormData;
  updateFormData: (field: keyof SimulationFormData, value: string) => void;
  submitFormData: () => Promise<boolean>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error('useForm must be used within a FormProvider');
  return context;
};

export const FormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = useState<SimulationFormData>(() => {
    const savedData = localStorage.getItem('formData');
    return savedData
      ? JSON.parse(savedData)
      : {
          propertyId: '',
          roomType: '',
          mealPlan: '',
          contractYears: '',
          fullName: '',
          email: '',
          phone: '',
        };
  });

  const { setProperty } = useProperty(); // Access setProperty from useProperty

  const updateFormData = (field: keyof SimulationFormData, value: string) => {
    setFormData((prev) => {
      const updatedData = { ...prev, [field]: value };
      localStorage.setItem('formData', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const submitFormData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_ORG_URL}/simulation/v2/submit`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();

      if (result.success) {
        // Reset property on successful submission
        localStorage.removeItem('formData');
        setProperty(null);
      }
      return result.success;
    } catch (error) {
      console.error('フォーム送信に失敗しました:', error);
      return false;
    }
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData, submitFormData }}>
      {children}
    </FormContext.Provider>
  );
};
