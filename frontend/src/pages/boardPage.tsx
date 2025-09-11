import React, { useState } from "react";
import type { Board, Column, Card } from "./homePage";

interface Props {
  board: Board;
  onUpdateBoard: (board: Board) => void;
  onBack: () => void;
}

const BoardPage: React.FC<Props> = ({ board, onUpdateBoard, onBack }) => {
  const [localBoard, setLocalBoard] = useState<Board>(board);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  const handleAddColumn = () => {
    if (!newColumnTitle.trim()) return;
    const newCol: Column = {
      id: `col-${Date.now()}`,
      title: newColumnTitle,
      color: "blue",
      cards: [],
    };
    const updated = { ...localBoard, columns: [...localBoard.columns, newCol] };
    setLocalBoard(updated);
    onUpdateBoard(updated);
    setNewColumnTitle("");
  };

  const handleAddCard = (colId: string) => {
    const title = prompt("Card title?");
    if (!title) return;
    const updatedCols = localBoard.columns.map(col =>
      col.id === colId
        ? {
            ...col,
            cards: [
              ...col.cards,
              { id: `card-${Date.now()}`, title, createdAt: new Date() },
            ],
          }
        : col
    );
    const updated = { ...localBoard, columns: updatedCols };
    setLocalBoard(updated);
    onUpdateBoard(updated);
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    card: Card,
    colId: string
  ) => {
    e.dataTransfer.setData("cardId", card.id);
    e.dataTransfer.setData("sourceCol", colId);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetColId: string) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("cardId");
    const sourceColId = e.dataTransfer.getData("sourceCol");
    if (!cardId || !sourceColId) return;

    let movedCard: Card | null = null;
    const updatedCols = localBoard.columns.map(col => {
      if (col.id === sourceColId) {
        const filtered = col.cards.filter(c => {
          if (c.id === cardId) {
            movedCard = c;
            return false;
          }
          return true;
        });
        return { ...col, cards: filtered };
      }
      return col;
    });

    if (movedCard) {
      const finalCols = updatedCols.map(col =>
        col.id === targetColId
          ? { ...col, cards: [...col.cards, movedCard!] }
          : col
      );
      const updated = { ...localBoard, columns: finalCols };
      setLocalBoard(updated);
      onUpdateBoard(updated);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="flex items-center gap-4 p-4 border-b border-gray-800">
        <button
          onClick={onBack}
          className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
        >
          ← Back
        </button>
        <h1 className="text-xl font-bold">{localBoard.title}</h1>
      </div>

      <div className="flex gap-4 overflow-x-auto p-4">
        {localBoard.columns.map(col => (
          <div
            key={col.id}
            className="bg-gray-800 rounded p-3 w-64 flex-shrink-0"
            onDragOver={e => e.preventDefault()}
            onDrop={e => handleDrop(e, col.id)}
          >
            <h2 className="font-semibold mb-2">{col.title}</h2>
            <div className="space-y-2">
              {col.cards.map(card => (
                <div
                  key={card.id}
                  draggable
                  onDragStart={e => handleDragStart(e, card, col.id)}
                  className="bg-gray-700 p-2 rounded cursor-grab"
                >
                  <p>{card.title}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleAddCard(col.id)}
              className="mt-2 text-sm text-blue-400 hover:underline"
            >
              + Add card
            </button>
          </div>
        ))}
        <div className="w-64 flex-shrink-0">
          <input
            className="w-full px-2 py-1 mb-2 rounded bg-gray-700 border border-gray-600"
            placeholder="New column"
            value={newColumnTitle}
            onChange={e => setNewColumnTitle(e.target.value)}
          />
          <button
            onClick={handleAddColumn}
            className="w-full bg-blue-600 py-1 rounded hover:bg-blue-500"
          >
            Add Column
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
