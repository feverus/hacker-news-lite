import { CommentItem } from '~/interfaces'

export type UseComment = (id: number) => [
	state: {
		comment: CommentItem | undefined,
		showKids: boolean,
	},
	api: {
		toggleShowKids: () => void,
	}
];