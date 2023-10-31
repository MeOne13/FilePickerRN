import {Text, View} from "react-native";
import {Image} from "expo-image";
import {Asset, useAssets} from "expo-asset";

export function Avatar() {
    // const [assets, error] = useAssets(LocalUri);
    const u = useAssets(require( '../../../assets/images/avatars/Ann.png'));
    const u1 = u[0];
    const u2 = u1 && u1[0].uri;
    return (
        u2 && <View style={{paddingRight: 15}}>
            <Image
                cachePolicy='memory-disk'
                placeholder={null}
                contentFit='fill'
                style={{height: 50, width: 50, borderRadius: 50, borderWidth: 2, borderColor: 'white'}}
                // source={{uri: assets[0].localUri ?? undefined}}
                source={{uri: u2}}
            />
        </View>
    );
}