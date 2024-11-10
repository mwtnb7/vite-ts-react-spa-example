import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from '../contexts/FormProvider';
import { z } from 'zod';
import FormFooter from './FormFooter';

// Define validation schema with Zod
const formSchema = z.object({
  fullName: z.string().min(1, '氏名を入力してください。').optional(),
  email: z
    .string()
    .email('有効なメールアドレスを入力してください。')
    .optional(),
  phone: z
    .string()
    .min(10, '電話番号は10桁以上で入力してください。')
    .optional(),
});

type FormDataSchema = z.infer<typeof formSchema>;

const Step5: React.FC = () => {
  const { formData, updateFormData, submitFormData } = useForm();
  const [errors, setErrors] = useState<Partial<FormDataSchema>>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const propertyId = searchParams.get('id');

  // Load saved form data from localStorage
  useEffect(() => {
    const storedFullName = localStorage.getItem('fullName');
    const storedEmail = localStorage.getItem('email');
    const storedPhone = localStorage.getItem('phone');

    if (storedFullName) updateFormData('fullName', storedFullName);
    if (storedEmail) updateFormData('email', storedEmail);
    if (storedPhone) updateFormData('phone', storedPhone);

    if (!localStorage.getItem('contractYears')) {
      navigate(`${import.meta.env.VITE_FRONT_URL}/step4/?id=${propertyId}`);
    }
  }, []);

  // Validate form data on every formData change
  useEffect(() => {
    const validate = formSchema.safeParse(formData);
    if (validate.success) {
      setIsFormValid(true);
      setErrors({});
    } else {
      const newErrors: Partial<FormDataSchema> = {};
      validate.error.errors.forEach((err) => {
        const fieldName = err.path[0] as keyof FormDataSchema;
        if (formData[fieldName]) {
          newErrors[fieldName] = err.message;
        }
      });
      setErrors(newErrors);
      setIsFormValid(false);
    }
  }, [formData]);

  // Handle input changes and update localStorage
  const handleInputChange = (field: keyof FormDataSchema, value: string) => {
    updateFormData(field, value);
    localStorage.setItem(field, value);
  };

  // Submit form data with validation recheck
  const handleSubmit = async () => {
    const validate = formSchema.safeParse(formData);
    if (!validate.success) {
      const newErrors: Partial<FormDataSchema> = {};
      validate.error.errors.forEach((err) => {
        const fieldName = err.path[0] as keyof FormDataSchema;
        newErrors[fieldName] = err.message;
      });
      setErrors(newErrors);
      setIsFormValid(false);
      return;
    }

    const success = await submitFormData();
    if (success) {
      localStorage.clear();
      navigate(`${import.meta.env.VITE_FRONT_URL}/complete/?id=${propertyId}`);
    } else {
      alert('送信に失敗しました。再度お試しください。');
    }
  };

  return (
    <div className='c-forms__inner'>
      <h2 className='c-forms__head is-mb-sm'>
        <span className='is-minus-margin'>
          シミュレーション結果の送信先を
          <br className='u-visible-sm' />
          教えてください
        </span>
      </h2>
      <div className='c-forms__blocks'>
        <div className='c-forms__block'>
          <div className='c-forms__title'>
            氏名<span className='c-forms__label'>必須</span>
          </div>
          <div className='c-forms__content'>
            <div className='c-forms__input'>
              <input
                type='text'
                name='your-name'
                placeholder='山田　一郎'
                value={formData.fullName || ''}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
              />
              {errors.fullName && (
                <p style={{ color: 'red' }}>{errors.fullName}</p>
              )}
            </div>
          </div>
        </div>
        <div className='c-forms__block'>
          <div className='c-forms__title'>
            メールアドレス<span className='c-forms__label'>必須</span>
          </div>
          <div className='c-forms__content'>
            <div className='c-forms__input'>
              <input
                type='email'
                name='your-email'
                placeholder='info@mail.jp'
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
              {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            </div>
          </div>
        </div>
        <div className='c-forms__block'>
          <div className='c-forms__title'>
            電話番号<span className='c-forms__label'>必須</span>
          </div>
          <div className='c-forms__content'>
            <div className='c-forms__input'>
              <input
                type='tel'
                name='tel-number'
                placeholder='123-456-7890'
                value={formData.phone || ''}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
              {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
            </div>
          </div>
        </div>
      </div>
      <FormFooter
        step={5}
        totalSteps={5}
        isNextDisabled={!isFormValid}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Step5;