const Footer = () => {
	return (
		<footer className="l-footer is-simple">
			<div className="c-pagetop js-fixedheader">
				<a
					className="js-anchor"
					href="#top"
					data-anchor-target="html"
					aria-label="ページ上部に戻る"></a>
			</div>
			<div className="l-container is-sp-sm">
				<div className="l-footer__grid">
					<div className="l-footer__contact-heading u-visible-md">
						<h2 className="c-heading is-xlg is-text-center">
							<span className="is-eng">Contact</span>お問い合わせ
						</h2>
					</div>
					<div className="l-footer__contact-buttons-main">
						<a
							className="c-button-cta is-tel is-sp-square"
							href="tel:0120-93-5606">
							<span
								className="is-icon"
								aria-hidden="true">
								call
							</span>
							<span className="c-button-cta__content">
								<span className="u-hidden-sm is-num">0120-93-5606</span>
								<span className="u-visible-sm is-text">電話する</span>
								<small className="is-caption">
									<span className="u-hidden-sm">受付時間 </span>9:00〜17:30（平日）
								</small>
							</span>
						</a>
						<a
							className="c-button-cta is-lg is-sp-square"
							href="/contact/application/">
							<span
								className="is-icon"
								aria-hidden="true">
								meeting_room
							</span>
							入居の
							<br className="u-visible-md" />
							お申し込み
						</a>
					</div>
					<div className="l-footer__contact-buttons-sub">
						<a
							className="c-button-cta is-footer is-bg-accent-blue"
							href="/contact/request/">
							<span
								className="is-icon"
								aria-hidden="true">
								description
							</span>
							資料請求
						</a>
						<a
							className="c-button-cta is-footer is-bg-accent-green"
							href="https://page.line.me/336xzkoq?openQrModal=true"
							target="_blank">
							<span
								className="is-icon"
								aria-hidden="true">
								<img
									src={`${import.meta.env.VITE_FRONT_URL}/assets/images/icon-line.svg`}
									alt=""
									width="24"
									height="24"
								/>
							</span>
							LINEで質問
						</a>
						<a
							className="c-button-cta is-footer is-bg-primary"
							href="/contact/simulation/">
							<span
								className="is-icon"
								aria-hidden="true">
								currency_yen
							</span>
							料金シミュレーション
						</a>
					</div>
					<div className="l-footer__content">
						<p className="l-footer__logo-copy">共立メンテナンスの名古屋学生会館の公式サイト</p>
						<a
							className="l-footer__logo"
							href="/">
							<img
								src={`${import.meta.env.VITE_FRONT_URL}/assets/images/logo-kyoritsu.png`}
								alt="学生会館ドーミー名古屋"
								width="392"
								height="99"
							/>
						</a>
					</div>
					<div className="l-footer__line"></div>
					<div className="l-footer__menu">
						<div className="l-footer__block">
							<ul className="l-footer__menulist">
								<li>
									<a href="/find/">物件を探す</a>
								</li>
								<li>
									<a href="/aboutus/">学生会館ドーミーとは</a>
								</li>
								<li>
									<a href="/charm/">選ばれる理由</a>
								</li>
								<li>
									<a href="/interview/">インタビュー</a>
								</li>
								<li>
									<a href="/flow/">入館の流れ</a>
								</li>
							</ul>
						</div>
						<div className="l-footer__block">
							<ul className="l-footer__menulist">
								<li>
									<a href="/parent/">保護者の皆様へ</a>
								</li>
								<li>
									<a href="/faq/">よくあるご質問</a>
								</li>
								<li>
									<a href="/topics/">お知らせ</a>
								</li>
								<li>
									<a href="/blog/">ドーミーブログ</a>
								</li>
								<li>
									<a
										href="https://page.line.me/336xzkoq?openQrModal=true"
										target="_blank">
										LINE登録
									</a>
								</li>
							</ul>
						</div>
						<div className="l-footer__block">
							<ul className="l-footer__menulist">
								<li>
									<a href="/favlist/">お気に入り物件</a>
									<ul className="l-footer__submenulist u-visible-md">
										<li>
											<a
												href="https://www.kyoritsugroup.co.jp/"
												target="_blank">
												運営会社について
											</a>
										</li>
										<li>
											<a
												href="https://www.kyoritsugroup.co.jp/privacy/"
												target="_blank">
												個人情報保護方針
											</a>
										</li>
										<li>
											<a href="/sitemap/">サイトマップ</a>
										</li>
									</ul>
								</li>
								<li>
									<a href="/contact/">お問い合わせ</a>
									<ul className="l-footer__submenulist">
										<li>
											<a href="/contact/simulation/">料金シミュレーション</a>
										</li>
										<li>
											<a href="/contact/application/">入居のお申し込み</a>
										</li>
										<li>
											<a
												href="https://page.line.me/336xzkoq?openQrModal=true"
												target="_blank">
												体験入館のお申し込み
											</a>
										</li>
										<li>
											<a href="/contact/tours/">見学のお申し込み</a>
										</li>
										<li>
											<a href="/contact/request/">資料請求</a>
										</li>
									</ul>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="l-footer__bottom">
					<a
						className="l-footer__bottom-logo"
						href="https://www.kyoritsugroup.co.jp/"
						target="_blank">
						<img
							src={`${import.meta.env.VITE_FRONT_URL}/assets/images/logo-kyoritsu.png`}
							alt="共立メンテナンス"
							width="117"
							height="49"
						/>
					</a>
					<div className="l-footer__bottom-menu">
						<ul className="l-footer__bottom-menulist u-hidden-md">
							<li>
								<a
									href="https://www.kyoritsugroup.co.jp/"
									target="_blank">
									運営会社について
								</a>
							</li>
							<li>
								<a
									href="https://www.kyoritsugroup.co.jp/privacy/"
									target="_blank">
									個人情報保護方針
								</a>
							</li>
							<li>
								<a href="/sitemap/">サイトマップ</a>
							</li>
						</ul>
					</div>
					<small className="l-footer__copyright">
						©<span className="js-current-year"></span> kyoritsugroup.co.jp
					</small>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
