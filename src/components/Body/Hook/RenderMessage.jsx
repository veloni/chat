import React, { useRef } from 'react';

const RenderMessage = ({ 
	workChatHistory,
	funChatHistory,
	createPopUp,
	switchСhat,
}) => {
		
	return (
		<div className="wrapper-main-body">
			{switchСhat && funChatHistory.map((item, key) => (
				<div 
					key={key}
					className="wrapper-message"
				>
					<div 
						id={item.id} 
						className="wrapper-message-text"
						onClick={(e) => createPopUp(e, item.id)}
					>
						<div className="wrapper-nick-message">
							<div className="wrapper-nick-name">
								{item.nickName}
							</div>
							{!item.isImg &&
							<span className="text-in-message">
								{item.message}
							</span>}
							{item.isImg && 
							<img
								className="wrapper-sticker"
								src={item.message}
								alt={"sticler"}
							/>}
						</div>
						<div className="wrapper-time-in-message">
							<span className="time-in-message">
								{item.date}
							</span>
						</div>
					</div>
				</div>
			))} 
			{!switchСhat && workChatHistory.map((item, key) =>  (
				<div 
					key={key}
					className="wrapper-message"
				>
					<div 
						className="wrapper-message-text"
						id={item.id} 
						onClick={(e) => createPopUp(e, item.id)}
					>
						<div className="wrapper-nick-message">
							<div className="wrapper-nick-name">
								{item.nickName}
							</div>
							{!item.isImg &&
								<span className="text-in-message">
									{item.message}
								</span>}
							{item.isImg && 
								<img
								className="wrapper-sticker"
								src={item.message}
								alt={"sticler"}
								/>}
						</div>
						<div className="wrapper-time-in-message">
							<span className="time-in-message">
								{item.date}
							</span>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
export default RenderMessage;
