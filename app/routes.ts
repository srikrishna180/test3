import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("smash-towing", "routes/smash-towing.tsx"),
  route("long-distance-towing", "routes/long-distance-towing.tsx"),
  route("machinery-towing", "routes/machinery-towing.tsx"),
  route("containers-towing", "routes/containers-towing.tsx"),
  route("careers", "routes/careers.tsx"),
  route("terms-of-service", "routes/terms-of-service.tsx"),
  route("private-property-towing", "routes/private-property-towing.tsx"),
  route("privacy-policy", "routes/privacy-policy.tsx"),
  route("contact-us", "routes/contact-us.tsx"),
  route("join-us", "routes/join-us.tsx"),
] satisfies RouteConfig;
