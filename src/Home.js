import React, { useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
} from 'react-flow-renderer';
import { useDispatch, useSelector } from 'react-redux';
import { addNode, removeNode, updateNode } from './nodesSlice';
import { addEdge as addEdgeAction, removeEdge } from './edgesSlice';

function Home() {
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.nodes);
  const edges = useSelector((state) => state.edges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodeTitle, setNodeTitle] = useState('');

  const onElementClick = (event, element) => {
    if (element.id) {
      setSelectedNode(element);
      setNodeTitle(element.data?.label || '');
    }
  };

  const onConnect = (params) => dispatch(addEdgeAction(params));

  const handleNodeTitleChange = () => {
    if (selectedNode) {
      dispatch(updateNode({ id: selectedNode.id, data: { label: nodeTitle } }));
      setSelectedNode(null);
      setNodeTitle('');
    }
  };

  const handleCreateNode = () => {
    const newNode = {
      id: `node_${nodes.length + 1}`,
      data: { label: `Node ${nodes.length + 1}` },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      type: 'default',
    };
    console.log('Creating new node:', newNode);
    dispatch(addNode(newNode));
  };
  

  const handleDeleteElement = (element) => {
    if (element.source || element.target) {
      dispatch(removeEdge(element.id));
    } else {
      dispatch(removeNode(element.id));
    }
  };
  

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <button onClick={handleCreateNode}>Create Node</button>
      </div>
      <div style={{ height: '100vh', width: '100%' }}>
        <ReactFlow
          elements={[...nodes, ...edges]}
          onConnect={onConnect}
          onElementsRemove={(elementsToRemove) => elementsToRemove.forEach(handleDeleteElement)}
          onElementClick={onElementClick}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      {selectedNode && (
        <div style={{ position: 'absolute', right: 0, width: 200 }}>
          <h3>Edit Node</h3>
          <input
            type="text"
            value={nodeTitle}
            onChange={(e) => setNodeTitle(e.target.value)}
          />
          <button onClick={handleNodeTitleChange}>Save</button>
        </div>
      )}
    </div>
  );
}

export default Home;
