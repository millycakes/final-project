/**
 * TODOS
 * 
 * fix font import not working
 * create global styles for container layout (phone margin) and text styles
 * fix wrap for goals
 * research more about nesting views and safearea
 * change chosen__ to just chosen
 */


import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/welcome" />;
}