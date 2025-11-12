Dynamic Diagram Flow (React Flow)

This project is a React application that creates an interactive diagram flow using the React Flow library. The diagram is generated dynamically based on input metadata in src/metadata.json, and all changes are saved to localStorage.

Project Objective

The goal is to visualize and edit node-based diagrams, such as process flows or mind maps. Users can add, delete, connect, and edit nodes.

Features

Dynamic Rendering: Diagram loads from JSON metadata.

Interactive UI:

Add Nodes: Click the "Add Node" button.

Connect Nodes: Drag from one node's handle to another.

Delete Nodes/Edges: Select a node or edge and press the Delete or Backspace key. Or, use the "Delete Node" button in the sidebar.

Edit Nodes: Click a node to open the sidebar and edit its label.

State Persistence: All changes are automatically saved to your browser's localStorage and reloaded on refresh.

Responsive Layout: The application is built with a flexible layout that adapts to screen sizes.

Technical Stack

React (v18+)

React Flow

JavaScript (ES6+)

CSS

Setup and Installation

To run this project locally:

Clone the repository:

git clone [https://github.com/YOUR-USERNAME/dynamic-diagram-flow.git](https://github.com/YOUR-USERNAME/dynamic-diagram-flow.git)


Navigate to the project folder:

cd dynamic-diagram-flow


Install dependencies:

npm install


Run the application:

npm start


The app will be available at http://localhost:3000.

How to Deploy

This project is set up for deployment to GitHub Pages.

Update package.json: Change the "homepage" field to match your GitHub Pages URL.

Run the deploy script:

npm run deploy


This will build the app and push it to the gh-pages branch.