import { useCallback, useMemo, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

export const BOARD_COLUMNS = [
  { id: "received", label: "Received", short: "Received" },
  { id: "review", label: "Engineering Review", short: "Review" },
  { id: "quoted", label: "Quoted", short: "Quoted" },
  { id: "won", label: "Won", short: "Won" },
  { id: "lost", label: "Lost", short: "Lost" },
];

export const SAMPLE_RFQS = [
  {
    id: "rfq-1044",
    buyer: "Valley Hydraulics",
    part: "Manifold block, 4140",
    qty: 8,
    due: "Fri",
    column: "received",
  },
  {
    id: "rfq-1043",
    buyer: "Easton Tooling",
    part: "Fixture plate, 6061",
    qty: 2,
    due: "Tue",
    column: "received",
  },
  {
    id: "rfq-1041",
    buyer: "Keystone Motion",
    part: "Shaft, 17-4 PH",
    qty: 24,
    due: "Sep 18",
    column: "review",
  },
  {
    id: "rfq-1039",
    buyer: "Miller Gear",
    part: "Housing, CI",
    qty: 4,
    due: "Sep 22",
    column: "quoted",
  },
  {
    id: "rfq-1036",
    buyer: "Berks Precision",
    part: "Adapter, 316SS",
    qty: 12,
    due: "Thu",
    column: "received",
  },
];

export const SITTING_COLUMNS = new Set(["received", "review"]);

export function isSitting(columnId) {
  return SITTING_COLUMNS.has(columnId);
}

function reorder(list, startIndex, endIndex) {
  const next = Array.from(list);
  const [removed] = next.splice(startIndex, 1);
  next.splice(endIndex, 0, removed);
  return next;
}

function cardsByColumn(cards, columnId) {
  return cards.filter((card) => card.column === columnId);
}

export default function QuoteBoard({
  cards,
  onCardsChange,
  highlightSitting = false,
  selectedId,
  onSelect,
}) {
  const [announcement, setAnnouncement] = useState(
    "Sample board. Drag a card, or tap one and pick a column."
  );
  const skipClickRef = useRef(false);

  const moveCard = useCallback(
    (cardId, destColumn, destIndex) => {
      onCardsChange((prev) => {
        const card = prev.find((c) => c.id === cardId);
        if (!card || !destColumn) return prev;

        const without = prev.filter((c) => c.id !== cardId);
        const destCards = cardsByColumn(without, destColumn);
        const insertAt =
          destIndex == null ? destCards.length : Math.min(destIndex, destCards.length);
        const moved = { ...card, column: destColumn };
        const destWithCard = [
          ...destCards.slice(0, insertAt),
          moved,
          ...destCards.slice(insertAt),
        ];

        const destLabel =
          BOARD_COLUMNS.find((col) => col.id === destColumn)?.label || destColumn;
        window.setTimeout(() => {
          setAnnouncement(`${card.buyer} moved to ${destLabel}.`);
        }, 0);

        return BOARD_COLUMNS.flatMap((col) =>
          col.id === destColumn ? destWithCard : cardsByColumn(without, col.id)
        );
      });
    },
    [onCardsChange]
  );

  const onDragEnd = (result) => {
    window.setTimeout(() => {
      skipClickRef.current = false;
    }, 40);

    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      onCardsChange((prev) => {
        const columnCards = cardsByColumn(prev, source.droppableId);
        const reordered = reorder(columnCards, source.index, destination.index);
        const queue = [...reordered];
        return prev.map((c) => {
          if (c.column !== source.droppableId) return c;
          return queue.shift();
        });
      });
      return;
    }

    moveCard(draggableId, destination.droppableId, destination.index);
  };

  const selected = useMemo(
    () => cards.find((c) => c.id === selectedId) || null,
    [cards, selectedId]
  );

  return (
    <div id="quote-board" className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
        <p className="text-sm text-foreground/70 leading-relaxed max-w-[54ch]">
          Sample quotes — not a live shop. Drag a card, or tap one and send it toward Quoted or Won.
        </p>
        <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground font-semibold">
          Try the board
        </p>
      </div>

      {selected && (
        <div className="mb-4 border-2 border-accent/40 bg-accent/[0.06] p-3 flex flex-col sm:flex-row sm:items-center gap-3">
          <p className="text-sm text-foreground font-medium flex-1">
            Move <span className="font-semibold">{selected.buyer}</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {BOARD_COLUMNS.map((col) => (
              <button
                key={col.id}
                type="button"
                disabled={selected.column === col.id}
                onClick={() => {
                  moveCard(selected.id, col.id);
                  onSelect(null);
                }}
                className={`text-[0.7rem] font-semibold uppercase tracking-wide px-2.5 py-1.5 border-2 transition-colors ${
                  selected.column === col.id
                    ? "border-foreground/20 text-foreground/40 cursor-default"
                    : "border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {col.short}
              </button>
            ))}
          </div>
        </div>
      )}

      <DragDropContext
        onDragStart={() => {
          skipClickRef.current = true;
        }}
        onDragEnd={onDragEnd}
      >
        <div className="overflow-x-auto -mx-[8vw] px-[8vw] md:mx-0 md:px-0 pb-2">
          <div className="min-w-[720px] md:min-w-0 grid grid-cols-5 border-2 border-foreground/15 bg-background shadow-[0_18px_50px_-28px_rgba(0,0,0,0.35)]">
            {BOARD_COLUMNS.map((col, i) => {
              const columnCards = cardsByColumn(cards, col.id);
              return (
                <Droppable droppableId={col.id} key={col.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`min-h-[280px] p-2.5 sm:p-3 flex flex-col ${
                        i < BOARD_COLUMNS.length - 1 ? "border-r border-foreground/12" : ""
                      } ${snapshot.isDraggingOver ? "bg-accent/[0.07]" : ""} ${
                        highlightSitting && isSitting(col.id) ? "bg-accent/[0.05]" : ""
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          if (selected && selected.column !== col.id) {
                            moveCard(selected.id, col.id);
                            onSelect(null);
                          }
                        }}
                        className="text-left mb-3"
                      >
                        <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground font-semibold leading-tight">
                          {col.short}
                        </p>
                        <p className="hidden lg:block text-[0.7rem] text-foreground/45 mt-0.5">
                          {col.label}
                        </p>
                        <span className="text-[0.65rem] tabular-nums text-foreground/40">
                          {columnCards.length}
                        </span>
                      </button>

                      <div className="flex flex-col gap-2 flex-1">
                        {columnCards.map((card, index) => {
                          const sitting = isSitting(card.column);
                          const highlighted = highlightSitting && sitting;
                          return (
                            <Draggable draggableId={card.id} index={index} key={card.id}>
                              {(dragProvided, dragSnapshot) => (
                                <button
                                  type="button"
                                  ref={dragProvided.innerRef}
                                  {...dragProvided.draggableProps}
                                  {...dragProvided.dragHandleProps}
                                  onClick={() => {
                                    if (skipClickRef.current) {
                                      skipClickRef.current = false;
                                      return;
                                    }
                                    onSelect(selectedId === card.id ? null : card.id);
                                  }}
                                  className={`text-left border-2 bg-card px-2.5 py-2.5 transition-shadow ${
                                    selectedId === card.id
                                      ? "border-accent ring-2 ring-accent/25"
                                      : highlighted
                                      ? "border-accent sitting-highlight"
                                      : sitting
                                      ? "border-foreground/25"
                                      : "border-foreground/15"
                                  } ${dragSnapshot.isDragging ? "shadow-lg rotate-[1deg]" : ""}`}
                                >
                                  <p className="font-display font-semibold text-[0.8rem] text-foreground leading-snug">
                                    {card.buyer}
                                  </p>
                                  <p className="text-[0.7rem] text-foreground/70 mt-1 leading-snug">
                                    {card.part}
                                  </p>
                                  <p className="text-[0.65rem] text-muted-foreground mt-1.5 tabular-nums">
                                    Qty {card.qty} · Due {card.due}
                                  </p>
                                </button>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              );
            })}
          </div>
        </div>
      </DragDropContext>

      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </div>
  );
}
