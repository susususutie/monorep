// import { useRef, useState } from 'react';
// import { useHover } from 'ahooks';

// /**
//  * hover判定
//  * hover trigger 触发 target 显示
//  * 鼠标移入时立即显示, 鼠标移走后延迟关闭
//  */
// function useHoverEither<Trigger extends HTMLElement = HTMLElement, Target extends HTMLElement = HTMLElement>(): [
//   boolean,
//   React.RefObject<Trigger>,
//   React.RefObject<Target>
// ] {
//   const refTrigger = useRef<Trigger>(null);
//   const [isHoverTrigger, setIsHoverTrigger] = useState(false);
//   useHover(refTrigger, {
//     onEnter() {
//       setIsHoverTrigger(true);
//     },
//     onLeave() {
//       setTimeout(() => {
//         setIsHoverTrigger(false);
//       }, 240);
//     },
//   });

//   const refTarget = useRef<Target>(null);
//   const isHoverTarget = useHover(refTarget);

//   return [isHoverTrigger || isHoverTarget, refTrigger, refTarget];
// }

// export default useHoverEither;
