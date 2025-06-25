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
}) => {
	const handleRightClickNode = (event, node) => {
		event.preventDefault();

		alert(`Hello World from node ${node.id}`);
	};

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
			fitView
		>
			<Background />
			<Controls />
		</ReactFlow>
	);
};

export default FlowCanvas;
