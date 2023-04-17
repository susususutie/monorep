import { Select, SelectProps } from 'antd';
import { useEffect, useRef, useState } from 'react';

export type AsyncSelectProps = Exclude<SelectProps, 'options'> & {
  request: () => Promise<SelectProps['options']>;
};

export default function AsyncSelect(AsyncSelectProps: AsyncSelectProps) {
  const { request, disabled: propDisabled, ...props } = AsyncSelectProps;
  const [options, setOptions] = useState<SelectProps['options']>();
  const [disabled, setDisabled] = useState(true);
  const memoRequest = useRef<AsyncSelectProps['request']>(request);
  memoRequest.current = request;
  useEffect(() => {
    const init = async () => {
      setDisabled(true);
      setOptions(await memoRequest.current());
      setDisabled(false);
    };
    init();
  }, []);

  return (
    <Select
      optionFilterProp="label"
      {...props}
      // placeholder={disabled ? '加载中...' : props.placeholder}
      disabled={propDisabled || disabled}
      options={options}
    />
  );
}
