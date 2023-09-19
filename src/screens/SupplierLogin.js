import axios from 'axios';
import { useState } from 'react';
import {View, Text, TextInput, Image, Button, ScrollView, Dimensions} from 'react-native'
import * as ImagePicker from 'expo-image-picker';

const SupplierLogin = ({props}) => {

    const dimensions = Dimensions.get('window');   
    const imageWidth = dimensions.width;

    const [thumbnailImage, setThumbnailImage] = useState(null);
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [image5, setImage5] = useState(null);

    const [state, setState] = useState({
        phoneNumber: 0,
        address: 0,
        productName: 0,
        category :0, 
        subCategory: 0, 
        description : 0, 
        review: 0, 
        rating: 0, 
        price: 0.0,
        shipped: 0,
        productCount: 0,
        thumbnailImage: null,
        image1: null,
        image2: null,
        image3: null,
        image4: null,
        image5: null
      });


    const handleFormSubmission = () => {
        alert(JSON.stringify(state));
        let productimages = [];

        axios.post('', {
            method: "POST",
            url: serverUrl + "/multiplefiles",
            data: {
                phoneNumber: {phoneNumber},
                address: {address},
                productName: {productName},
                category: {category},
                subCategory: {subCategory},
                description: {description},
                review: {review},
                rating: {rating},
                price: {price},
                shipped: {shipped},
                productCount: {productCount},
                images: {productimages}
            },
            headers: {
              "Content-Type": "multipart/form-data"
            }
          });
    }

    const handleInputChange = (event) => {
        
        const { name, value } = event.target;
        setState((prevProps) => ({
          ...prevProps,
          [name]: value
        }));


      };

    const pickImage = async (event) => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            if(event == 0) { 
              setThumbnailImage(result.assets[0].uri);
            } else if ( event == 1) {
              setImage1(result.assets[0].uri);
            } else if (event == 2 ) {
              setImage2(result.assets[0].uri);
            } else if (event == 3 ) {
              setImage3(result.assets[0].uri);
            } else if (event == 4 ) {
              setImage4(result.assets[0].uri);
            } else if (event == 5 ) {
              setImage5(result.assets[0].uri);
            }
        }
      }

    return (<ScrollView>
        <View style={{justifyContent: "center", alignItems: "center", flex:1, width: (imageWidth-10), marginTop: 30}}>
        <Text style={{color: 'brown', marginBottom: 10, textDecorationLine: 'underline', fontWeight: 'bold'}} > Basic Details </Text>
        <TextInput placeholder='CellPhone Number' value={state.phoneNumber} onChange={handleInputChange} title="Phone Number: "></TextInput>
        <TextInput placeholder='Address' value={state.address} onChange={handleInputChange} title="Address: "></TextInput>
        <TextInput  placeholder='Product Count' onChange={handleInputChange} value={state.productCount}></TextInput>
        <TextInput style={{color: '#d3d3d3'}}> -------------------------------------------------------------------------------------------------- </TextInput>

        <Text style={{color: 'brown', marginBottom: 10, textDecorationLine: 'underline', fontWeight: 'bold'}}> Add Product Details </Text>
        <TextInput  placeholder='Product Name' value={state.productName} onChange={handleInputChange} ></TextInput>
        <TextInput  placeholder='Category' value={state.category} onChange={handleInputChange} ></TextInput>
        <TextInput  placeholder='SubCategory' value={state.subCategory} onChange={handleInputChange} ></TextInput>
        <TextInput  placeholder='Description' value={state.description} onChange={handleInputChange} ></TextInput>
        <TextInput  placeholder='Review' value={state.review} onChange={handleInputChange} ></TextInput>
        <TextInput  placeholder='Rating' value={state.rating} onChange={handleInputChange} ></TextInput>
        <TextInput  placeholder='Price' value={state.price} onChange={handleInputChange} ></TextInput>
        <TextInput  placeholder='Shipped: YES/NO' value={state.shipped} onChange={handleInputChange} ></TextInput>
        <TextInput style={{color: '#d3d3d3'}}> -------------------------------------------------------------------------------------------------- </TextInput>
        <Text style={{color: 'brown', marginBottom: 10, textDecorationLine: 'underline', fontWeight: 'bold'}}> Add Product Images</Text>
        <Button title="Thumbnail - Image" onPress={() => pickImage('0')} />
                {thumbnailImage && <Image source={{ uri: thumbnailImage }} style={{ width: 60, height: 60 }} />}
            <Button title="Scroll Image 1" onPress={() => pickImage('1')} />
                {image1 && <Image source={{ uri: image1 }} style={{ width: 60, height: 60 }} />}
            <Button title="Scroll Image 2" onPress={() => pickImage('2')} />
                {image2 && <Image source={{ uri: image2 }} style={{ width: 60, height: 60 }} />}
            <Button title="Scroll Image 3" onPress={() => pickImage('3')} />
                {image3 && <Image source={{ uri: image3 }} style={{ width: 60, height: 60 }} />}
            <Button title="Scroll Image 4" onPress={() => pickImage('4')} />
                {image4 && <Image source={{ uri: image4 }} style={{ width: 60, height: 60 }} />}
            <Button title="Scroll Image 5" onPress={() => pickImage('5')} />
                {image5 && <Image source={{ uri: image5 }} style={{ width: 60, height: 60 }} />}
            <Button title='Upload' onPress={()=> handleFormSubmission}>Add</Button>
    </View></ScrollView>);
}

export default SupplierLogin;