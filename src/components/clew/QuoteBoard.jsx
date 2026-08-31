import { useCallback, useMemo, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

export const BOARD_COLUMNS = [
  { id: "received", label: "Received" },
  { id: "review", label: "Review" },
  { id: "quoted", label: "Quoted" },
  { id: "won", label: "Won" },
  { id: "lost", label: "Lost" },
];

export const TUESDAY_RFQ_ID = "rfq-1043";

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
    id: TUESDAY_RFQ_ID,
    buyer: "Easton Tooling",
    part: "Fixture plate, 6061",
    qty: 2,
    due: "Last Tue",
    column: "received",
    lifted: true,
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
  nudgeId,
  onQuotedFromSitting,
  onTryBoard,
}) {
  const [announcement, setAnnouncement] = useState(
    "Last Tuesday’s RFQ is sitting. Drag it, or tap it and send it to Quoted."
  );
  const skipClickRef = useRef(false);

  const moveCard = useCallback(
    (cardId, destColumn, destIndex) => {
      onCardsChange((prev) => {
        const card = prev.find((c) => c.id === cardId);
        if (!card || !destColumn) return prev;
        if (card.column === destColumn && destIndex == null) return prev;

        const wasSitting = isSitting(card.column);
        const without = prev.filter((c) => c.id !== cardId);
        const destCards = cardsByColumn(without, destColumn);
        const insertAt =
          destIndex == null ? destCards.length : Math.min(destIndex, destCards.length);
        const moved = { ...card, column: destColumn, lifted: false };
        const destWithCard = [
          ...destCards.slice(0, insertAt),
          moved,
          ...destCards.slice(insertAt),
        ];

        const destLabel =
          BOARD_COLUMNS.find((col) => col.id === destColumn)?.label || destColumn;
        window.setTimeout(() => {
          setAnnouncement(`${card.buyer} moved to ${destLabel}.`);
          if (wasSitting && destColumn === "quoted") {
            onQuotedFromSitting?.();
          }
        }, 0);

        return BOARD_COLUMNS.flatMap((col) =>
          col.id === destColumn ? destWithCard : cardsByColumn(without, col.id)
        );
      });
    },
    [onCardsChange, onQuotedFromSitting]
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

  const sendToQuoted = () => {
    if (!selected) return;
    moveCard(selected.id, "quoted");
    onSelect(null);
  };

  return (
    <div id="quote-board" className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
        <p className="text-sm text-foreground/70 leading-relaxed max-w-[54ch]">
          Last Tuesday’s RFQ is still sitting. Drag it to Quoted — or tap it.
        </p>
        <button
          type="button"
          onClick={() => {
            const tuesday = cards.find((c) => c.id === TUESDAY_RFQ_ID && isSitting(c.column));
            const target = tuesday || cards.find((c) => isSitting(c.column));
            if (!target) return;
            onTryBoard?.(target.id);
            const el = document.getElementById(`card-${target.id}`);
            el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
          }}
          className="self-start sm:self-auto text-[0.7rem] uppercase tracking-[0.18em] text-accent font-semibold border-b-2 border-accent pb-0.5 hover:text-foreground hover:border-foreground transition-colors"
        >
          Try the board
        </button>
      </div>

      {selected && isSitting(selected.column) && (
        <div className="mb-4 border-2 border-accent bg-accent/[0.07] p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-3">
          <p className="text-sm text-foreground font-medium flex-1">
            {selected.buyer} is sitting. Send it to Quoted.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={sendToQuoted}
              className="inline-flex items-center justify-center bg-accent text-accent-foreground px-5 py-2.5 text-sm font-semibold tracking-wide hover:bg-foreground transition-colors"
            >
              Send to Quoted
            </button>
            <button
              type="button"
              onClick={() => {
                moveCard(selected.id, "review");
                onSelect(null);
              }}
              className="text-[0.7rem] font-semibold uppercase tracking-wide px-2.5 py-2 border-2 border-foreground/20 text-foreground/60 hover:border-accent hover:text-accent"
            >
              Review
            </button>
            <button
              type="button"
              onClick={() => {
                moveCard(selected.id, "lost");
                onSelect(null);
              }}
              className="text-[0.7rem] font-semibold uppercase tracking-wide px-2.5 py-2 border-2 border-foreground/20 text-foreground/60 hover:border-accent hover:text-accent"
            >
              Lost
            </button>
          </div>
        </div>
      )}

      {selected && !isSitting(selected.column) && (
        <div className="mb-4 border-2 border-foreground/15 bg-background p-3 flex flex-col sm:flex-row sm:items-center gap-3">
          <p className="text-sm text-foreground/70 flex-1">
            Move <span className="font-semibold text-foreground">{selected.buyer}</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {BOARD_COLUMNS.filter((col) => col.id !== selected.column).map((col) => (
              <button
                key={col.id}
                type="button"
                onClick={() => {
                  moveCard(selected.id, col.id);
                  onSelect(null);
                }}
                className="text-[0.7rem] font-semibold uppercase tracking-wide px-2.5 py-1.5 border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {col.label}
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
        <div className="overflow-x-auto -mx-[8vw] px-[8vw] md:mx-0 md:px-0 pb-3">
          <div className="min-w-[720px] md:min-w-0 grid grid-cols-5 border-2 border-foreground/15 bg-background shadow-[0_18px_50px_-28px_rgba(0,0,0,0.35)]">
            {BOARD_COLUMNS.map((col, i) => {
              const columnCards = cardsByColumn(cards, col.id);
              return (
                <Droppable droppableId={col.id} key={col.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`min-h-[220px] md:min-h-[260px] p-2.5 sm:p-3 flex flex-col ${
                        i < BOARD_COLUMNS.length - 1 ? "border-r border-foreground/12" : ""
                      } ${snapshot.isDraggingOver ? "bg-accent/[0.07]" : ""} ${
                        highlightSitting && isSitting(col.id) ? "bg-accent/[0.05]" : ""
                      }`}
                    >
                      <p className="text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground font-semibold mb-3 flex items-baseline justify-between gap-2">
                        <span>{col.label}</span>
                        <span className="text-[0.65rem] tabular-nums text-foreground/40 font-medium tracking-normal normal-case">
                          {columnCards.length}
                        </span>
                      </p>

                      <div className="flex flex-col gap-2 flex-1">
                        {columnCards.map((card, index) => {
                          const sitting = isSitting(card.column);
                          const highlighted = highlightSitting && sitting;
                          const lifted = Boolean(card.lifted) || nudgeId === card.id;
                          return (
                            <Draggable draggableId={card.id} index={index} key={card.id}>
                              {(dragProvided, dragSnapshot) => (
                                <button
                                  type="button"
                                  id={`card-${card.id}`}
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
                                  } ${dragSnapshot.isDragging ? "shadow-lg rotate-[1deg]" : ""} ${
                                    lifted && !dragSnapshot.isDragging ? "card-lifted" : ""
                                  }`}
                                >
                                  {card.lifted && sitting && (
                                    <p className="text-[0.6rem] uppercase tracking-[0.14em] text-accent font-semibold mb-1.5">
                                      Drag me
                                    </p>
                                  )}
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
