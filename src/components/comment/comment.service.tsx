import { useRef, useState, useEffect } from 'react'
import { UseComment } from "./comment.props"
import { getCommmentItem } from "~/api"
import { CommentItem } from '~/interfaces'

const useComment:UseComment = (id: number) => { 
	const [comment, setComment] = useState<CommentItem>()
	const [showKids, setShowKids] = useState(false)
	const commentRef = useRef<HTMLDivElement | null>(null)
	
	const getComment = async(id: number) => {
		return await getCommmentItem(id)
	}

	const toggleShowKids = () => {
		setShowKids(!showKids)
	}

	useEffect(() => {
		getComment(id)
			.then(comment => {
				if (comment!==undefined) setComment(comment)
			})
	}, [])

	const state = {
		comment: comment,
		showKids: showKids,
	}
	const api = {
		toggleShowKids: toggleShowKids,
	}
	
	return (
			[state, api]
	)
}

export default useComment