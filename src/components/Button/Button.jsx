import "./button.scss";

const Button = ({ title, disabled, onClick = () => {} }) => {
	return (
		<button className="button" disabled={disabled} onClick={onClick}>
			{title}
		</button>
	);
};

export default Button;
