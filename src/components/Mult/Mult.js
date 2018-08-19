import React from 'react'
import './Mult.css'

class Mult extends React.Component {

	render() {
		const {multTitle, multSubtitle} = this.props;

		return (
			<div className='mult'>
				<div className='mult__container'>
					<h1 className='mult__title'>{multTitle}</h1>
					<div className='mult__wrapper'>
						<span className='mult__suit mult__suit--dark'>&clubs;</span>
						<span className='mult__suit mult__suit--red'>&hearts;</span>
						<span className='mult__suit mult__suit--red'>&diams;</span>
						<span className='mult__suit mult__suit--dark'>&spades;</span>
					</div>
					<p className='mult__subtitle'>{multSubtitle}</p>
				</div>
			</div>)
	}

}

export default Mult
