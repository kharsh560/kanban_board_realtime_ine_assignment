import React, { useState, useEffect } from "react";
import BoardPage from "./boardPage";

export interface Card {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
}

export interface Column {
  id: string;
  title: string;
  color: string;
  cards: Card[];
}

export interface Board {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
  columns: Column[];
}

const Home: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  const [newTitle, setNewTitle] = useState("");

  // Load boards
  useEffect(() => {
    const saved = localStorage.getItem("kanban-boards");
    if (saved) {
      const parsed: Board[] = JSON.parse(saved).map((b: any) => ({
        ...b,
        createdAt: new Date(b.createdAt),
        columns: b.columns.map((c: any) => ({
          ...c,
          cards: c.cards.map((card: any) => ({
            ...card,
            createdAt: new Date(card.createdAt),
          })),
        })),
      }));
      setBoards(parsed);
    }
  }, []);

  // Save boards
  useEffect(() => {
    localStorage.setItem("kanban-boards", JSON.stringify(boards));
  }, [boards]);

  const handleCreateBoard = () => {
    if (!newTitle.trim()) return;
    const newBoard: Board = {
      id: `board-${Date.now()}`,
      title: newTitle,
      createdAt: new Date(),
      columns: [],
    };
    setBoards([...boards, newBoard]);
    setNewTitle("");
  };

  const handleUpdateBoard = (updated: Board) => {
    setBoards(boards.map(b => (b.id === updated.id ? updated : b)));
    setSelectedBoard(updated);
  };

  if (selectedBoard) {
    return (
      <BoardPage
        board={selectedBoard}
        onUpdateBoard={handleUpdateBoard}
        onBack={() => setSelectedBoard(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Your Boards</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="px-2 py-1 rounded bg-gray-800 border border-gray-700"
          placeholder="New board title"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
        />
        <button
          onClick={handleCreateBoard}
          className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-500"
        >
          Add
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {boards.map(board => (
          <div
            key={board.id}
            onClick={() => setSelectedBoard(board)}
            className="bg-gray-800 p-4 rounded shadow cursor-pointer hover:bg-gray-700"
          >
            <h2 className="text-lg font-semibold">{board.title}</h2>
            <p className="text-sm text-gray-400">
              {board.columns.length} columns
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
