import { ReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const FlowCanvas = ({
	nodes,
	edges,
	onNodesChange,
	onEdgesChange,
	onConnect,
	onDrop,
	onDragOver,
	handleRightClickNode,
	onCanvasClick,
}) => {
	return (
		<ReactFlow
			nodes={nodes}
			edges={edges}
			onNodesChange={onNodesChange}
			onEdgesChange={onEdgesChange}
			onConnect={onConnect}
			onDrop={onDrop}
			onDragOver={onDragOver}
			onNodeContextMenu={handleRightClickNode}
			onClick={onCanvasClick}
		>
			<Background />
			<Controls />
		</ReactFlow>
	);
};

export default FlowCanvas;
