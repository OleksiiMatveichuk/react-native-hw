import { Map } from "../components";
import { useRoute } from "@react-navigation/native";

const MapScreen = () => {
  const route = useRoute();
  const { latitude, longitude } = route.params;
  return <Map coords={{ latitude, longitude }} />;
};

export default MapScreen;
