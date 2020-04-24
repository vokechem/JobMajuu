import React from "react"
import * as Icon from "react-feather"

const horizontalMenuConfig = [
  {
    id: "dashboard",
    title: "Dashboard",
    type: "dropdown",
    icon: <Icon.Home size={16} />,
    children: [
      {
        id: "analyticsDash",
        title: "Analytics",
        type: "item",
        icon: <Icon.Circle size={10} />,
        navLink: "/",
        permissions : ["admin", "editor"]
      },
      {
        id: "eCommerceDash",
        title: "eCommerce",
        type: "item",
        icon: <Icon.Circle size={10} />,
        navLink: "/ecommerce-dashboard",
        permissions : ["admin", "editor"]
      }
    ]
  },
  {
    id: "page2",
    title: "Page 2",
    type: "item",
    icon: <Icon.File size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/page2",
  }  
]

export default horizontalMenuConfig
