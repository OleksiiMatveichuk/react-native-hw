import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";

import ProfileScreen from "./ProfileScreen";
import PostsScreen from "./PostsScreen";
import CreatePostScreen from "./CreatePostScreen";
import { LogoutBtn } from "../components";
import { ROUTES } from "../constants/routes";

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        return <MyButton {...{ isFocused, onPress, label }} key={label} />;
      })}
    </View>
  );
}

const TabBarIcon = ({ focused, color, size }) => {
  const route = useRoute();
  if (route.name === ROUTES.profile) {
    return <Feather name="user" size={size} color={color} />;
  } else if (route.name === ROUTES.createPost) {
    return <Ionicons name="add" size={size} color={color} />;
  } else if (route.name === ROUTES.posts) {
    return <Feather name="grid" size={size} color={color} />;
  }
};

const screenOptions = {
  tabBarShowLabel: false,
  tabBarActiveTintColor: "white",
  tabBarInactiveTintColor: "#212121",
  tabBarActiveBackgroundColor: "#FF6C00",
  tabBarStyle: [
    {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  ],
  tabBarItemStyle: {
    borderRadius: 40,
    alignItems: "center",
    marginHorizontal: 16,
    justifyContent: "center",
  },
  tabBarIcon: TabBarIcon,
};

const tabs = {
  posts: {
    name: ROUTES.posts,
    options: {
      title: "Публікації",
      headerTitleAlign: "center",
      headerRight: LogoutBtn,
    },
    component: PostsScreen,
  },
  createPost: {
    name: ROUTES.createPost,
    component: CreatePostScreen,
    options: {
      title: "Створити публікацію",
      headerTitleAlign: "center",
      headerRight: LogoutBtn,
    },
  },
  profile: {
    name: ROUTES.profile,
    component: ProfileScreen,
    options: {
      title: "Профіль",
      headerTitleAlign: "center",
      headerShown: false,
    },
  },
};

const Tabs = createBottomTabNavigator();

const Home = () => {
  console.log("Home rendered");
  return (
    <Tabs.Navigator
      screenOptions={screenOptions}
      initialRouteName={ROUTES.posts}
    >
      <Tabs.Screen {...tabs.posts} />
      <Tabs.Screen {...tabs.createPost} />
      <Tabs.Screen {...tabs.profile} />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    flex: 2,
  },
});

export default Home;
