import { useState, useCallback, useRef, useEffect } from 'react';
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './App.css';
import initialData from './metadata.json';
import Sidebar from './Sidebar'; // Import the Sidebar

// Unique key for localStorage
const flowKey = 'my-diagram-flow';

// Function to load the saved state from localStorage
const getInitialState = () => {
  const savedState = localStorage.getItem(flowKey);
  if (savedState) {
    const { nodes, edges } = JSON.parse(savedState);
    return { initialNodes: nodes, initialEdges: edges };
  } else {
    // Fallback to the JSON file if nothing is saved
    return { initialNodes: initialData.nodes, initialEdges: initialData.edges };
  }
};

function Flow() {
  // Use our new function to initialize state from localStorage or metadata.json
  const { initialNodes, initialEdges } = getInitialState();
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);

  // This effect saves the state to localStorage whenever nodes/edges change
  useEffect(() => {
    const stateToSave = {
      nodes: nodes,
      edges: edges,
    };
    localStorage.setItem(flowKey, JSON.stringify(stateToSave));
  }, [nodes, edges]); // Dependency array: run this effect if nodes or edges change

  // We need to find the highest ID to prevent clashes
  const maxId = Math.max(...nodes.map((n) => parseInt(n.id, 10)), 0);
  const nodeIdCounter = useRef(maxId + 1);

  // --- Handlers for React Flow ---

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // This handler is called when a node is clicked, or selection is cleared
  const onSelectionChange = useCallback((elements) => {
    const node = elements.nodes[0];
    if (node) {
      setSelectedNode(node);
    } else {
      setSelectedNode(null); // Clear selection
    }
  }, []);

  // --- Functions for Interactivity (Step 6 & 7) ---

  // Function to add a new node
  const addNode = useCallback(() => {
    const newId = `${nodeIdCounter.current++}`;
    const newNode = {
      id: newId,
      position: {
        x: Math.random() * 300,
        y: Math.random() * 300,
      },
      data: { label: `New Node ${newId}` },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  // Function to edit a node's label (passed to Sidebar)
  const onLabelChange = useCallback(
    (id, newLabel) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === id) {
            // It's important to create a new object to trigger a re-render
            return {
              ...node,
              data: {
                ...node.data,
                label: newLabel,
              },
            };
          }
          return node;
        })
      );
    },
    [setNodes]
  );

  // --- NEW DELETE FUNCTION ---
  // This function is passed to the Sidebar
  const onDeleteNode = useCallback(
    (id) => {
      // We filter out the node and any connected edges
      setNodes((nds) => nds.filter((node) => node.id !== id));
      setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
      setSelectedNode(null); // Clear selection after delete
    },
    [setNodes, setEdges]
  );
  // --- END NEW FUNCTION ---

  return (
    <div className="react-flow-wrapper">
      <Sidebar
        selectedNode={selectedNode}
        onLabelChange={onLabelChange}
        onDeleteNode={onDeleteNode} 
      />

      <div className="react-flow-container">
        <button onClick={addNode} className="add-node-button">
          Add Node
        </button>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onSelectionChange={onSelectionChange}
          fitView
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
}

export default Flow;