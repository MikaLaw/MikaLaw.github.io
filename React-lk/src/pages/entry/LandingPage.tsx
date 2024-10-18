import React, {FC, useRef, useEffect, useState} from 'react';
import {Swiper, SwiperRef, SwiperSlide, useSwiper} from "swiper/react";
import {Mousewheel, Pagination} from "swiper";
import SwiperCore, {Keyboard} from 'swiper';
import ScrollContainer from 'react-indiana-drag-scroll';
import "swiper/css";
import "swiper/css/pagination";
import Logo from "../../components/header/components/Logo";
import LogoKatren from '../../assets/images/katren_logo.svg';
import SingleCabinet from '../../assets/images/landing/single-cabinet.png';
import AlwaysBenefit from '../../assets/images/landing/always-benefit.png';
import ConvenientSearch from '../../assets/images/landing/convenient-search.png';
import WorkWithDocuments from '../../assets/images/landing/work-with-documents.png';
import AccessForPartners from '../../assets/images/landing/access-for-partners.png';
import StatusInformation from '../../assets/images/landing/status-information.png';
import ReviewStatistics from '../../assets/images/landing/review-statistics.png';
import RibbonWithUsefulMaterials from '../../assets/images/landing/ribbon-materials.png';
import FavoritesPic from '../../assets/images/landing/favorites-pic.png';
import ReceiptEexpected from '../../assets/images/landing/receipt-expected.png';
import {useActions} from "react-redux-actions-hook";
import {push} from 'connected-react-router';
import routes from "../../routes";
import {katrenLink} from "../../config";
import {goToPage} from "../../tools/utils";
import useMedia from 'use-media';
import {useWindowSize} from "../../hooks/useWindowSize";
import {Swiper as SwiperClass} from "swiper/types";

