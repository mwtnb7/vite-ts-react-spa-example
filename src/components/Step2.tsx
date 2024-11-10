import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useProperty } from '../contexts/PropertyProvider';
import { useForm } from '../contexts/FormProvider';
import StepIndicator from './StepIndicator';
import FormFooter from './FormFooter';

const Step2: React.FC = () => {
  const { property } = useProperty();
  const { updateFormData, formData } = useForm();
  const [selectedRoomType, setSelectedRoomType] = useState<string | null>(
    formData.roomType || null
  );
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const propertyId = searchParams.get('id');
  const FRONT_URL = import.meta.env.VITE_FRONT_URL;

  useEffect(() => {
    const storedRoomType = localStorage.getItem('roomType');
    if (storedRoomType) {
      setSelectedRoomType(storedRoomType);
      updateFormData('roomType', storedRoomType);
    }

    if (!propertyId) {
      navigate(`${FRONT_URL}/step1/?id=${propertyId}`);
    }
  }, []);

  const handleRoomTypeChange = (roomType: string) => {
    setSelectedRoomType(roomType);
    updateFormData('roomType', roomType);
    localStorage.setItem('roomType', roomType);

    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    navigate(`${FRONT_URL}/step3/${id ? `?id=${id}` : ''}`);
  };

  return (
    <>
      <div className='c-forms'>
        <StepIndicator currentStep={2} totalSteps={5} />
        <div className='c-forms__inner'>
          <h2 className='c-forms__head is-mb-sm'>
            ご希望の個室タイプを
            <br className='u-visible-sm' />
            お選びください
          </h2>
          <div className='c-forms__blocks'>
            <div className='c-forms__block'>
              <div className='c-forms__content'>
                <div className='c-forms__radio is-design is-border is-vertical'>
                  <span>
                    <span>
                      {property?.acf?.p_room_data?.map((room, index) => (
                        <span key={index}>
                          <label>
                            <input
                              type='radio'
                              name='room-type'
                              value={`${room.type}/${room.note}`}
                              checked={selectedRoomType === room.type}
                              onChange={() => handleRoomTypeChange(room.type)}
                            />
                            <span>
                              {room.type}
                              {room.note ? `/${room.note}` : ''}
                            </span>
                          </label>
                        </span>
                      ))}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FormFooter step={2} totalSteps={5} isNextDisabled={!selectedRoomType} />
    </>
  );
};

export default Step2;
