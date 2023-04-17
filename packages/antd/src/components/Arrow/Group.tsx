import { cx, css } from '@emotion/css';

export type ArrowGroupProps = {
  size?: 'small' | 'default' | 'large';
  className?: string;
  children?: React.ReactNode;
};

export default function Group(props: ArrowGroupProps) {
  const { children, className, size = 'default' } = props;
  const GAP = {
    small: 2,
    default: 4,
    large: 8,
  };
  const group = css`
    display: flex;
    flex-direction: column;
    gap: ${GAP[size]};
  `;
  return <div className={cx(group, className)}>{children}</div>;
}
