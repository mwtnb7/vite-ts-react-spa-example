import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from '../contexts/FormProvider';
import StepIndicator from './StepIndicator';
import FormFooter from './FormFooter';

const Step4: React.FC = () => {
  const { formData, updateFormData } = useForm();
  const [selectedYears, setSelectedYears] = useState<string | null>(
    formData.contractYears || null
  );
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const propertyId = searchParams.get('id');
  const FRONT_URL = import.meta.env.VITE_FRONT_URL;

  useEffect(() => {
    const storedYears = localStorage.getItem('contractYears');
    if (storedYears) {
      setSelectedYears(storedYears);
      updateFormData('contractYears', storedYears);
    }

    if (!localStorage.getItem('mealPlan')) {
      navigate(`${FRONT_URL}/step3/?id=${propertyId}`);
    }
  }, []);

  const handleContractYearsChange = (years: string) => {
    setSelectedYears(years);
    updateFormData('contractYears', years);
    localStorage.setItem('contractYears', years);

    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    navigate(`${FRONT_URL}/step5/${id ? `?id=${id}` : ''}`);
  };

  return (
    <>
      <div className='c-forms'>
        <StepIndicator currentStep={4} totalSteps={5} />
        <div className='c-forms__inner'>
          <h2 className='c-forms__head is-mb-sm'>ご契約年数をお選びください</h2>
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
                            name='how-long'
                            value='1年'
                            checked={selectedYears === '1年'}
                            onChange={() => handleContractYearsChange('1年')}
                          />
                          <span>1年</span>
                        </label>
                      </span>
                      <span>
                        <label>
                          <input
                            type='radio'
                            name='how-long'
                            value='2年'
                            checked={selectedYears === '2年'}
                            onChange={() => handleContractYearsChange('2年')}
                          />
                          <span>2年</span>
                        </label>
                      </span>
                      <span>
                        <label>
                          <input
                            type='radio'
                            name='how-long'
                            value='3年'
                            checked={selectedYears === '3年'}
                            onChange={() => handleContractYearsChange('3年')}
                          />
                          <span>3年</span>
                        </label>
                      </span>
                      <span>
                        <label>
                          <input
                            type='radio'
                            name='how-long'
                            value='4年'
                            checked={selectedYears === '4年'}
                            onChange={() => handleContractYearsChange('4年')}
                          />
                          <span>4年</span>
                        </label>
                      </span>
                    </span>
                  </span>
                </div>
                <div className='c-forms__note'>
                  ※一部の物件を除き、1年からお選びいただけます。卒業年度まで更新も可能です。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FormFooter step={4} totalSteps={5} isNextDisabled={!selectedYears} />
    </>
  );
};

export default Step4;
