import { useCallback, useMemo, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

export const BOARD_COLUMNS = [
  { id: "received", label: "Received" },
  { id: "review", label: "Review" },
  { id: "quoted", label: "Quoted" },
  { id: "won", label: "Won" },
  { id: "lost", label: "Lost" },
];

export const HERO_COLUMNS = BOARD_COLUMNS.slice(0, 3);

export const TUESDAY_RFQ_ID = "rfq-1043";

export const SAMPLE_RFQS = [
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
    id: "rfq-1044",
    buyer: "Valley Hydraulics",
    part: "Manifold block, 4140",
    qty: 8,
    due: "Fri",
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
  columns = BOARD_COLUMNS,
  compact = false,
  showIntro = true,
  idPrefix = "",
  interactive = true,
}) {
  const [announcement, setAnnouncement] = useState(
    "Last Tuesday’s RFQ is sitting. Move it, or tap it and send it to Quoted."
  );
  const skipClickRef = useRef(false);

  const dropId = useCallback((columnId) => `${idPrefix}${columnId}`, [idPrefix]);

  const parseDropId = useCallback(
    (value) => (idPrefix && value.startsWith(idPrefix) ? value.slice(idPrefix.length) : value),
    [idPrefix]
  );

  const moveCard = useCallback(
    (cardId, destColumn, destIndex) => {
      if (!interactive) return;
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
    [interactive, onCardsChange, onQuotedFromSitting]
  );

  const onDragEnd = (result) => {
    if (!interactive) return;
    window.setTimeout(() => {
      skipClickRef.current = false;
    }, 40);

    const { source, destination, draggableId } = result;
    if (!destination) return;

    const sourceColumn = parseDropId(source.droppableId);
    const destColumn = parseDropId(destination.droppableId);
    const cardId = idPrefix && draggableId.startsWith(idPrefix)
      ? draggableId.slice(idPrefix.length)
      : draggableId;

    if (sourceColumn === destColumn && source.index === destination.index) {
      return;
    }

    if (sourceColumn === destColumn) {
      onCardsChange((prev) => {
        const columnCards = cardsByColumn(prev, sourceColumn);
        const reordered = reorder(columnCards, source.index, destination.index);
        const queue = [...reordered];
        return prev.map((c) => {
          if (c.column !== sourceColumn) return c;
          return queue.shift();
        });
      });
      return;
    }

    moveCard(cardId, destColumn, destination.index);
  };

  const selected = useMemo(
    () => (interactive ? cards.find((c) => c.id === selectedId) || null : null),
    [cards, interactive, selectedId]
  );

  const sendToQuoted = () => {
    if (!selected) return;
    moveCard(selected.id, "quoted");
    onSelect(null);
  };

  const destColumns = columns.filter((col) => col.id !== selected?.column);

  return (
    <div id={idPrefix ? `${idPrefix}quote-board` : "quote-board"} className="w-full">
      {showIntro && interactive && (
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
          <p className="text-sm text-foreground/70 leading-relaxed max-w-[54ch]">
            Last Tuesday’s RFQ is still sitting. Move it to Quoted — or tap it.
          </p>
          <button
            type="button"
            onClick={() => {
              const tuesday = cards.find((c) => c.id === TUESDAY_RFQ_ID && isSitting(c.column));
              const target = tuesday || cards.find((c) => isSitting(c.column));
              if (!target) return;
              onTryBoard?.(target.id);
              const el = document.getElementById(`card-${idPrefix}${target.id}`);
              el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
            }}
            className="self-start sm:self-auto text-[0.7rem] uppercase tracking-[0.18em] text-accent font-semibold border-b-2 border-accent pb-0.5 hover:text-foreground hover:border-foreground transition-colors"
          >
            Try the board
          </button>
        </div>
      )}

      {selected && isSitting(selected.column) && (
        <div
          className={`mb-4 border-2 border-accent bg-accent/[0.07] flex flex-col sm:flex-row sm:items-center gap-3 ${
            compact ? "p-2.5 sm:p-3" : "p-3 sm:p-4"
          }`}
        >
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
            {destColumns
              .filter((col) => col.id !== "quoted")
              .map((col) => (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => {
                    moveCard(selected.id, col.id);
                    onSelect(null);
                  }}
                  className="text-[0.7rem] font-semibold uppercase tracking-wide px-2.5 py-2 border-2 border-foreground/20 text-foreground/60 hover:border-accent hover:text-accent"
                >
                  {col.label}
                </button>
              ))}
          </div>
        </div>
      )}

      {selected && !isSitting(selected.column) && (
        <div className="mb-4 border-2 border-foreground/15 bg-background p-3 flex flex-col sm:flex-row sm:items-center gap-3">
          <p className="text-sm text-foreground/70 flex-1">
            Move <span className="font-semibold text-foreground">{selected.buyer}</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {destColumns.map((col) => (
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
          if (!interactive) return;
          skipClickRef.current = true;
        }}
        onDragEnd={onDragEnd}
      >
        <div
          className={
            compact
              ? "overflow-x-auto pb-2 -mx-1 px-1"
              : "overflow-x-auto -mx-[8vw] px-[8vw] md:mx-0 md:px-0 pb-3"
          }
        >
          <div
            className={`grid border-2 border-foreground/15 bg-background shadow-[0_18px_50px_-28px_rgba(0,0,0,0.35)] ${
              compact
                ? "min-w-[28rem] sm:min-w-[32rem] xl:min-w-0 grid-cols-3"
                : "min-w-[720px] md:min-w-0 grid-cols-5"
            }`}
          >
            {columns.map((col, i) => {
              const columnCards = cardsByColumn(cards, col.id);
              return (
                <Droppable droppableId={dropId(col.id)} key={col.id} isDropDisabled={!interactive}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`flex flex-col ${
                        compact
                          ? "min-h-[10.25rem] max-h-[12.25rem] overflow-y-auto sm:max-h-none sm:min-h-[12.5rem] xl:min-h-[14.5rem] p-2 sm:p-2.5"
                          : "min-h-[220px] md:min-h-[260px] p-2.5 sm:p-3"
                      } ${i < columns.length - 1 ? "border-r border-foreground/12" : ""} ${
                        interactive && snapshot.isDraggingOver ? "bg-accent/[0.07]" : ""
                      } ${highlightSitting && isSitting(col.id) ? "bg-accent/[0.05]" : ""}`}
                    >
                      <p className="text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground font-semibold mb-3 flex items-baseline justify-between gap-2">
                        <span>{col.label}</span>
                        <span className="text-[0.65rem] tabular-nums text-foreground/40 font-medium tracking-normal normal-case">
                          {columnCards.length}
                        </span>
                      </p>

                      <div className={`flex flex-col flex-1 ${compact ? "gap-3" : "gap-2"}`}>
                        {columnCards.map((card, index) => {
                          const sitting = isSitting(card.column);
                          const highlighted = highlightSitting && sitting;
                          const lifted = Boolean(card.lifted) || nudgeId === card.id;
                          const dragId = `${idPrefix}${card.id}`;
                          return (
                            <Draggable
                              draggableId={dragId}
                              index={index}
                              key={dragId}
                              isDragDisabled={!interactive}
                            >
                              {(dragProvided, dragSnapshot) => (
                                <div
                                  id={`card-${idPrefix}${card.id}`}
                                  ref={dragProvided.innerRef}
                                  {...dragProvided.draggableProps}
                                  {...(interactive ? dragProvided.dragHandleProps : {})}
                                  role={interactive ? "button" : undefined}
                                  tabIndex={interactive ? 0 : undefined}
                                  onClick={
                                    interactive
                                      ? () => {
                                          if (skipClickRef.current) {
                                            skipClickRef.current = false;
                                            return;
                                          }
                                          onSelect(selectedId === card.id ? null : card.id);
                                        }
                                      : undefined
                                  }
                                  onKeyDown={
                                    interactive
                                      ? (e) => {
                                          if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            onSelect(selectedId === card.id ? null : card.id);
                                          }
                                        }
                                      : undefined
                                  }
                                  className={`text-left border-2 bg-card transition-shadow ${
                                    compact ? "px-2.5 py-2.5 sm:px-3 sm:py-3" : "px-2.5 py-2.5"
                                  } ${
                                    interactive && selectedId === card.id
                                      ? "border-accent ring-2 ring-accent/25"
                                      : highlighted
                                      ? "border-accent sitting-highlight"
                                      : sitting
                                      ? "border-foreground/25"
                                      : "border-foreground/15"
                                  } ${
                                    interactive && dragSnapshot.isDragging
                                      ? "shadow-lg rotate-[1deg]"
                                      : ""
                                  } ${
                                    lifted && !(interactive && dragSnapshot.isDragging)
                                      ? "card-lifted"
                                      : ""
                                  } ${interactive ? "cursor-pointer" : "cursor-default"}`}
                                >
                                  <p
                                    className={`font-display font-semibold text-foreground leading-snug ${
                                      compact ? "text-[0.78rem] sm:text-[0.82rem]" : "text-[0.8rem]"
                                    }`}
                                  >
                                    {card.buyer}
                                  </p>
                                  <p className="text-[0.7rem] text-foreground/70 mt-1 leading-snug">
                                    {card.part}
                                  </p>
                                  <p className="text-[0.65rem] text-muted-foreground mt-1.5 tabular-nums">
                                    Qty {card.qty} · Due {card.due}
                                  </p>
                                  {compact &&
                                    card.id === TUESDAY_RFQ_ID &&
                                    sitting && (
                                      <p className="xl:hidden mt-2 text-[0.68rem] font-semibold text-accent leading-snug">
                                        48 hrs. Untouched.
                                      </p>
                                    )}
                                </div>
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
