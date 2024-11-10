const Header = () => {
  return (
    <header className='l-header is-simple'>
      <div className='l-header__content'>
        <div className='l-header__logo'>
          <a href='/'>
            <img
              src={`${import.meta.env.VITE_FRONT_URL}/assets/images/logo.png`}
              alt='タイトル'
              width={154}
              height={69}
            />
          </a>
        </div>
        <div className='l-header__simple-tel'>
          <a className='l-header__simple-tel-item' href='tel:0120-xx-xxxx'>
            <span className='is-icon'>call</span>
            <span className='is-num'>0120-xx-xxxx</span>
          </a>
          <div className='l-header__simple-tel-text'>
            受付時間 9:00〜17:30（平日）
          </div>
        </div>
        <div className='l-header__sp-nav'>
          <a className='l-header__sp-nav-item' href='tel:0120-xx-xxxx'>
            <span className='is-icon'>call</span>
            <span className='is-text'>電話</span>
          </a>
          <a
            className='l-header__sp-nav-item'
            href='https://example.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <span className='is-icon'>question_answer</span>
            <span className='is-text'>LINE</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
