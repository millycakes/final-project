import { Text, View, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { globalStyles } from '../styles/global'
import {Camera} from 'expo-camera'
import { useEffect, useState } from 'react'
import { COLORS } from '../constants/theme'
import moment from 'moment'
import Button from '../components/common/Button'
import { useRouter,useLocalSearchParams } from 'expo-router'

function camera() {

    const [startCamera,setStartCamera] = useState(false)
    const [previewVisible, setPreviewVisible] = useState(false)
    const [capturedImage, setCapturedImage] = useState(null)

    const [time, setTime] = useState(moment().format('h:mm a'))
    const router = useRouter();


    useEffect(() => {
        let secTimer = setInterval( () => {
            setTime(moment().format('h:mm a'))
        },1000)
    
        return () => clearInterval(secTimer);
    }, []);
    
    useEffect(() => {
        __startCamera();
    }, [])

    const __takePicture = async () => {
        if (!camera) return
        const photo = await camera.takePictureAsync()
        console.log(photo)
        setPreviewVisible(true)
        setCapturedImage(photo)
    }
    

    const __startCamera = async () => {
        const {status} = await Camera.requestCameraPermissionsAsync()
        if (status === 'granted') {
          // start the camera
            setStartCamera(true)
        } else {
            Alert.alert('Access denied')
        }
    }

    const onSubmitFormHandler = async (e)=>{
        router.push({pathname: "/submissionconf", params: {photo: capturedImage}});
    }

    return (
        <>
            {previewVisible && capturedImage ? 
                <View
                style={{
                    backgroundColor: 'transparent',
                    flex: 1,
                    width: '100%',
                    height: '100%'
                    }}
                >
                    <ImageBackground
                    source={{uri: capturedImage && capturedImage.uri}}
                    style={{
                        flex: 1
                    }}
                    />
                    <Button
                        title='Continue'
                        onPress={onSubmitFormHandler}
                    />
                </View> : <></>
            }
            {!previewVisible && startCamera ?
            <>
                <Camera
                    style={{flex: 1,width: '100%', height: '100%', position: 'absolute'}}
                    ref={(r) => {
                    camera = r
                    }}
                ></Camera> 
                <View style={styles.shutterOutline}>
                    <TouchableOpacity
                        onPress={__takePicture}
                        style={styles.shutter}
                    />
                </View>
                <View style={styles.timeStamp}>
                    <Text style={styles.timeStampText}>
                        {time}
                    </Text>
                </View>
            </>
            : <></>}
        </>
    )
};

const styles = StyleSheet.create({
    shutter: {
        borderRadius: 50,
        backgroundColor: COLORS.white,
        width: 70,
        height: 70
    },
    shutterOutline: {
        padding: 8,
        borderColor: COLORS.white,
        borderStyle: 'solid',
        borderWidth: 4,
        position: 'absolute',
        bottom: 120,
        left: (Dimensions.get('window').width / 2) - 44,
        borderRadius: '100%'
    },
    timeStamp: {
        backgroundColor: COLORS.white,
        position: 'absolute',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 32,
        top: 20,
        right: 20
    },
    timeStampText: {
        color: COLORS.gray600
    }
})

export default camera
