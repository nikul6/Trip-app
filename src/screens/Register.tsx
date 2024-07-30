import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Image,
    StyleSheet,
    ScrollView,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Text,
} from 'react-native';
import { useForm } from 'react-hook-form';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import SocialSignInButtons from '../components/SocialSignInButtons';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useAuth } from '../Context/AuthProvider';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/auth/authAction';
import { AppDispatch, RootState } from '../redux/store';

type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, "Register">

export default function Register({ navigation }: RegisterScreenProps) {
    const insets = useSafeAreaInsets();

    const dispatch = useDispatch<AppDispatch>();
    const { user, loading, error } = useSelector((state: RootState) => state.auth);
    // const {registerWithContext} = useAuth();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterData>();

    const onRegisterPressed = async (data: RegisterData) => {
        // Redux register
        await dispatch(registerUser(data)).then(()=>{
            // navigation.navigate("Page")
            // console.log("success")
        })
        // Alert.alert(error)
        if (user) {
            // Redirect the user to the dashboard or any other route
            console.log("scuess")
        }
        // Context register
        // await registerWithContext(data.email, data.password)
    };

    useEffect(() => {
        if (error) {
          Alert.alert('Registration Error', error);
        }
      }, [error]);

    const onForgotPasswordPressed = () => {
        console.log('onForgotPasswordPressed');
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
                        name="name"
                        placeholder="Name"
                        control={control}
                        rules={{
                            required: 'name is required',
                        }}
                    />
                    <CustomInput
                        name="email"
                        placeholder="email"
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
                            text={'Register'}
                            onPress={handleSubmit(onRegisterPressed)}
                        />
                    )}
                    {error && <Text style={styles.errorText}>{error}</Text>}

                    {/* <CustomButton
                        text={'Register'}
                        onPress={handleSubmit(onRegisterPressed)}
                    /> */}

                    <CustomButton
                        text={"Forgot password?"}
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
    errorText: {
        color: 'red',
        marginTop: 12,
      },
})