import Icons from "../../assets/icons/sprite.svg";

interface IconProps {
  id: string;
  className?: string;
  size: number;
}

export const Icon: React.FC<IconProps> = ({
  id,
  className,
  size,
}): JSX.Element => {
  return (
    <svg className={className} height={size} width={size}>
      <use href={Icons + "#icon-" + id}></use>
    </svg>
  );
};