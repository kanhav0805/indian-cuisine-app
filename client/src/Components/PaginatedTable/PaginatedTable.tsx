import { Table } from "antd";
import type { Dish, DishList } from "../../models/Dishes";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";

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

  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{
          showSizeChanger: true,
          pageSize,
          pageSizeOptions: ["10", "20", "50", "100"],
          onShowSizeChange: (_current, size) => setPageSize(size),
        }}
        size="small"
        rowKey={(record: Dish) => JSON.stringify(record)}
      />
    </div>
  );
};

export default PaginatedTable;
