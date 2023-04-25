import { NewsItem } from '~/interfaces'

export type UseNewsItemBlock = (newStorie: NewsItem, index: number) => [
    state: {
        one: boolean,
        content: JSX.Element,
    },
    api: {
        goTo: (page: string) => void,
    }
];