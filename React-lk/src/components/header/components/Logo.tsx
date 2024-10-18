import classNames from "classnames";

type LogoType = {
  text: string,
  src?: string,
  logoClass?: string
}

const Logo = (props: LogoType) => {
  const {src, text, logoClass} = props;
	return (
		<div className={classNames('logo-container' , logoClass)}>
			{src ? <img src={src} alt='логотип' className="logo"/> : null}
      <p className="logo-text">{text}</p>
		</div>
	);
};

export default Logo;