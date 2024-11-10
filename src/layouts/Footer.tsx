const Footer = () => {
  return (
    <footer className='l-footer is-simple'>
      <div className='c-pagetop js-fixedheader'>
        <a
          className='js-anchor'
          href='#top'
          data-anchor-target='html'
          aria-label='ページ上部に戻る'
        ></a>
      </div>
      <div className='l-container is-sp-sm'>
        <div className='l-footer__bottom'>
          <div className='l-footer__bottom-menu'>
            <ul className='l-footer__bottom-menulist u-hidden-md'>
              <li>
                <a href='https://www.example.co.jp/' target='_blank'>
                  運営会社について
                </a>
              </li>
              <li>
                <a href='https://www.example.co.jp/privacy/' target='_blank'>
                  個人情報保護方針
                </a>
              </li>
              <li>
                <a href='/sitemap/'>サイトマップ</a>
              </li>
            </ul>
          </div>
          <small className='l-footer__copyright'>
            ©<span className='js-current-year'></span> @mwtnb7
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
