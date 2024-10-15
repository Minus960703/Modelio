import Image        from 'next/image';
// import Light        from '@/assets/light.svg'
// import Dark         from '@/assets/dark.svg'
// import User         from '@/assets/user-icon.svg'
// import ArrowLeft   from 'assets/arrow_left.png';
import ArrowRight   from '@/assets/arrow_right.svg';

interface IconProps {
  icon: 'ARROWRIGHT'
}

interface IconImageProps extends IconProps {
  width       ?: number;
  height      ?: number;
}

const isDiscernIcon = ({ icon }: IconProps) => {
  switch (icon) {
    case 'ARROWRIGHT':
      return ArrowRight;
    default:
      break;
  };
}

const IconImage = ({
  icon,
  width       = 24,
  height      = 24
}: IconImageProps) => {
  const Icon: any = isDiscernIcon({ icon });
  return (
    <>
      <Image src={Icon} alt="아이콘" width={width} height={height}/>
    </>
  )
}

export { IconImage };