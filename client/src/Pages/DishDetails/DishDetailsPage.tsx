import { Card, Col, Row, Typography } from "antd";

import { useQueries } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useGetDishDetails } from "../../hooks/useGetDishDetails";

import type { Dish } from "../../models/Dishes";
import "./DishDetailsPage.css";

const { Title, Text } = Typography;

const keyNameAndLabelMapping = {
  name: "Name",
  ingredients: "Ingredients",
  diet: "Diet",
  prep_time: "Preparation Time(Min)",
  cook_time: "Cooking Time(Min)",
  flavor_profile: "Flavor Profile",
  course: "Course",
  state: "State",
  region: "Region",
};

const DishDetailsPage = () => {
  const { name } = useParams();

  const { queryConfig, postProcess } = useGetDishDetails(name || "");
  const results = useQueries({ queries: [queryConfig] });
  const data = postProcess(results[0]?.data);

  return (
    <div id="page-container">
      <Card
        title={<Title level={3}>{name} Details</Title>}
        className="card-container"
      >
        <div
          style={{
            overflowY: "auto",
            paddingRight: 8,
          }}
        >
          <Row gutter={[16, 16]}>
            {Object.entries(data ?? {}).map(([key, value], index) => (
              <Col span={24} key={index}>
                <div
                  style={{
                    backgroundColor: index % 2 === 0 ? "#fafafa" : "#e6fffb",
                    padding: 12,
                    borderRadius: 6,
                  }}
                >
                  <Text strong>
                    {keyNameAndLabelMapping[key as keyof Dish]}:
                  </Text>{" "}
                  <Text>
                    {Array.isArray(value) ? value.join(", ") : String(value)}
                  </Text>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Card>
    </div>
  );
};

export default DishDetailsPage;
