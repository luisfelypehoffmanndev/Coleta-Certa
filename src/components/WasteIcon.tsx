import { AppIcon } from './AppIcon';
import type { WasteType } from '../domain/types';

interface WasteIconProps {
  color: string;
  size?: number;
  type: WasteType;
}

export function WasteIcon({ color, size = 21, type }: WasteIconProps) {
  return <AppIcon color={color} name={type === 'wet' ? 'trash' : 'recycle'} size={size} />;
}
