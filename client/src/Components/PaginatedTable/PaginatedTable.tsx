import { Table } from "antd";
import type { Dish, DishList } from "../../models/Dishes";
import type { ColumnsType } from "antd/es/table";
import { useCallback, useEffect, useState } from "react";
import { elementScroll } from "@tanstack/react-virtual";
import { useQueryParams } from "../../hooks/useQueryParams";
import { useSearchParams } from "react-router-dom";

interface PaginatedTableProps {
  data: DishList;
  columns: ColumnsType<Dish>;
  defaultPageSize?: number;
}

const PaginatedTable = ({
  data,
  columns,
  defaultPageSize = 10,
}: PaginatedTableProps) => {
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const { page, pageSize: pageSizeParam } = useQueryParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleInfininiteScroll = useCallback(
    (element) => {
      const elementHeight = element.target.clientHeight;
      const elementScrollHeight = element.target.scrollHeight;
      const elementScrollOffset = element.target.scrollTop;
      console.log(elementHeight, elementScrollOffset, elementScrollHeight);
      if (elementHeight + elementScrollOffset >= elementScrollHeight - 10) {
        console.log("123");
        const newSearchParams = new URLSearchParams();
        newSearchParams.set("page", (Number(page) + 1).toString());
        newSearchParams.set("page-size", pageSizeParam.toString());
        setSearchParams(newSearchParams);
      }
    },
    [page, pageSizeParam]
  );

  useEffect(() => {
    const scrollableElement = document.getElementById("scrollable-container");

    //adding event listener to the elemnt
    scrollableElement?.addEventListener("scroll", handleInfininiteScroll);

    return () =>
      scrollableElement?.removeEventListener("scroll", handleInfininiteScroll);
  }, [handleInfininiteScroll]);

  return (
    <div
      style={{ overflow: "auto", height: "300px" }}
      id="scrollable-container"
    >
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        size="small"
        rowKey={(record: Dish) => JSON.stringify(record)}
      />
    </div>
  );
};

export default PaginatedTable;
