import React, { useEffect, useState } from 'react';

// This is our Sidebar. It receives props (data and functions) from App.js.
// It doesn't manage any *app* state, just its own *form* state.
function Sidebar({ selectedNode, onLabelChange, onDeleteNode }) {
  
  // We use a *local* state to keep track of what's in the input box.
  // This way, we only update the *real* node label when the user clicks "Save".
  const [nodeLabel, setNodeLabel] = useState('');

  // This 'useEffect' hook watches the 'selectedNode' prop.
  // When the user clicks a new node, this code runs.
  useEffect(() => {
    if (selectedNode) {
      // A new node is selected. Update the input box with its label.
      setNodeLabel(selectedNode.data.label);
    }
  }, [selectedNode]); // Dependency: run this *only* when 'selectedNode' changes.

  // This handler updates our local 'nodeLabel' state on every keystroke.
  const handleLabelChange = (evt) => {
    setNodeLabel(evt.target.value);
  };

  // When the user clicks "Save Changes"...
  const onSaveChanges = () => {
    // ...call the 'onLabelChange' function from App.js
    // to update the *real* node.
    if (selectedNode) {
      onLabelChange(selectedNode.id, nodeLabel);
    }
  };

  // When the user clicks "Delete Node"...
  const onDelete = () => {
    // ...call the 'onDeleteNode' function from App.js.
    if (selectedNode) {
      onDeleteNode(selectedNode.id);
    }
  };


  // --- RENDER ---

  // If no node is selected, just show a helpful message.
  if (!selectedNode) {
    return (
      <aside className="sidebar">
        <h3>Node Editor</h3>
        <div className="sidebar-description">Select a node to edit its label.</div>
      </aside>
    );
  }

  // If a node *is* selected, show the full form.
  return (
    <aside className="sidebar">
      <h3>Edit Node</h3>
      
      <label>Label:</label>
      {/* The input's value is tied to our local 'nodeLabel' state */}
      <input type="text" value={nodeLabel} onChange={handleLabelChange} />
      
      {/* Our buttons call our local handlers */}
      <button onClick={onSaveChanges}>Save Changes</button>
      <button onClick={onDelete} className="delete-button">
        Delete Node
      </button>
    </aside>
  );
}

export default Sidebar;
