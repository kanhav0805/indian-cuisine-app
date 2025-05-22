// VirtualizedList.tsx
import React, { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import "./VirtualizedList.css";

type VirtualizedListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  itemHeight?: number;
  height?: number;
};

export function VirtualizedList<T>({
  items,
  renderItem,
  itemHeight = 100,
  height = 400,
}: VirtualizedListProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
    overscan: 5,
  });

  return (
    <div
      ref={parentRef}
      className="virtual-item-list-container"
      style={{
        height,
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const item = items[virtualRow.index];
          return (
            <div
              key={virtualRow.key}
              ref={rowVirtualizer.measureElement}
              style={{
                transform: `translateY(${virtualRow.start}px)`,
              }}
              className="virtual-item"
            >
              {renderItem(item)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
