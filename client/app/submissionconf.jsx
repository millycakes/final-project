import { Text, SafeAreaView, View, ImageBackground } from "react-native"
import { globalStyles } from "../styles/global"
import Button from "../components/common/Button"
import { useRouter, useLocalSearchParams } from "expo-router";

function submissionconf() {
    const params = useLocalSearchParams();
    const {photo} = params;
    console.log(photo)
    const router = useRouter();

    const onSubmitFormHandler = async (e)=>{
        router.push({pathname: "/daily"});
    }

    return (
        <SafeAreaView style={globalStyles.safeArea}>
            <View style={globalStyles.container}>
                <Text style={globalStyles.heading3}>
                    Proof Succesfully Submitted
                </Text>
                <ImageBackground
                    source={{uri: photo && photo.uri}}
                    style={{
                        flex: 1
                    }} />
                <Button 
                    title="Done"
                    onPress={onSubmitFormHandler}
                />
            </View>
        </SafeAreaView>
    )
}

export default submissionconf