const LandingPage: FC = () => {
	const [swiperState, setSwiperState] = useState<SwiperClass | null>(null);
	const isXs = useMedia({minWidth: 481});
	const {width, height} = useWindowSize();
	SwiperCore.use([Keyboard]);
	const {push: pushAction} = useActions({push});
	const container = useRef<HTMLDivElement>(null);
	const swiperWorkSize = width > 639 && height > 650;
	const tagsList = [
		{class: 'landing-tag_color-1', text: 'Скидки'},
		{text: 'Документы'},
		{class: 'landing-tag_color-2', text: 'Оптовый онлайн-заказ'},
		{class: 'landing-tag_color-3', text: 'Выгода'},
		{class: 'landing-tag_color-4', text: 'Сервис'},
		{class: 'landing-tag_color-5', text: 'Прайс'},
		{class: 'landing-tag_color-6', text: 'Логистика' },
		{class: 'landing-tag_color-2', text: 'Акции' },
		{text: 'Маркировка'},
		{class: 'landing-tag_color-7', text: 'apteka', span: '.ru', type: 'complex'},
		{text: 'Разагрегация' },
		{class: 'landing-tag_color-2', text: 'Отзывы' },
		{text: 'Ожидается поступление' },
		{class: 'landing-tag_color-6', text: 'Избранное' },
		{text: 'Импорт заказов'},
		{class: 'landing-tag_color-2', text: 'Повтор заказа' },
		{text: 'Статистика'},
		{class: 'landing-tag_color-6', text: 'История заказов'},
	]

	useEffect(() => {
		if(container.current)
		{
			let containerWidth = container.current.children[0].clientWidth / 2 - container.current.clientWidth / 2
			container.current.scrollTo(containerWidth, 0);
		}
	}, []);

	const LandingArrow = ({text = '', className = '', direction = 'down'}) => {
		const swiper = useSwiper();
		return (
			<button
				onClick={() => direction === 'up' ?
					!swiperWorkSize ? swiper.slideTo(0)
					:
					swiper.slideTo(0)
					:swiper.slideNext()
				}
				className={className.length !== 0 ? 'landing-arrow ' + className:'landing-arrow '}
			>
				<div className='landing-arrow__icon' />
				{text.length !== 0 ? <div className='landing-arrow__text'>{text}</div>:null}
			</button>
		);
	};

	const LandingHeader = () => {
		return (
			<header className='landing-header'>
				<div className='landing-container'>
					<div
						className="header__logo"
						onClick={() => goToPage(katrenLink)}
					>
						<Logo src={LogoKatren} text='' logoClass=""/>
					</div>

					<div className="table-panel__matrix-btn" onClick={() => pushAction(routes.login.path)}>
						<span className="table-panel__matrix-bc"/>
						<span className="table-panel__matrix-text">{!isXs ? 'Войти ':'Войти в личный кабинет'}</span>
					</div>
				</div>
			</header>
		)
	}

	useEffect(() => {
		swiperWorkSize ? swiperState?.enable():swiperState?.disable();
	}, [swiperWorkSize, swiperState])

	return (
		<div className='landing'>
			<LandingHeader/>
			<main>
				<Swiper
					onSwiper={(swiper) => setSwiperState(swiper)}
					direction="vertical"
					slidesPerView={1}
					spaceBetween={0}
					mousewheel={{
						sensitivity: 10,
						thresholdTime: 5,
						thresholdDelta: 5
					}}
					onKeyPress={(swiper, keyCode) => {
						if(+keyCode === 36)
						{
							swiper.slideTo(0)
						} else if(+keyCode === 35)
						{
							swiper.slideTo(swiper.slides.length - 1)
						}
					}}
					onSlidePrevTransitionEnd={(swiper) => {
						if(swiperWorkSize)
						{
							if(swiper.activeIndex === 1)
							{
								swiper.slides[1].children[0].children[0].classList.add("animate__fadeInUp");
								swiper.slides[1].children[0].children[1].classList.add("animate__fadeInUp");
							}
							if (swiper.activeIndex < swiper.slides.length - 1) {

								if (swiper.activeIndex % 2 === 0) {
									swiper.slides[swiper.activeIndex].children[0].children[0].classList.add("animate__fadeInLeft");
									swiper.slides[swiper.activeIndex].children[0].children[1].classList.add("animate__fadeInRight");
								} else {
									swiper.slides[swiper.activeIndex].children[0].children[0].classList.add("animate__fadeInRight");
									swiper.slides[swiper.activeIndex].children[0].children[1].classList.add("animate__fadeInLeft");
								}
							}
						}
					}}
					onSlideNextTransitionEnd={(swiper) => {
						if(swiperWorkSize)
						{
							if(swiper.activeIndex === 1)
							{
								swiper.slides[1].children[0].children[0].classList.add("animate__fadeInUp");
								swiper.slides[1].children[0].children[1].classList.add("animate__fadeInUp");
							}
							if (swiper.activeIndex < swiper.slides.length - 1) {
								if (swiper.activeIndex % 2 === 0) {
									swiper.slides[swiper.activeIndex].children[0].children[0].classList.add("animate__fadeInLeft");
									swiper.slides[swiper.activeIndex].children[0].children[1].classList.add("animate__fadeInRight");
								} else {
									swiper.slides[swiper.activeIndex].children[0].children[0].classList.add("animate__fadeInRight");
									swiper.slides[swiper.activeIndex].children[0].children[1].classList.add("animate__fadeInLeft");
								}
							}

						}
					}}
					keyboard={{
						enabled: true,
						onlyInViewport: false,
						pageUpDown: true
					}}
					pagination={{
						clickable: true,
					}}
					modules={[Mousewheel, Pagination]}
					className={swiperWorkSize ? "scroll-enable":'scroll-disable'}
				>
					<SwiperSlide tag='section' className='section'>
						<div className='landing-container-1'>
							<div className='landing-left landing-left-1'>
								<div className='landing-subtitle'>личный кабинет клиента</div>
								<h1 className='landing-title'>Единый кабинет для&nbsp;работы с &#171;Катрен&#187;</h1>
								<div className='landing-text'>Персональные скидки, акции, сводный прайс-лист и оптовый онлайн-заказ товара для аптек и сетей. Работа с документами и логистикой. Вся информация для работы с <div className='landing-decor-text'>apteka<span>.ru</span></div></div>
							</div>
							<div className='landing-right'>
								<div className='landing-pic'>
									<div className='landing-animation landing-animation-11'></div>
									<div className='landing-animation landing-animation-9'></div>
									<div className='landing-animation landing-animation-10'></div>
									<div className='landing-animation landing-animation-3'></div>
									<div className='landing-animation landing-animation-2'></div>
									<div className='landing-animation landing-animation-8'></div>
									<div className='landing-animation landing-animation-1'></div>
									<div className='landing-animation landing-animation-6'></div>
									<div className='landing-animation landing-animation-4'></div>
									<div className='landing-animation landing-animation-7'></div>
									<div className='landing-animation landing-animation-5'></div>
								</div>
								<img className='landing-img landing-img-1' src={SingleCabinet} alt="личный кабинет клиента"/>
							</div>
						</div>
						{swiperWorkSize ? <LandingArrow/>:null}
					</SwiperSlide>
					<SwiperSlide tag='section' className='section'>
						<div className='landing-container-2'>
							<div className='landing-left landing-left_black animation'>
								<h2 className='landing-title'>Все необходимое в одном кабинете для&nbsp;удобной работы и контроля</h2>
							</div>
							<ul className='landing-list animation'>
								<li className='landing-item'>
									<div className='landing-advantages'>apteka.ru</div>
								</li>
								<li className='landing-item'>
									<div className='landing-advantages'>скидки от поставщиков</div>
								</li>
								<li className='landing-item'>
									<div className='landing-advantages'>скидки <br/> &laquo;катрен&raquo;</div>
								</li>
								<li className='landing-item'>
									<div className='landing-advantages'>Оформление заказа</div>
								</li>
								<li className='landing-item'>
									<div className='landing-advantages'>Умная корзинa</div>
								</li>
								<li className='landing-item'>
									<div className='landing-advantages'>Удобный поиск</div>
								</li>
								<li className='landing-item'>
									<div className='landing-advantages'>Работа с логистикой</div>
								</li>
							</ul>
						</div>
						{swiperWorkSize ? <LandingArrow/>:null}
					</SwiperSlide>
					<SwiperSlide tag='section' className='section'>
						<div className='landing-container'>
							<div className='landing-left landing-left_black animation'>
								<div className='landing-icon landing-icon_benefit'></div>
								<h2 className='landing-title'>Всегда в выгоде</h2>
								<div className='landing-text'>Чтобы вы ни выбрали в прайсе, умная корзина предложит вам варианты этого же товара по акции.</div>
							</div>
							<div className='landing-right animation'>
								<img className='landing-img' src={AlwaysBenefit} alt="Всегда в выгоде"/>
							</div>
						</div>
						{swiperWorkSize ? <LandingArrow/>:null}
					</SwiperSlide>
					<SwiperSlide tag='section' className='section'>
						<div className='landing-container-revers'>
							<div className='landing-left landing-left_black animation'>
								<div className='landing-icon landing-icon_search'></div>
								<h2 className='landing-title'>Удобный поиск товаров в сводном прайсе</h2>
								<div className='landing-text'>Ищите товары по названию или свойствам в колонках, сохраняйте параметры поиска для повторяющихся заказов.</div>
							</div>
							<div className='landing-right animation'>
								<img className='landing-img' src={ConvenientSearch} alt="Удобный поиск товаров в прайсе"/>
							</div>
						</div>
						{swiperWorkSize ? <LandingArrow/>:null}
					</SwiperSlide>
					<SwiperSlide tag='section' className='section'>
						<div className='landing-container'>
							<div className='landing-left landing-left_black animation'>
								<div className='landing-icon landing-icon_favorites'></div>
								<h2 className='landing-title'>Избранное</h2>
								<div className='landing-text'>Создавайте список избранных товаров, следите за акциями и получайте уведомления о товарах.</div>
							</div>
							<div className='landing-right animation'>
								<img className='landing-img' src={FavoritesPic} alt="Всегда в выгоде"/>
							</div>
						</div>
						{swiperWorkSize ? <LandingArrow/>:null}
					</SwiperSlide>
					<SwiperSlide tag='section' className='section'>
						<div className='landing-container-revers'>
							<div className='landing-left landing-left_black animation'>
								<div className='landing-icon landing-icon_time'></div>
								<h2 className='landing-title'>Ожидается поступление</h2>
								<div className='landing-text'>Отслеживайте поступление интересующих товаров на склад, добавляйте позиции в «Избранное».</div>
							</div>
							<div className='landing-right animation'>
								<img className='landing-img' src={ReceiptEexpected} alt="Удобный поиск товаров в прайсе"/>
							</div>
						</div>
						{swiperWorkSize ? <LandingArrow/>:null}
					</SwiperSlide>
					<SwiperSlide tag='section' className='section'>
						<div className='landing-container'>
							<div className='landing-left animation landing-left_black'>
								<div className='landing-icon landing-icon_lightning'></div>
								<h2 className='landing-title'>Лента  с полезными материалами</h2>
								<div className='landing-text'>Просматривайте обучающие материалы, анонсы, новости и уведомления, сортируйте и сохраняйте важные для своей аптеки публикации о фармацевтическом рынке.</div>
							</div>
							<div className='landing-right animation'>
								<img className='landing-img' src={RibbonWithUsefulMaterials} alt="Лента  с полезными материалами"/>
							</div>
						</div>
						{swiperWorkSize ? <LandingArrow/>:null}
					</SwiperSlide>
					<SwiperSlide tag='section' className='section'>
						<div className='landing-container-revers'>
							<div className='landing-left animation landing-left_black'>
								<div className='landing-icon landing-icon_documents'></div>
								<h2 className='landing-title'>Работайте с документами и логистикой</h2>
								<div className='landing-text'>Оформляйте претензии и возвраты, скачивайте необходимые сертификаты, работайте с ЭДО и маркировкой.</div>
							</div>
							<div className='landing-right animation'>
								<img className='landing-img' src={WorkWithDocuments} alt="Работайте с документами и логистикой"/>
							</div>
						</div>
						{swiperWorkSize ? <LandingArrow/>:null}
					</SwiperSlide>
					<SwiperSlide tag='section' className='section'>
						<div className='landing-container'>
							<div className='landing-left animation landing-left_blue'>
								<div className='landing-icon landing-icon_access'></div>
								<h2 className='landing-title'>Доступ к <div className='landing-decor-text'>apteka<span>.ru</span>
								</div> для партнеров в&nbsp;отдельном разделе
								</h2>
								<div className='landing-text'>Если вы подключены к <div className='landing-decor-text'>apteka<span>.ru</span>
								</div>, вы увидите специальный раздел в меню со всей необходимой информацией для работы с сервисом.
								</div>
							</div>
							<div className='landing-right animation'>
								<img className='landing-img' src={AccessForPartners} alt="Доступ к apteka.ru для партнёров в отдельном разделе"/>
							</div>
						</div>
						{swiperWorkSize ? <LandingArrow/>:null}
					</SwiperSlide>
					<SwiperSlide tag='section' className='section'>
						<div className='landing-container-revers'>
							<div className='landing-left animation landing-left_blue'>
								<div className='landing-icon landing-icon_access'></div>
								<h2 className='landing-title'>Информация о статусе заказов</h2>
								<div className='landing-text'>Получайте оперативные данные по заказам для удобной работы и контроля выдачи</div>
							</div>
							<div className='landing-right animation'>
								<img className='landing-img' src={StatusInformation} alt="Информация о статусе заказов: на сборке, в пути, в аптеке"/>
							</div>
						</div>
						{swiperWorkSize ? <LandingArrow/>:null}
					</SwiperSlide>
					<SwiperSlide tag='section' className='section'>
						<div className='landing-container'>
							<div className='landing-left animation landing-left_blue'>
								<div className='landing-icon landing-icon_access'></div>
								<div className='landing-statistics'>
									<div className='landing-statistics__item'>
										<div className='landing-statistics__label'>Положительных</div>
										<div className='landing-statistics__value'>96% <span>740 шт</span></div>
									</div>
									<div className='landing-statistics__item'>
										<div className='landing-statistics__label'>Отрицательных</div>
										<div className='landing-statistics__value'>4%<span>31 шт</span></div>
									</div>
								</div>
								<h2 className='landing-title'>Статистика отзывов из&nbsp;сервиса <div className='landing-decor-text'>apteka<span>.ru</span>
								</div></h2>
								<div className='landing-text'>Следите за статистикой отзывов по аптеке, чтобы поддерживать высокий уровень сервиса для своих покупателей</div>
							</div>
							<div className='landing-right animation'>
								<img className='landing-img' src={ReviewStatistics} alt="Статистика отзывов  из сервиса apteka.ru"/>
							</div>
						</div>
						{swiperWorkSize ? <LandingArrow/>:null}
					</SwiperSlide>
					<SwiperSlide tag='section' className='section'>
						<div className='landing-container-3'>
							<div className='landing-left landing-left_black '>
								<h2 className='landing-title'>Приходите за сервисом к нам</h2>
							</div>
						</div>
						<ScrollContainer className="scroll-container" innerRef={container}>
							<div className='landing-tags'>
								{
									tagsList.map((item) => {
										if(item.type === 'complex')
										{
											return (
												<div key={item.text} className={item.class ? 'landing-tag ' + item.class:'landing-tag'}>{item.text}<span>{item.span}</span>
												</div>)
										} else
										{
											return (
												<div key={item.text} className={item.class ? 'landing-tag ' + item.class:'landing-tag'}>{item.text}</div>)
										}
									})
								}
							</div>
						</ScrollContainer>
						{!swiperWorkSize ? (
							<button
								className="landing-arrow landing-arrow_up"
								onClick={() => {
									window.requestAnimationFrame(() => {
										swiperState?.slides[0].scrollIntoView({
											behavior: 'smooth'
										})
									})
								}}
							>
								<div className="landing-arrow__icon" />
								<div className="landing-arrow__text">Наверх</div>
							</button>
						) : (
							<LandingArrow text='Наверх' className='landing-arrow_up' direction='up'/>
						)}
						<footer className='landing-footer'>
							<div className='landing-container-footer'>
								<a href='https://machineheads.ru/' target='_blank' rel="noreferrer" className='landing-footer-text'>Сделано в Machineheads</a>
							</div>
						</footer>
					</SwiperSlide>
				</Swiper>
			</main>
		</div>
	);
};

export default LandingPage;