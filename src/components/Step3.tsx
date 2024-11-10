import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from '../contexts/FormProvider';
import StepIndicator from './StepIndicator';
import FormFooter from './FormFooter';

const Step3: React.FC = () => {
  const { updateFormData, formData } = useForm();
  const [selectedMealPlan, setSelectedMealPlan] = useState<string | null>(
    formData.mealPlan || null
  );
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const propertyId = searchParams.get('id');
  const FRONT_URL = import.meta.env.VITE_FRONT_URL;

  useEffect(() => {
    const storedMealPlan = localStorage.getItem('mealPlan');
    if (storedMealPlan) {
      setSelectedMealPlan(storedMealPlan);
      updateFormData('mealPlan', storedMealPlan);
    }

    if (!localStorage.getItem('roomType')) {
      navigate(`${FRONT_URL}/step2/?id=${propertyId}`);
    }
  }, []);

  const handleMealPlanChange = (mealPlan: string) => {
    setSelectedMealPlan(mealPlan);
    updateFormData('mealPlan', mealPlan);
    localStorage.setItem('mealPlan', mealPlan);

    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    navigate(`${FRONT_URL}/step4/${id ? `?id=${id}` : ''}`);
  };

  return (
    <>
      <div className='c-forms'>
        <StepIndicator currentStep={3} totalSteps={5} />
        <div className='c-forms__inner'>
          <h2 className='c-forms__head is-mb-sm'>
            食事のご契約形態をお選びください
          </h2>
          <div className='c-forms__blocks'>
            <div className='c-forms__block'>
              <div className='c-forms__content'>
                <div className='c-forms__radio is-design is-border'>
                  <span>
                    <span>
                      <span>
                        <label>
                          <input
                            type='radio'
                            name='food-type'
                            value='食事込'
                            checked={selectedMealPlan === '食事込'}
                            onChange={() => handleMealPlanChange('食事込')}
                          />
                          <span>食事込</span>
                        </label>
                      </span>
                      <span>
                        <label>
                          <input
                            type='radio'
                            name='food-type'
                            value='食事別'
                            checked={selectedMealPlan === '食事別'}
                            onChange={() => handleMealPlanChange('食事別')}
                          />
                          <span>食事別</span>
                        </label>
                      </span>
                    </span>
                  </span>
                </div>
                <div className='c-forms__note'>
                  ※多くの方が食事込を選択されますが、契約期間中に一度のみ変更することも可能です。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FormFooter step={3} totalSteps={5} isNextDisabled={!selectedMealPlan} />
    </>
  );
};

export default Step3;
