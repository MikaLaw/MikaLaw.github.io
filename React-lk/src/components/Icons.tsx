import Icon from '@ant-design/icons';
import {ComponentPropsWithRef} from "react";
import ArrowUp from "./icons/ArrowUp";
import User from "./icons/User";
import Home from "./icons/Home";
import EyeCross from "./icons/EyeCross";
import Eye from "./icons/Eye";
import Close from "./icons/Close";
import Delete from "./icons/Delete";
import Briefcase from "./icons/Briefcase";
import Exit from "./icons/Exit";
import CustomClose from "./icons/CustomClose";
import Right from "./icons/Right";
import Message from "./icons/Message";
import Menu from "./icons/Menu";
import Info from "./icons/Info";
import BreadcrumbArrow from "./icons/BreadcrumbArrow";
import Catalog from './icons/Catalog';
import SliderArrow from "./icons/SliderArrow";
import Telegram from "./icons/Telegram";
import Whatsapp from "./icons/Whatsapp";

const CustomCloseIcon = (props: ComponentPropsWithRef<typeof Icon>) => <Icon component={CustomClose} {...props} />;
const UserIcon = (props: ComponentPropsWithRef<typeof Icon>) => <Icon component={User} {...props} />;
const HomeIcon = (props: ComponentPropsWithRef<typeof Icon>) => <Icon component={Home} {...props} />;
const EyeCrossIcon = (props: ComponentPropsWithRef<typeof Icon>) => <Icon component={EyeCross} {...props} />;
const EyeIcon = (props: ComponentPropsWithRef<typeof Icon>) => <Icon component={Eye} {...props} />;
const CloseIcon = (props: ComponentPropsWithRef<typeof Icon>) => <Icon component={Close} {...props} />;
const DeleteIcon = (props: ComponentPropsWithRef<typeof Icon>) => <Icon component={Delete} {...props} />;
const BriefcaseIcon = (props: ComponentPropsWithRef<typeof Icon>) => <Icon component={Briefcase} {...props} />;
const ExitIcon = (props: ComponentPropsWithRef<typeof Icon>) => <Icon component={Exit} {...props} />;
const RightIcon = (props: ComponentPropsWithRef<typeof Icon>) => <Icon component={Right} {...props} />;
const MessageIcon = (props: ComponentPropsWithRef<typeof Icon>) => <Icon component={Message} {...props} />;
const ArrowUpIcon = (props: ComponentPropsWithRef<typeof Icon>) => <Icon component={ArrowUp} {...props} />;
const MenuIcon = (props: ComponentPropsWithRef<typeof Icon>) => <Icon component={Menu} {...props} />;
const InfoIcon = (props: ComponentPropsWithRef<typeof Icon>) => <Icon component={Info} {...props} />;
const BreadcrumbArrowIcon = (props: ComponentPropsWithRef<typeof Icon>) => <Icon component={BreadcrumbArrow} {...props} />;
const CatalogIcon = (props: ComponentPropsWithRef<typeof Icon>) => <Icon component={Catalog} {...props} />;
const SliderArrowIcon = (props: ComponentPropsWithRef<typeof Icon>) => <Icon component={SliderArrow} {...props} />;
const TelegramIcon = (props: ComponentPropsWithRef<typeof Icon>) => <Icon component={Telegram} {...props} />;
const WhatsappIcon = (props: ComponentPropsWithRef<typeof Icon>) => <Icon component={Whatsapp} {...props} />;

export {
	UserIcon,
	HomeIcon,
	EyeCrossIcon,
	EyeIcon,
	CloseIcon,
	DeleteIcon,
	BriefcaseIcon,
	ExitIcon,
	CustomCloseIcon,
	RightIcon,
	MessageIcon,
	ArrowUpIcon,
	MenuIcon,
	InfoIcon,
	BreadcrumbArrowIcon,
	CatalogIcon,
	SliderArrowIcon,
	TelegramIcon,
	WhatsappIcon
};
