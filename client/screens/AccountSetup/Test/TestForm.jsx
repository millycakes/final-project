import { SafeAreaView, Text, View, TouchableOpacity, Button} from 'react-native';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import axios from "axios";

export default function TestForm() {
    const [selected, setSelected]  = useState("");
    const router = useRouter();

    const handlePressOption1 = () => {
        setSelected('option 1');
      };
    
      const handlePressOption2 = () => {
        setSelected('option 2');
      };
    
      const handlePressOption3 = () => {
        setSelected('option 3');
      };
    
      const handlePressOption4 = () => {
        setSelected('option 4');
      };

      const onSubmitFormHandler = async (e)=>{
        try {
            await axios.post('http:localhost:3000/testForm', {
              selected
            });
          } catch (error) {
            alert(error);
          }
        };

    return (
    <SafeAreaView>
      <View >
        <TouchableOpacity onPress={handlePressOption1}>
            <Text>Option 1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressOption2}>
            <Text>Option 2</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressOption3}>
            <Text>Option 3</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressOption4}>
            <Text>Option 4</Text>
        </TouchableOpacity>
        <Button
                    title="Submit"
                    onPress={onSubmitFormHandler}/>
      </View>
    </SafeAreaView>
    );
}