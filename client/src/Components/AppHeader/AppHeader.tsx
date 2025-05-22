//import from pre build package and library
import { Menu, Layout } from "antd";
import { Link, useLocation, useSearchParams } from "react-router-dom";
//import from custom files and components
import AutoCompleteInput from "../AutoComplete/AutoComplete";
import { baseUrl } from "../../utils";
//css import
import "./AppHeader.css";

const { Header } = Layout;

//function to search the dishes used in autocomplete
const fetchCities = async (query: string) => {
  const res = await fetch(`${baseUrl}/search?q=${query}`);
  const data = await res.json();
  return data.map((item: { [key: string]: string }) => ({ value: item.value }));
};

const AppHeader = () => {
  //hooks and state initializations
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const basePath = location.pathname.startsWith("/dishDetails")
    ? "/dishDetails"
    : location.pathname;

  const handleDishSearch = (searchedDish: string) => {
    console.log(searchedDish);
    const newParams = new URLSearchParams(searchParams);
    if (searchedDish && searchedDish !== "") {
      newParams.set("searched-dish", searchedDish);
    } else {
      newParams.delete("searched-dish");
    }
    setSearchParams(newParams);
  };

  return (
    <Header className="fixed-header">
      <Menu theme="dark" mode="horizontal" selectedKeys={[basePath]}>
        <Menu.Item key="/">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="/dishSelector">
          <Link to="/dishSelector">Dish Selector</Link>
        </Menu.Item>
      </Menu>
      <AutoCompleteInput
        placeholder="Search Dishes"
        fetchOptions={fetchCities}
        debounceDelay={500}
        onSelect={handleDishSearch}
        clearParams={() => {
          const newParams = new URLSearchParams(searchParams);
          newParams.delete("searched-dish");
          setSearchParams(newParams);
        }}
      />
    </Header>
  );
};

export default AppHeader;
