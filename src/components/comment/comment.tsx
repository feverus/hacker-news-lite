import useComment from './comment.service'
import { dateStampToDate } from '~/service/textFunction'
import C from './comment.module.scss'

export function Comment(props: {id: number, depth: number}) {
	const [state, api] = useComment(props.id)

	if (!state.comment) return <></>

	const commentStyle = (props.depth===0) ?
		(C.comment + ' ' + C.delay)
		:
		C.comment

	if (state.comment.dead || state.comment.deleted) return (
		<div className = {commentStyle}>
			Комментарий удалён
		</div>
	)

	const commentText = 
		<>	
			<div>
				<h2>{state.comment.by} :</h2>
			</div>
			<div
				className={C.comment_text}
				dangerouslySetInnerHTML = {{__html:state.comment.text}}>
			</div>
			<div className={C.comment_date}>
				{dateStampToDate(state.comment.time)}
			</div>
		</>	

	return (		
		<>
			{(state.comment.kids) ?
				<button
					onClick = {api.toggleShowKids}
					className = {commentStyle + C.haveKids}
				>
					{commentText}
				</button>
				:
				<div className = {commentStyle}>
					{commentText}
				</div>
			}
			{state.showKids && state.comment.kids &&
				state.comment.kids.map(id => 
					<div key={id} className = {C.comment_block}>
						<Comment id={id} depth={props.depth + 1} />
					</div>				
				)
			}

		</>
	)
}