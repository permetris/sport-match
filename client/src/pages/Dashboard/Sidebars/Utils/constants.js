import {
  ArrowLeftIcon,
  ClockIcon,
  HomeIcon,
  MapIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export const navigation = [
  {
    name: "Reservations",
    href: "/dashboard/reservations",
    icon: ClockIcon,
    roles: ["ADMIN","FIELD_OWNER"]
  },
  { name: "Cities", href: "/dashboard/cities", icon: HomeIcon, roles: ["ADMIN"] },
  { name: "Users", href: "/dashboard/users", icon: UserIcon, roles: ["ADMIN"] },
  { name: "Fields", href: "/dashboard/fields", icon: MapIcon, roles: ["ADMIN","FIELD_OWNER"] },
  { name: "Back to app", href: "/", icon: ArrowLeftIcon ,roles: ["ADMIN","FIELD_OWNER"]},
];
