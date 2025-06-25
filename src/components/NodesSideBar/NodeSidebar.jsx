import "./nodeSideBar.scss";

function NodeSidebar({ sidebarBlocks, onDragStart, removeBlock }) {
	return (
		<div className="sidebar">
			<div className="sidebarBlocksBox">
				{sidebarBlocks.map((block, idx) => (
					<div
						className="sidebarBlocksBoxBlock"
						key={block.id}
						draggable
						onDragStart={event => onDragStart(event, block)}
					>
						{block.label}
						<div
							className="sidebarBlocksBoxBlockCross"
							onClick={e => {
								e.stopPropagation();
								e.preventDefault();
								removeBlock(block.id);
							}}
						>
							✖
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default NodeSidebar;
