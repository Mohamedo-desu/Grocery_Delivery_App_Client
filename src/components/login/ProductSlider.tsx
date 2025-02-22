import { imageData } from "@/constants/dummyData";
import { screenWidth } from "@/utils/scaling";
import AutoScroll from "@homielab/react-native-auto-scroll";
import { useTheme } from "@react-navigation/native";
import { Image, ImageSource } from "expo-image";
import { FC, memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";

const ProductSlider: FC = () => {
  const rows: ImageSource[][] = useMemo(() => {
    const result: ImageSource[][] = [];

    // Loop through imageData in chunks of 4
    for (let i = 0; i < imageData.length; i += 4) {
      // Push a slice of 4 elements (or less if at the end) into result
      result.push(imageData.slice(i, i + 4));
    }

    return result;
  }, []);

  return (
    <View pointerEvents="none">
      <AutoScroll
        duration={10000}
        endPaddingWidth={0}
        style={styles.autoScroll}
      >
        <View style={styles.gridContainer}>
          {rows.map((row, rowIndex) => (
            <MemoizedRow key={rowIndex} row={row} rowIndex={rowIndex} />
          ))}
        </View>
      </AutoScroll>
    </View>
  );
};

const Row: FC<{ row: ImageSource[]; rowIndex: number }> = ({
  row,
  rowIndex,
}) => {
  const { colors: theme } = useTheme();

  return (
    <View style={styles.row}>
      {row.map((image: ImageSource, imageIndex: number) => {
        const horizontalShift = rowIndex % 2 === 0 ? 20 : -20;
        return (
          <View
            style={[
              styles.itemContainer,
              {
                transform: [{ translateX: horizontalShift }],
                backgroundColor: theme.gray[100],
              },
            ]}
            key={imageIndex}
          >
            <Image source={image} contentFit="cover" style={styles.image} />
          </View>
        );
      })}
    </View>
  );
};

const MemoizedRow = memo(Row);

export default ProductSlider;

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 12,
    marginHorizontal: 10,
    width: screenWidth * 0.26,
    height: screenWidth * 0.26,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  autoScroll: {
    position: "absolute",
    zIndex: -2,
  },
  gridContainer: {
    justifyContent: "center",
    overflow: "visible",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
});
