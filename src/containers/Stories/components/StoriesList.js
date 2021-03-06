import React from 'react';

import { useFilteredStories } from 'containers/Stories/storiesHooks';
import { StoryHighlight } from 'containers/Story/components/StoryHighlight';
import InfiniteScroll from 'react-infinite-scroll-component';

export const StoriesList = ({
    tags,
    changeLocationByPath,
    title,
    rootPath
}) => {
    const { stories, hasMore, getByPage } = useFilteredStories(tags);

    return (
        <div className={'more-testimonies'}>
            {title}
            <InfiniteScroll
                dataLength={stories.length}
                next={getByPage}
                hasMore={hasMore}
                loader={stories.length > 0 ? <h4>Loading...</h4> : undefined}
            >
                <ul className="stories">
                    {stories &&
                        Object.keys(stories).map(key => {
                            return (
                                <StoryHighlight
                                    story={stories[key]}
                                    key={key}
                                    changeLocationByPath={() =>
                                        changeLocationByPath(
                                            `${
                                                rootPath !== undefined
                                                    ? rootPath
                                                    : '/story'
                                            }/${stories[key]._id}`,
                                            stories[key]
                                        )
                                    }
                                />
                            );
                        })}
                </ul>
            </InfiniteScroll>
        </div>
    );
};
