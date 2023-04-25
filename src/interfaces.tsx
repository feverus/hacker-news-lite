export type NewsItem = {
	"by": string,
	"descendants": number,
	"id": number,
	"kids": number[],
	"score": number,
	"time": number,
	"title": string,
	"type": string,
	"url": string,
	"deleted"?: boolean,
	"dead"?: boolean,	
}

export const emptyNewsItem = {
	"by": '',
	"descendants": 0,
	"id": 0,
	"kids": [],
	"score": 0,
	"time": 0,
	"title": '',
	"type": '',
	"url": '',
	"deleted": false,
	"dead": false,	
}

export type CommentItem = {
	"by": string,
	"id": number,
	"kids"?: number[],
	"parent": number,
	"text": string,
	"time": number,
	"type": string,
	"deleted"?: boolean,
	"dead"?: boolean,	
}
