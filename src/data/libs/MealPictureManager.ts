import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import { launchImageLibraryAsync } from 'expo-image-picker';

const MAX_PICTURE_WIDTH = 1600;
const PICTURE_COMPRESSION = 0.8;

interface IOptimizeParams {
  uri: string;
  width: number;
}

async function optimize({ uri, width }: IOptimizeParams): Promise<string> {
  const context = ImageManipulator.manipulate(uri);

  if (width > MAX_PICTURE_WIDTH) {
    context.resize({ width: MAX_PICTURE_WIDTH, height: null });
  }

  const image = await context.renderAsync();
  const picture = await image.saveAsync({ format: SaveFormat.JPEG, compress: PICTURE_COMPRESSION });

  return picture.uri;
}

async function pick(): Promise<string | null> {
  const result = await launchImageLibraryAsync({ mediaTypes: ['images'], quality: 1 });
  const asset = result.assets?.[0];

  if (result.canceled || !asset) {
    return null;
  }

  return optimize({ uri: asset.uri, width: asset.width });
}

export const MealPictureManager = {
  optimize,
  pick
};
