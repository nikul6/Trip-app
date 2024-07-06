import React, { useContext, useState } from 'react';
import {
    View,
    Image,
    StyleSheet,
    ScrollView,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useForm } from 'react-hook-form';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import SocialSignInButtons from '../components/SocialSignInButtons';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { loginUser } from '../redux/auth/authAction';
// import { RootState } from '../redux/store';
// import { AuthContext } from '../Context/AuthContext';
// import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "Login">

export default function Login({ navigation }: LoginScreenProps) {
    // const [loading, setLoading] = useState<boolean>(false);
    const insets = useSafeAreaInsets();
    //   const { setIsAuthenticated } = useContext(AuthContext);

     const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterData>();

    const onSignInPressed = async (data: RegisterData) => {
        await dispatch(loginUser(data));
        if (user?.email) {
            console.log("scuess")
          }
    };

    const onForgotPasswordPressed = () => {
        navigation.navigate('Register')
    };

    const onSignUpPress = () => {
        console.log('onSignUpPress')
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, {
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }]} keyboardVerticalOffset={20}>
            <ScrollView>
                <View style={styles.root}>
                    <Image
                        source={require('../assets/Logo.png')}
                        style={[styles.logo]}
                        resizeMode="contain"
                    />
                    <CustomInput
                        name="email"
                        placeholder="Username"
                        control={control}
                        rules={{
                            required: 'email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid',
                            },
                        }}
                    />
                    <CustomInput
                        name="password"
                        placeholder="Password"
                        secureTextEntry={true}
                        control={control}
                        rules={{
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password should be minimum 6 characters long',
                            },
                        }}
                    />
                    {loading ? (
                        <ActivityIndicator size="large" color="#F41111" />
                    ) : (
                        <CustomButton
                            text={'Sign In'}
                            onPress={handleSubmit(onSignInPressed)}
                        />
                    )}

                    <CustomButton
                        text={"Register"}
                        onPress={onForgotPasswordPressed}
                        type="TERTIARY"
                    />

                    <SocialSignInButtons />

                    <CustomButton
                        text={"Don't have an account? Create one"}
                        onPress={onSignUpPress}
                        type="TERTIARY"
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        flex: 1,
        // justifyContent: 'space-around',
    },
    container: {
        flex: 1,
    },
    logo: {
        width: '100%',
        aspectRatio: 1,
        // height:'20%',
        // backgroundColor:'green'
        // maxWidth: 300,
        // maxHeight: 200,
    },
})