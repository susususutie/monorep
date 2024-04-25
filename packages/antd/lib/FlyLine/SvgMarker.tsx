type SvgMarkerProps = {
  color: string;
};

function SvgMarker(props: SvgMarkerProps) {
  const { color } = props;
  const markerId = getIdByColor(color);

  return (
    <marker refX="-1" id={markerId} overflow="visible" orient="auto" markerUnits="userSpaceOnUse">
      <path transform="rotate(180)" d="M 0 0 L 10 -5 L 7.5 0 L 10 5 Z" stroke={color} fill={color}></path>
    </marker>
  );
}

/**
 * 通过marker颜色获取对应marker的id, 用于在连线中获取全局defs的marker
 */
function getIdByColor(color: string) {
  return `marker-${(color.startsWith("#") ? color.slice(1) : color).toLowerCase()}`;
}

SvgMarker.getIdByColor = getIdByColor;
export default SvgMarker;
