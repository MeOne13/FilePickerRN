import {Text, View} from "react-native";
import {Image} from "expo-image";
import {Asset, useAssets} from "expo-asset";
import React from "react";
import {User} from "../Utils/Generators/TestUsers";
import {
    Roboto_300Light
} from '@expo-google-fonts/roboto';
import {useFonts} from "expo-font";

interface AvatarRowComponentProps {
    user: User,
    textColor: string
}

export function AvatarRow({user, textColor = 'white'}: AvatarRowComponentProps) {
    // const [assets, error] = useAssets(LocalUri);
    let [fontsLoaded] = useFonts({Roboto_300Light});
    const u = useAssets(require('../../../assets/images/avatars/Ann.png'));
    const u1 = u[0];
    const u2 = u1 && u1[0].localUri;
    return (
        u2 && <View style={{
            height: 40,
            alignItems: 'flex-start',
            flexDirection: 'row'
        }}>
            <Image
                cachePolicy='memory-disk'
                placeholder={null}
                contentFit='fill'
                style={{height: 40, width: 40, borderRadius: 20}}
                source={{uri: u2}}
            />
            <Text style={{
                fontWeight: 'bold',
                alignSelf: 'center',
                color: textColor,
                // color: '#E6E7E8',
                fontSize: 16,
                paddingLeft: 16,
                fontFamily: 'Roboto_300Light',
                textTransform: 'uppercase'
            }}>{user.name}</Text>
        </View>
    );
}