import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import { launchImageLibraryAsync } from 'expo-image-picker';

const MAX_PICTURE_WIDTH = 1600;
const PICTURE_COMPRESSION = 0.8;

async function pick(): Promise<string | null> {
  const result = await launchImageLibraryAsync({ mediaTypes: ['images'], quality: 1 });
  const asset = result.assets?.[0];

  if (result.canceled || !asset) {
    return null;
  }

  const context = ImageManipulator.manipulate(asset.uri);

  if (asset.width > MAX_PICTURE_WIDTH) {
    context.resize({ width: MAX_PICTURE_WIDTH, height: null });
  }

  const image = await context.renderAsync();
  const { uri } = await image.saveAsync({ format: SaveFormat.JPEG, compress: PICTURE_COMPRESSION });

  return uri;
}

export const MealPictureManager = {
  pick
};
