// =============== Enums ===============

export enum MessageType {
  // Global / presence
  SOCKET_CONNECTED = "socket_connected",

  // Board presence & invites
  BOARD_INGRESS = "board_ingress",
  CONNECTION_INVITE = "connection_invite",
  BOARD_CREATION = "board_creation",

  // Column events
  COLUMN_CREATION = "column_creation",
  COLUMN_REORDER = "column_reorder",
  COLUMN_EDIT = "column_edit",
  COLUMN_DELETE = "column_delete",

  // Card events
  CARD_CREATION = "card_creation",
  CARD_MOVE_ACROSS_COLUMNS = "card_move_across_columns",
  CARD_EDIT = "card_edit",
  CARD_DELETE = "card_delete",

  // Broadcast/ACK
  CARD_MOVE_BROADCAST = "card_move_broadcast",
}

// =============== Base Types ===============

// All messages have these
export interface BaseMessage {
  id: string;       // uuid for the message itself
  type: MessageType;
  userId: string;   // who triggered
  timestamp: number;
}

// For board-scoped events (most of them)
export interface BoardScopedMessage extends BaseMessage {
  boardId: string;  // required, used for routing to room
}

// =============== Board Messages ===============

export interface SocketConnectedMessage extends BaseMessage {
  type: MessageType.SOCKET_CONNECTED;
}

export interface BoardIngressMessage extends BoardScopedMessage {
  type: MessageType.BOARD_INGRESS;
}

export interface ConnectionInviteMessage extends BoardScopedMessage {
  type: MessageType.CONNECTION_INVITE;
  inviterId: string;
  inviteeId: string;
  role?: "viewer" | "editor" | "admin";
}

export interface BoardCreationMessage extends BaseMessage {
  type: MessageType.BOARD_CREATION;
  boardId: string;
  title: string;
  description?: string;
}

// =============== Column Messages ===============

export interface ColumnCreationMessage extends BoardScopedMessage {
  type: MessageType.COLUMN_CREATION;
  columnId: string;
  title: string;
}

export interface ColumnReorderMessage extends BoardScopedMessage {
  type: MessageType.COLUMN_REORDER;
  columnSequence: string[]; // ordered list of column IDs
}

export interface ColumnEditMessage extends BoardScopedMessage {
  type: MessageType.COLUMN_EDIT;
  columnId: string;
  title: string;
}

export interface ColumnDeleteMessage extends BoardScopedMessage {
  type: MessageType.COLUMN_DELETE;
  columnId: string;
}

// =============== Card Messages ===============

export interface CardCreationMessage extends BoardScopedMessage {
  type: MessageType.CARD_CREATION;
  cardId: string;
  parentColumnId: string;
  title: string;
  description?: string;
}

export interface CardMoveMessage extends BoardScopedMessage {
  type: MessageType.CARD_MOVE_ACROSS_COLUMNS;
  cardId: string;
  fromColumnId: string;
  toColumnId: string;
  // no newIndex → server decides final placement
}

// Broadcast / ACK version of card move
export interface CardMoveBroadcastMessage extends BoardScopedMessage {
  type: MessageType.CARD_MOVE_BROADCAST;
  cardId: string;
  fromColumnId: string;
  toColumnId: string;
  sourceColumnCardIds: string[]; // authoritative list after move
  destColumnCardIds: string[];   // authoritative list after move
}

export interface CardEditMessage extends BoardScopedMessage {
  type: MessageType.CARD_EDIT;
  cardId: string;
  title?: string;
  description?: string;
  assigneeId?: string;
  labels?: string[];
  dueDate?: string; // ISO timestamp
}

export interface CardDeleteMessage extends BoardScopedMessage {
  type: MessageType.CARD_DELETE;
  cardId: string;
}

// =============== Union Type ===============

export type WSMessage =
  | SocketConnectedMessage
  | BoardIngressMessage
  | ConnectionInviteMessage
  | BoardCreationMessage
  | ColumnCreationMessage
  | ColumnReorderMessage
  | ColumnEditMessage
  | ColumnDeleteMessage
  | CardCreationMessage
  | CardMoveMessage
  | CardMoveBroadcastMessage
  | CardEditMessage
  | CardDeleteMessage;
