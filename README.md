### Installation Steps

Clone the repository: https://github.com/Rujith951/Aerotrail_test.git

Install dependencies:

npm install of npm i

Start the development server:

npm start

Open in browser:

Navigate to http://localhost:3000

### Summary of your solution

A fixed set of draggable predefined blocks (A–O).

Drag-and-drop canvas interaction.

Custom connect rules (only forward connections are allowed).

Visual feedback for invalid connections (temporary red edge).

Undo/Redo support for:

Adding nodes, Connecting nodes, Removing blocks

### Notes on design decisions

nstead of dynamically adding blocks (A–Z), we use a staticBlocks array of 15 fixed blocks with id, label, and type.

Ensures predictable ordering and prevents duplicates.

2. Undo/Redo History
   Implemented using two stacks: undoStack and redoStack.

We push the current state (nodes, edges) to the undo stack before making changes.

Redo stack is cleared upon new edits (common design pattern).

3. Edge Validation Logic

   Edge connections are only allowed if the source ID is numerically less than the target ID.

   IDs are compared using parseInt() instead of charCodeAt() to support numeric ids ("1", "2", etc).

4. UI Simplicity

   There will be a sidebar for storing blocks, and Undo/Redo buttons will be placed at the bottom of the sidebar on the right side of the UI.
