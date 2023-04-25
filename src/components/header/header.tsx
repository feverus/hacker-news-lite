import { setStore } from '~/store/setStore'
import { ReactSVG } from 'react-svg';
import { useNavigate } from 'react-router-dom'
import C from './header.module.scss'

type P = {autoUpdateChekbox: boolean, backButton: boolean}

export function Header(props: P ) {
	const navigate = useNavigate()

	const goBack = () => {
		setStore.setForceReverce(true)
		navigate(-1)
	}

	const autoRefreshText = (setStore.autoRefresh) ?
		'Выкл. автообновление'
		:
		'Вкл. автообновление'

	return (
		<header>
			{props.backButton && 
				<button
					onClick={goBack}
					className={C.back}
				>
				<ReactSVG src={'icons/arrow_back_FILL0_wght400_GRAD0_opsz48.svg'} />				
				</button>
			}

			<button
				onClick={() => setStore.setForceRefresh(true)}
			>
				<ReactSVG src={'icons/refresh_FILL0_wght400_GRAD0_opsz48.svg'} />
			</button>

			{props.autoUpdateChekbox && 
				<div className={C.box}>
					<input type="checkbox" id="autoRefresh"
						checked={setStore.autoRefresh}
						onChange={() => setStore.setAutoRefresh(!setStore.autoRefresh)}
					/>
					<span className={C.check}></span>
					<label htmlFor="autoRefresh">{autoRefreshText}</label>
				</div>
			}
		</header>
	)
}