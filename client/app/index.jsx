import { useRouter } from "expo-router";

export default function Index() {

  const router = useRouter()

  if (Platform.OS === "ios") {
    setTimeout(() => {
      router.replace("/daily");
    }, 1)
  } else {
    setImmediate(() => {
      router.replace("/daily");
    });
  }
}