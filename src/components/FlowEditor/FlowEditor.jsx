import React, { useCallback, useState } from "react";
import {
	useNodesState,
	useEdgesState,
	addEdge,
	MarkerType,
} from "@xyflow/react";
import NodeSidebar from "../NodesSideBar/NodeSidebar";
import FlowCanvas from "../FlowCanvas/FlowCanvas";

import Button from "../Button/Button";

import { staticBlocks } from "../../utils/staticBlocks";

import "./flowEditor.scss";

const FlowEditor = () => {
	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);
	const [sidebarBlocks, setSidebarBlocks] = useState(staticBlocks);

	const [undoStack, setUndoStack] = useState([]);
	const [redoStack, setRedoStack] = useState([]);

	const saveStateToUndoStack = () => {
		setUndoStack(prev => [...prev, { nodes, edges }]);
		setRedoStack([]);
	};

	const handleUndo = e => {
		e.preventDefault();
		if (undoStack.length === 0) return;

		const prevState = undoStack[undoStack.length - 1];
		setUndoStack(prev => prev.slice(0, -1));
		setRedoStack(prev => [...prev, { nodes, edges }]);

		setNodes(prevState.nodes);
		setEdges(prevState.edges);
	};

	const handleRedo = e => {
		e.preventDefault();
		if (redoStack.length === 0) return;

		const nextState = redoStack[redoStack.length - 1];
		setRedoStack(prev => prev.slice(0, -1));
		setUndoStack(prev => [...prev, { nodes, edges }]);

		setNodes(nextState.nodes);
		setEdges(nextState.edges);
	};

	const handleRemoveBlock = idToRemove => {
		saveStateToUndoStack();

		setSidebarBlocks(prev => prev.filter(block => block.id !== idToRemove));
		setNodes(prev => prev.filter(node => node.id !== idToRemove));
		setEdges(prev =>
			prev.filter(
				edge => edge.source !== idToRemove && edge.target !== idToRemove
			)
		);
	};

	const handleDragStart = (event, block) => {
		event.dataTransfer.setData("application/reactflow", JSON.stringify(block));
		event.dataTransfer.effectAllowed = "move";
	};

	const onDrop = useCallback(
		event => {
			event.preventDefault();
			const data = event.dataTransfer.getData("application/reactflow");
			if (!data) return;

			const block = JSON.parse(data);
			const bounds = event.currentTarget.getBoundingClientRect();
			const position = {
				x: event.clientX - bounds.left,
				y: event.clientY - bounds.top,
			};

			const newNode = {
				id: block.id,
				type: "default",
				position,
				data: { label: block.label },
			};

			saveStateToUndoStack();
			setNodes(nds => [...nds, newNode]);
		},
		[nodes, edges]
	);

	const onDragOver = useCallback(event => {
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	}, []);

	const onConnect = useCallback(
		params => {
			const source = params.source;
			const target = params.target;

			const isForward = parseInt(source, 10) < parseInt(target, 10);

			if (isForward) {
				const newEdge = {
					...params,
					id: `${source}-${target}`,
					markerEnd: {
						type: MarkerType.ArrowClosed,
						color: "black",
					},
				};

				saveStateToUndoStack();
				setEdges(eds => addEdge(newEdge, eds));
			} else {
				const tempId = `invalid-${source}-${target}`;
				const redEdge = {
					...params,
					id: tempId,
					style: { stroke: "red", strokeWidth: 2 },
					markerEnd: {
						type: MarkerType.ArrowClosed,
						color: "red",
					},
				};
				setEdges(eds => [...eds, redEdge]);

				setTimeout(() => {
					setEdges(eds => eds.filter(edge => edge.id !== tempId));
				}, 1000);
			}
		},
		[nodes, edges]
	);

	return (
		<div className="flowEditor">
			<div className="flowEditorUndoRedo">
				<Button
					title="Undo"
					onClick={handleUndo}
					disabled={undoStack.length === 0}
				/>
				<Button
					title="Redo"
					onClick={handleRedo}
					disabled={redoStack.length === 0}
				/>
			</div>

			<NodeSidebar
				sidebarBlocks={sidebarBlocks}
				onDragStart={handleDragStart}
				removeBlock={handleRemoveBlock}
			/>
			<FlowCanvas
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onDrop={onDrop}
				onDragOver={onDragOver}
				onConnect={onConnect}
			/>
		</div>
	);
};

export default FlowEditor;
