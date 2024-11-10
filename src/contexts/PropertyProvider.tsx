import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { PropertyData } from '../types/types';
import { useLocation, useNavigate } from 'react-router-dom';

interface PropertyContextType {
  property: PropertyData | null;
  setProperty: (property: PropertyData | null) => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(
  undefined
);

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context)
    throw new Error('useProperty must be used within a PropertyProvider');
  return context;
};

export const PropertyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [property, setProperty] = useState<PropertyData | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const propertyId = Number(searchParams.get('id') ?? 0);

    if (propertyId && !property) {
      void fetchProperty(propertyId);
    } else if (!propertyId) {
      console.log('propertyId is not found');
      setProperty(null);
    }
  }, [property]);

  const fetchProperty = async (id: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/property/${id}/`
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error response:', errorData);

        if (errorData?.code === 'rest_post_invalid_id') {
          console.error('Invalid property ID:', id);
          navigate(`${import.meta.env.VITE_FRONT_URL}/`, { replace: true });
          return;
        }

        throw new Error('Unexpected error during property fetch');
      }

      const data = await response.json();
      setProperty(data);
      // console.log("Property data:", data);
    } catch (error) {
      console.error('物件データの取得に失敗しました:', error);
      navigate(`${import.meta.env.VITE_FRONT_URL}/`, { replace: true });
    }
  };

  return (
    <PropertyContext.Provider value={{ property, setProperty }}>
      {children}
    </PropertyContext.Provider>
  );
};
