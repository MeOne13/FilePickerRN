import {Text, View} from "react-native";
import {Image} from "expo-image";
import {Asset, useAssets} from "expo-asset";
import React from "react";
import {NoteEntry} from "../Types/Items";
import {User} from "../Utils/Generators/TestUsers";

interface AvatarRowComponentProps {
    user: User,
    textColor: string
}
export function AvatarRow({user, textColor = 'white'}: AvatarRowComponentProps) {
    // const [assets, error] = useAssets(LocalUri);
    const u = useAssets(require('../../../assets/images/avatars/Ann.png'));
    const u1 = u[0];
    const u2 = u1 && u1[0].uri;
    return (
        u2 && <View style={{
            height: 60,
            alignItems: 'flex-start',
            flexDirection: 'row',
            borderRadius: 5}}>
            <Image
                cachePolicy='memory-disk'
                placeholder={null}
                contentFit='fill'
                style={{height: 60, width: 60, borderRadius: 50, borderWidth: 2, borderColor: textColor }}
                // source={{uri: assets[0].localUri ?? undefined}}
                source={{uri: u2}}
            />
            <Text style={{
                fontWeight: 'bold',
                alignSelf: 'center',
                color: textColor,
                // color: '#E6E7E8',
                fontSize: 20,
                paddingLeft: 40,
                textTransform: 'uppercase'
            }}>{user.name}</Text>
        </View>
    );
}