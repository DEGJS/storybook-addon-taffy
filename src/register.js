import React, { useState } from 'react';
import { addons } from '@storybook/addons';
import { useChannel } from '@storybook/api';
// import { styled, Global, Theme, withTheme } from '@storybook/theming';
import { Button, Separator } from '@storybook/components';
import { getArrayItemByValue, getEmFromPx, getPxFromEm, getRandomVal } from './utils';
import constants from './constants';

const {
  addonId,
  panelId,
  viewModes,
  presets,
  wrapperWidthChangeEvent,
  wrapperMaxWidthChangeEvent,
  toolWidthChangeEvent
} = constants;

const TaffyTool = () => {
  const [toolPxWidth, setToolPxWidth] = useState('');
  const [maxWidth, setmaxWidth] = useState(0);
  const [presetWidths, setPresetWidths] = useState(presets);

  const handleWrapperWidthChange = width => {
    setToolPxWidthAsString(width);
  };

  const handleMaxWidthChange = width => {
    const largePreset = getArrayItemByValue(presetWidths, 'large');
    if (largePreset) {
      const modifiedLargePreset = {
        ...largePreset,
        max: width
      };
      const newPresetWidths = presetWidths.map(obj => modifiedLargePreset.id === obj.id ? modifiedLargePreset : obj);
      setPresetWidths(newPresetWidths);
      setmaxWidth(width);
    }
  };

  const handleInputChange = width => {
    setToolPxWidth(width);
  };

  const handleInputBlur = width => {
    setToolPxWidth(width);
    emit(toolWidthChangeEvent, width);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setToolPxWidthAsString(toolPxWidth);
    emit(toolWidthChangeEvent, toolPxWidth);
  };

  const handlePresetClick = presetId => {
    const preset = getArrayItemByValue(presetWidths, presetId);
    const randomWidthWithinRange = getRandomVal(preset.min, preset.max);
    setToolPxWidthAsString(randomWidthWithinRange);
    emit(toolWidthChangeEvent, randomWidthWithinRange);
  };

  const handleFullClick = () => {
    setToolPxWidthAsString(maxWidth);
    emit(toolWidthChangeEvent, maxWidth);
  };

  const emit = useChannel({
    [wrapperWidthChangeEvent]: handleWrapperWidthChange,
    [wrapperMaxWidthChangeEvent]: handleMaxWidthChange
  });

  const setToolPxWidthAsString = width => setToolPxWidth(width.toString());

  return (
    <>
      <Separator />
      <form onSubmit={handleSubmit} style={{
        alignItems: 'center',
        display: 'flex'
      }}>
        <div className="taffy-field">
          <input
            id="px-input"
            onChange={e => handleInputChange(e.target.value)}
            onBlur={e => handleInputBlur(e.target.value)}
            value={toolPxWidth}
            autoComplete="off"
            type="number"
            style={{
              fontSize: '0.75rem',
              height: '1.375rem',
              width: '3.5rem'
            }}
          />
          <label htmlFor="px-input" style={{
            fontSize: '12px'
          }}>PX</label>
        </div>
        <div className="taffy-field" style={{
          marginLeft: '0.75rem'
        }}>
          <input
            id="em-input"
            onChange={e => handleInputChange(getPxFromEm(e.target.value))}
            onBlur={e => handleInputBlur(getPxFromEm(e.target.value))}
            value={getEmFromPx(toolPxWidth)}
            autoComplete="off"
            type="number"
            style={{
              fontSize: '0.75rem',
              height: '1.375rem',
              width: '3.5rem'
            }}
          />
          <label htmlFor="em-input" style={{
            fontSize: '12px'
          }}>EM</label>
        </div>
        <button type="submit" style={{
          clip: 'rect(1px, 1px, 1px, 1px)',
          height: '1px',
          overflow: 'hidden',
          position: 'absolute',
          whiteSpace: 'nowrap',
          width: '1px'
        }}>Submit</button>
      </form>


      {presetWidths.map(({ id, title, label }) => (
        <Button
          key={id}
          title={title}
          onClick={() => handlePresetClick(id)}
          type="button"
          style={{
            color: '#999',
            paddingLeft: '15px',
            paddingRight: 0
          }}
        >{label}</Button>
      ))}
      <Button
        onClick={handleFullClick}
        title="Full"
        type="button"
        style={{
          color: '#999',
          paddingLeft: '15px',
          paddingRight: 0
        }}
      >Full</Button>
    </>
  );
};

const addChannel = api => {
  addons.add(panelId, {
    ...constants,
    match: ({ viewMode }) => viewModes.includes(viewMode),
    render: () => <TaffyTool />
  });
};

addons.register(addonId, addChannel);