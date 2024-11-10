import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../contexts/FormProvider';

const Complete: React.FC = () => {
  const navigate = useNavigate();
  const { formData } = useForm();

  useEffect(() => {
    if (!formData || Object.values(formData).every((value) => value === '')) {
      navigate(`${import.meta.env.VITE_FRONT_URL}/`, { replace: true });
    }
  }, []);

  return (
    <>
      <div className='c-forms'>
        <div className='c-forms__inner'>
          <p className='c-forms__head'>
            ご回答
            <br className='u-visible-sm' />
            ありがとうございました。
          </p>
          <div className='c-forms__text'>
            この度はご回答いただき、誠にありがとうございます。
            <br />
            いただいた内容を元に、自動返信メールで結果をお送りいたしました。
            <br />
          </div>
        </div>
        <div className='c-forms__pagetop  u-text-center'>
          <a className='c-button' href='/'>
            トップページに戻る
          </a>
        </div>
      </div>
    </>
  );
};

export default Complete;
