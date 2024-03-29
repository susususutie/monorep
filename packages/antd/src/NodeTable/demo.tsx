import { Card, Form, Radio, Segmented, Space, Switch } from "antd";
import NodeTable from "./index";
import { css } from "@emotion/css";
import { useCallback, useRef, useState } from "react";
import { NodeData, NodeItem } from "./NodeItem";

const MOCK = {
  classifies: [
    {
      id: 196,
      name: "应用111111",
      assets: [
        {
          id: 32,
          name: "242.200",
          type: "app",
          status: 0,
          unique_key: "32_app",
          asset_id: 32,
          asset_type: "app",
          data_center_id: 13,
        },
        {
          id: 359,
          name: "1032",
          type: "app",
          status: 2,
          unique_key: "359_app",
          asset_id: 359,
          asset_type: "app",
          data_center_id: 13,
        },
        {
          id: 522,
          name: "242.200_copy",
          type: "app",
          status: 0,
          unique_key: "522_app",
          asset_id: 522,
          asset_type: "app",
          data_center_id: 13,
        },
        {
          id: 362,
          name: "200免密登录应用",
          type: "app",
          status: 2,
          unique_key: "362_app",
          asset_id: 362,
          asset_type: "app",
          data_center_id: 13,
        },
        {
          id: 212,
          name: "test1应用启停4",
          type: "app",
          status: 0,
          unique_key: "212_app",
          asset_id: 212,
          asset_type: "app",
          data_center_id: 13,
        },
        {
          id: 202,
          name: "fapp104",
          type: "app",
          status: 3,
          unique_key: "202_app",
          asset_id: 202,
          asset_type: "app",
          data_center_id: 13,
        },
        {
          id: 37,
          name: "fapp200",
          type: "app",
          status: 0,
          unique_key: "37_app",
          asset_id: 37,
          asset_type: "app",
          data_center_id: 13,
        },
        {
          id: 38,
          name: "fapp201",
          type: "app",
          status: 3,
          unique_key: "38_app",
          asset_id: 38,
          asset_type: "app",
          data_center_id: 13,
        },
        {
          id: 201,
          name: "fapp103",
          type: "app",
          status: 2,
          unique_key: "201_app",
          asset_id: 201,
          asset_type: "app",
          data_center_id: 13,
        },
      ],
    },
    {
      id: 200,
      name: "其他111",

      assets: [
        {
          id: 2276,
          name: "236_111_dbra2_drcc_rac",
          type: "dbra_db",
          status: 0,
          unique_key: "2276_dbra_db",
          asset_id: 2276,
          asset_type: "asset_third_party",
          data_center_id: 13,
        },
        {
          id: 3149,
          name: "64_TiDB1",
          type: "vcenter",
          status: 2,
          unique_key: "3149_vcenter",
          asset_id: 3149,
          asset_type: "asset_third_party",
          data_center_id: 10,
        },
        {
          id: 15,
          name: "测试",
          type: "general",
          status: 0,
          unique_key: "15_general",
          asset_id: 15,
          asset_type: "general",
          data_center_id: 1,
        },
        {
          id: 16,
          name: "测试1",
          type: "general",
          status: 2,
          unique_key: "16_general",
          asset_id: 16,
          asset_type: "general",
          data_center_id: 1,
        },
      ],
    },
    {
      id: 197,
      name: "数据库111",
      assets: [
        {
          id: 7,
          name: "sqlserver-162",
          type: "sqlserver",
          status: 0,
          unique_key: "7_sqlserver",
          asset_id: 7,
          asset_type: "db",
          data_center_id: 13,
        },
        {
          id: 8,
          name: "192.168.236.163",
          type: "sqlserver",
          status: 0,
          unique_key: "8_sqlserver",
          asset_id: 8,
          asset_type: "db",
          data_center_id: 13,
        },
        {
          id: 53,
          name: "Postgres 236.154",
          type: "postgresql",
          status: 2,
          unique_key: "53_postgresql",
          asset_id: 53,
          asset_type: "db",
          data_center_id: 13,
        },
        {
          id: 54,
          name: "mysql115",
          type: "mysql",
          status: 2,
          unique_key: "54_mysql",
          asset_id: 54,
          asset_type: "db",
          data_center_id: 13,
        },
        {
          id: 55,
          name: "redis173_7000",
          type: "redis",
          status: 0,
          unique_key: "55_redis",
          asset_id: 55,
          asset_type: "db",
          data_center_id: 13,
        },
        {
          id: 56,
          name: "mongdo-test154测试",
          type: "mongodb",
          status: 0,
          unique_key: "56_mongodb",
          asset_id: 56,
          asset_type: "db",
          data_center_id: 13,
        },
        {
          id: 58,
          name: "sql-31",
          type: "sqlserver",
          status: 0,
          unique_key: "58_sqlserver",
          asset_id: 58,
          asset_type: "db",
          data_center_id: 13,
        },
        {
          id: 62,
          name: "sqlserver164",
          type: "sqlserver",
          status: 0,
          unique_key: "62_sqlserver",
          asset_id: 62,
          asset_type: "db",
          data_center_id: 13,
        },
        {
          id: 4,
          name: "236.112",
          type: "db",
          status: 0,
          unique_key: "4_oracle",
          asset_id: 4,
          asset_type: "db",
          data_center_id: 13,
        },
        {
          id: 18,
          name: "236.129-oracle",
          type: "db",
          status: 0,
          unique_key: "18_oracle",
          asset_id: 18,
          asset_type: "db",
          data_center_id: 13,
        },
        {
          id: 6113,
          name: "236.121/236.122",
          type: "rac",
          status: 0,
          unique_key: "6113_rac",
          asset_id: 6113,
          asset_type: "db",
          data_center_id: 13,
        },
        {
          id: 6051,
          name: "236.121/236.122",
          type: "rac",
          status: 0,
          unique_key: "6051_rac",
          asset_id: 6051,
          asset_type: "db",
          data_center_id: 13,
        },
        {
          id: 21,
          name: "sqlserver-162-test111",
          type: "availability_group",
          status: 0,
          unique_key: "21_availability_group",
          asset_id: 21,
          asset_type: "db",
          data_center_id: 13,
        },
        {
          id: 22,
          name: "192.168.236.163-test111",
          type: "availability_group",
          status: 0,
          unique_key: "22_availability_group",
          asset_id: 22,
          asset_type: "db",
          data_center_id: 13,
        },
        {
          id: 8566,
          name: "sqlserver164-test111",
          type: "availability_group",
          status: 0,
          unique_key: "8566_availability_group",
          asset_id: 8566,
          asset_type: "db",
          data_center_id: 13,
        },
        {
          id: 81,
          name: "db2-70",
          type: "db2",
          status: 0,
          unique_key: "81_db2",
          asset_id: 81,
          asset_type: "db",
          data_center_id: 13,
        },
        {
          id: 80,
          name: "db2-69",
          type: "db2",
          status: 0,
          unique_key: "80_db2",
          asset_id: 80,
          asset_type: "db",
          data_center_id: 13,
        },
        {
          id: 13,
          name: "window-103",
          type: "db",
          status: 0,
          unique_key: "13_oracle",
          asset_id: 13,
          asset_type: "db",
          data_center_id: 13,
        },
        {
          id: 14,
          name: "window-104",
          type: "db",
          status: 0,
          unique_key: "14_oracle",
          asset_id: 14,
          asset_type: "db",
          data_center_id: 13,
        },
        {
          id: 79,
          name: "mysql-152",
          type: "mysql",
          status: 0,
          unique_key: "79_mysql",
          asset_id: 79,
          asset_type: "db",
          data_center_id: 13,
        },
        {
          id: 78,
          name: "mysql-151",
          type: "mysql",
          status: 0,
          unique_key: "78_mysql",
          asset_id: 78,
          asset_type: "db",
          data_center_id: 13,
        },
        {
          id: 75,
          name: "oracle-131",
          type: "db",
          status: 2,
          unique_key: "75_oracle",
          asset_id: 75,
          asset_type: "db",
          data_center_id: 13,
        },
        {
          id: 74,
          name: "oracle-132",
          type: "db",
          status: 2,
          unique_key: "74_oracle",
          asset_id: 74,
          asset_type: "db",
          data_center_id: 13,
        },
        {
          id: 2,
          name: "236.102-oracle",
          type: "db",
          status: 2,
          unique_key: "2_oracle",
          asset_id: 2,
          asset_type: "db",
          data_center_id: 13,
        },
        {
          id: 1,
          name: "236.101-oracle",
          type: "db",
          status: 2,
          unique_key: "1_oracle",
          asset_id: 1,
          asset_type: "db",
          data_center_id: 13,
        },
        {
          id: 35,
          name: "31_19c1",
          type: "db",
          status: 0,
          unique_key: "35_oracle",
          asset_id: 35,
          asset_type: "db",
          data_center_id: 13,
        },
        {
          id: 37,
          name: "31_19c3",
          type: "db",
          status: 2,
          unique_key: "37_oracle",
          asset_id: 37,
          asset_type: "db",
          data_center_id: 13,
        },
      ],
    },
    {
      id: 199,
      name: "网络111",
      assets: [
        {
          id: 20,
          name: "200-vip",
          type: "net",
          status: 0,
          unique_key: "20_net",
          asset_id: 20,
          asset_type: "net",
          data_center_id: 13,
        },
        {
          id: 21,
          name: "201-vip",
          type: "net",
          status: 3,
          unique_key: "21_net",
          asset_id: 21,
          asset_type: "net",
          data_center_id: 13,
        },
      ],
    },
    {
      id: 198,
      name: "中间件1",
      assets: [],
    },
  ],
  link: [
    {
      source: "4_oracle",
      target: "18_oracle",
      link_status: 0,
      rpo: "3秒",
      rpo_int: 3,
      type: "db",
      status: 0,
      pair_id: 6115,
      rto: "",
    },
    {
      source: "4_oracle",
      target: "6113_rac",
      link_status: 0,
      rpo: "2秒",
      rpo_int: 2,
      type: "db",
      status: 0,
      pair_id: 6114,
      rto: "",
    },
    {
      source: "15_general",
      target: "16_general",
      link_status: 0,
      rpo: "",
      type: "general",
      status: 0,
      pair_id: 6107,
      rto: "",
    },
    {
      source: "6051_rac",
      target: "18_oracle",
      link_status: 1,
      rpo: "",
      rpo_int: 9223372036854776000,
      type: "rac",
      status: 2,
      pair_id: 6052,
      rto: "",
    },
    {
      source: "21_availability_group",
      target: "22_availability_group",
      link_status: 0,
      rpo: "0秒",
      rpo_int: 0,
      type: "availability_group",
      status: 0,
      pair_id: 5914,
      log_transmission_delay_ngdbra: "0秒",
      log_transmission_delay_ngdbra_status: 0,
      rto: "15秒",
    },
    {
      source: "21_availability_group",
      target: "8566_availability_group",
      link_status: 0,
      rpo: "0秒",
      rpo_int: 0,
      type: "availability_group",
      status: 0,
      pair_id: 5913,
      log_transmission_delay_ngdbra: "0秒",
      log_transmission_delay_ngdbra_status: 0,
      rto: "17秒",
    },
    {
      source: "8566_availability_group",
      target: "22_availability_group",
      link_status: 1,
      rpo: null,
      rpo_int: null,
      type: "availability_group",
      status: 2,
      pair_id: 5854,
      log_transmission_delay_ngdbra: "",
      log_transmission_delay_ngdbra_status: 0,
      rto: "",
    },
    {
      source: "20_net",
      target: "21_net",
      link_status: 0,
      rpo: "",
      type: "net",
      status: 0,
      pair_id: 5794,
      rto: "5分10秒",
    },
    {
      source: "81_db2",
      target: "80_db2",
      link_status: 1,
      rpo: "",
      rpo_int: 9223372036854776000,
      type: "db2",
      status: 2,
      pair_id: 5637,
      rto: "7秒",
    },
    {
      source: "13_oracle",
      target: "14_oracle",
      link_status: 0,
      rpo: "3秒",
      rpo_int: 3,
      type: "db",
      status: 0,
      pair_id: 5569,
      rto: "2分28秒",
    },
    {
      source: "202_app",
      target: "37_app",
      link_status: 1,
      rpo: "",
      type: "app",
      pair_id: 5545,
      file_sync: "",
      status: 0,
      rto: "",
    },
    {
      source: "79_mysql",
      target: "78_mysql",
      link_status: 0,
      rpo: "",
      rpo_int: 9223372036854776000,
      type: "mysql",
      status: 2,
      pair_id: 5510,
      rto: "",
    },
    {
      source: "37_app",
      target: "38_app",
      link_status: 1,
      rpo: "",
      type: "app",
      pair_id: 5479,
      file_sync: "",
      status: 0,
      rto: "",
    },
    {
      source: "75_oracle",
      target: "74_oracle",
      link_status: 1,
      rpo: "",
      rpo_int: 9223372036854776000,
      type: "db",
      status: 2,
      pair_id: 2343,
      rto: "40秒",
    },
    {
      source: "201_app",
      target: "202_app",
      link_status: 1,
      rpo: "",
      type: "app",
      pair_id: 2233,
      file_sync: "",
      status: 0,
      rto: "",
    },
    {
      source: "2_oracle",
      target: "1_oracle",
      link_status: 1,
      rpo: "",
      rpo_int: 9223372036854776000,
      type: "db",
      status: 2,
      pair_id: 1980,
      rto: "17分49秒",
    },
    {
      source: "35_oracle",
      target: "37_oracle",
      link_status: 1,
      rpo: "",
      rpo_int: 9223372036854776000,
      type: "db",
      status: 2,
      pair_id: 1923,
      rto: "4时22分32秒",
    },
  ],
  data_centers: [
    // { id: 13, name: "生产中心" },
    { id: 1, name: "生产数据中心" },
    // { id: 10, name: "灾备数据中心2" },
  ],
};
function sliceArray(arr: any[], size = 3) {
  const result = [];
  for (let i = 0; i < arr.length; i = i + size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export default function Demo() {
  const [nodes, setNodes] = useState<NodeData[]>(MOCK.classifies.flatMap((item) => item.assets) as NodeData[]);
  const columns = MOCK.data_centers.map((item) => ({ title: item.name, dataIndex: `dataCenter${item.id}` }));

  const [dataSource, setDataSource] = useState<
    {
      key: number;
      type: string;
      padding?: number[];
      rowSize: number;
      colSize: number;
      [dataCenter: `dataCenter${number}`]: string[][];
    }[]
  >(() => {
    const dataCenters = MOCK.data_centers;

    // 每行展示几个节点, 一列时每行十个, 两列时每行五个, 三列时每行三个
    const colSize = dataCenters.length > 0 ? Math.floor(10 / dataCenters.length) : 3;

    const result = MOCK.classifies.map((item) => {
      let rowSize = 1;
      const obj = dataCenters.reduce((res, center) => {
        const dataCenterName = `dataCenter${center.id}`;
        const dataCenterNodes = item.assets
          .filter((node) => node.data_center_id === center.id)
          .map((node) => node.unique_key);
        const dataCenterRowSize = Math.ceil(dataCenterNodes.length / colSize);
        if (dataCenterRowSize > rowSize) {
          rowSize = dataCenterRowSize;
        }
        return {
          ...res,
          [dataCenterName]: sliceArray(dataCenterNodes, colSize),
        };
      }, {});

      return {
        key: item.id,
        type: item.name,
        padding: [
          getPaddingTop(0),
          getPaddingTop(1),
          getPaddingTop(2),
          getPaddingTop(3),
          getPaddingTop(4),
          getPaddingTop(5),
        ],
        colSize,
        rowSize,
        ...obj,
      };
    });

    console.log(result);
    return result;
  });

  const [align, setValue] = useState<"left" | "center">("left");

  return (
    <Card title="特定布局的节点组件">
      <Space direction="vertical">
        <Form.Item label="align">
          <Segmented options={["left", "center"]} value={align} onChange={setValue} />
        </Form.Item>
      </Space>

      <NodeTable style={{ marginTop: 24 }} nodes={nodes} columns={columns} dataSource={dataSource} align={align} />
    </Card>
  );
}

function getPaddingTop(lines: number) {
  if (!lines || lines <= 0) {
    return 24;
  }
  return 24 + 16 + 8 * (lines - 1);
}
