import { NewsItem } from '~/interfaces'

export type UseNewsList = (newsItems: NewsItem[]) => [
    state: {
        newsItems: NewsItem[],
    },
    api: {
        updateIds: () => void,
    }
];