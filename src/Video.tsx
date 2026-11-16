import React from 'react';
import {Story, StoryProps} from './common/Story';
import {segments} from './script';
import {BG, SceneVisual} from './Scenes';
import {Rhythm0Thumbnail} from './Thumbnail';

export type Rhythm0Props = StoryProps;

export const Rhythm0: React.FC<Rhythm0Props> = (props) => (
  <Story
    {...props}
    segments={segments}
    folder=""
    bg={BG}
    render={(seg, dur) => <SceneVisual visual={seg.visual} dur={dur} />}
    thumbnail={<Rhythm0Thumbnail />}
  />
);
