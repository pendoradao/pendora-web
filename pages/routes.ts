import Home from "./home";

const routes = [
  {
    name: "home",
    path: "",
    element: Home,
  },
  {
    name: "channel",
    path: "/channel/[channel_id]",
    element: Home,
  },
  // {
  //   name: "topic",
  //   path: 
  // }
]

export default routes;