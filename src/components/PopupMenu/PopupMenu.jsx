// components/PopupMenu.js
import React from "react";

const PopupMenu = ({ x, y, visible, title }) => {
	if (!visible) return null;

	return (
		<div
			style={{
				position: "fixed",
				top: y,
				left: x,
				backgroundColor: "white",
				border: "1px solid #ccc",
				boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
				padding: "8px 12px",
				zIndex: 1000,
				borderRadius: "4px",
				whiteSpace: "nowrap",
			}}
		>
			{title}
		</div>
	);
};

export default PopupMenu;
