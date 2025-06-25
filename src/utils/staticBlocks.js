export const staticBlocks = Array.from({ length: 15 }, (_, i) => {
	const id = (i + 1).toString();
	return {
		id,
		type: `block${id}`,
		label: `Block ${String.fromCharCode(64 + parseInt(id))}`,
	};
});
