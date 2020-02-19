import React, { useRef, useState, useLayoutEffect } from 'react';
import { makeDecorator } from '@storybook/addons';
import { addons } from '@storybook/addons';
import { Resizable } from 're-resizable';
import constants from './constants';

const {
  minWrapperWidth,
  resizeHandleWidth,
  wrapperWidthChangeEvent,
  wrapperMaxWidthChangeEvent,
  toolWidthChangeEvent
} = constants;

const TaffyWrapper = ({ children }) => {

  let isMounted = false;
  const channel = addons.getChannel();
  const wrapperEl = useRef(null);
  const [wrapperWidth, setWrapperWidth] = useState('100%');
  useLayoutEffect(() => {
    isMounted = true;
    if (wrapperEl) {
      const maxWidth = wrapperEl.current.getBoundingClientRect().toJSON().width;
      channel.emit(wrapperMaxWidthChangeEvent, maxWidth);
      setWrapperWidth(wrapperEl.current.getBoundingClientRect().toJSON().width);
    }
    channel.on(toolWidthChangeEvent, handleToolWidthChange);
    channel.emit(wrapperWidthChangeEvent, wrapperWidth);

    return () => {
      channel.off(toolWidthChangeEvent);
      isMounted = false;
    }
  }, [wrapperEl.current]);

  const handleResize = width => {
    channel.emit(wrapperWidthChangeEvent, width);
  };

  const handleResizeStop = width => {
    if (width < minWrapperWidth) {
      width = minWrapperWidth;
    }
    channel.emit(wrapperWidthChangeEvent, width);
    setWrapperWidth(width);
  };

  const handleToolWidthChange = width => {
    if (isMounted) {
      setWrapperWidth(parseInt(width));
    }
  };

  return (
    <div style={{
      paddingRight: resizeHandleWidth
    }}>
      <Resizable
        onResize={(e, direction, ref, d) => handleResize(wrapperWidth + d.width)}
        onResizeStop={(e, direction, ref, d) => handleResizeStop(wrapperWidth + d.width)}
        size={{ width: wrapperWidth, height: '100%' }}
        style={{
          backgroundColor: '#fff',
          position: 'relative',
          left: '50%',
          height: '100%',
          transform: 'translateX(-50%)'
        }}
        handleStyles={{
          right: {
            backgroundColor: '#ccc',
            display: 'block',
            height: '100%',
            position: 'absolute',
            right: `-${resizeHandleWidth}`,
            top: 0,
            width: resizeHandleWidth
          }
        }}
        enable={{
          top: false,
          right: true,
          bottom: false,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false
        }}
      >
        <div ref={wrapperEl}>
          {children}
        </div>
      </Resizable>
    </div>
  );
};

export const withTaffy = makeDecorator({
  name: 'withSitecoreProps',
  allowDeprecatedUsage: false,
  wrapper: (getStory, context) => {
    const story = getStory(context);
    return (
      <TaffyWrapper>
        {story}
      </TaffyWrapper>
    );
  }
});