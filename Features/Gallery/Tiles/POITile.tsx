import {Text, View} from "react-native";
import {Image} from "expo-image";
import {Asset, useAssets} from "expo-asset";

interface POITileComponentProps {
    title: string,
}

export function POITile({title}: POITileComponentProps) {
    // const [assets, error] = useAssets(LocalUri);
    const u = useAssets(require( '../../../assets/images/poi.png'));
    const u1 = u[0];
    const u2 = u1 && u1[0].uri;
    return (
        u2 && <View style={{flex:1}}>
            <Image
                cachePolicy='memory-disk'
                placeholder={null}
                contentFit='fill'
                style={{flex: 1, borderRadius: 5}}
                // source={{uri: assets[0].localUri ?? undefined}}
                source={{uri: u2, width: 50}}
            />
        </View>
    );
}