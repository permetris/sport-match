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
  },
  { name: "Cities", href: "/dashboard/cities", icon: HomeIcon },
  { name: "Users", href: "/dashboard/users", icon: UserIcon },
  { name: "Fields", href: "/dashboard/fields", icon: MapIcon },
  { name: "Back to app", href: "/", icon: ArrowLeftIcon },
];
