import axios from 'axios';
import { useState } from 'react';
import {View, Text, TextInput, Image, Button, ScrollView} from 'react-native'
import * as ImagePicker from 'expo-image-picker';

const SupplierLogin = ({props}) => {

    const {phoneNumber, setPhoneNumber} = useState({}); 
    const {address, setAddress} = useState({}); 
    const {productName, setProductName} = useState({}); 
    const {category, setCategory} = useState({}); 
    const {subCategory, setSubCategory} = useState({}); 
    const {description, setDescription} = useState({}); 
    const {review, setRReview} = useState({}); 
    const {rating, setRating} = useState({}); 
    const {price, setPrice} = useState({}); 
    const {shipped, setShipped} = useState({});
    const {productCount, setProductCount} = useState({});


    const [thumbnailImage, setThumbnailImage] = useState(null);
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [image5, setImage5] = useState(null);


    const handleFormSubmission = () => {
        axios.post('', {
            
        });
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setThumbnailImage(result.assets[0].uri);
            setImage1(result.assets[0].uri);
            setImage2(result.assets[0].uri);
            setImage3(result.assets[0].uri);
            setImage4(result.assets[0].uri);
            setImage5(result.assets[0].uri);

        }
    };

    return (<ScrollView><View>
        <Text>
            Enter Phone Number
        </Text>
        <TextInput placeholder='Address' value={address} onChange={()=> setAddress({address})} title="Address: "></TextInput>
        <TextInput  placeholder='Product Count' value={productCount} onChange={()=> setProductCount({address})}></TextInput>
        <TextInput> - - - - - - - - - - - - - - - - - - - - - </TextInput>
        <TextInput  placeholder='Product Name' value={address} onChange={()=> setProductName({address})}></TextInput>
        <TextInput  placeholder='Category' value={address} onChange={()=> setCategory({address})}></TextInput>
        <TextInput  placeholder='SubCategory' value={address} onChange={()=> setSubCategory({address})}></TextInput>
        <TextInput  placeholder='Description' value={address} onChange={()=> setDescription({address})}></TextInput>
        <TextInput  placeholder='Review' value={address} onChange={()=> setReview({address})}></TextInput>
        <TextInput  placeholder='Rating' value={address} onChange={()=> setRating({address})}></TextInput>
        <TextInput  placeholder='Price' value={address} onChange={()=> setPrice({address})}></TextInput>
        <TextInput  placeholder='Shipped: YES/NO' value={address} onChange={()=> setShipped({address})}></TextInput>
        <TextInput> - - - - - - - - - - - - - - - - - - - - - </TextInput>
        <TextInput>Images:</TextInput>
        <Button title="Thumbnail - Image" onPress={pickImage} />
          {thumbnailImage && <Image source={{ uri: thumbnailImage }} style={{ width: 60, height: 60 }} />}
          <Button title="Scroll Image 1" onPress={pickImage} />
          {image1 && <Image source={{ uri: image1 }} style={{ width: 60, height: 60 }} />}
          <Button title="Scroll Image 2" onPress={pickImage} />
          {image2 && <Image source={{ uri: image2 }} style={{ width: 60, height: 60 }} />}
          <Button title="Scroll Image 3" onPress={pickImage} />
          {image3 && <Image source={{ uri: image3 }} style={{ width: 60, height: 60 }} />}
          <Button title="Scroll Image 4" onPress={pickImage} />
          {image4 && <Image source={{ uri: image4 }} style={{ width: 60, height: 60 }} />}
          <Button title="Scroll Image 5" onPress={pickImage} />
          {image5 && <Image source={{ uri: image5 }} style={{ width: 60, height: 60 }} />}
        <Button title='Upload' onPress={()=> handleFormSubmission}>Add</Button>
    </View></ScrollView>);
}

export default SupplierLogin;