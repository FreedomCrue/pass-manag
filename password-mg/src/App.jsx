import React, { Component } from 'react'; 
import './App.css'; 
import { FaCopy, FaEdit, FaTrash } from 'react-icons/fa'; 

class App extends Component { 
constructor(props) { 
	super(props); 

	this.state = { 
	website: '', 
	username: '', 
	password: '', 
	passwords: [], 
	alertVisible: false, 
	editing: false, 
	editIndex: null, 
	showPassword: false, 
	}; 
} 

componentDidMount() { 
	this.showPasswords(); 
} 

copyPassword = async (pass) => { 
	try { 
	const textArea = document.createElement('textarea'); 
	textArea.value = pass; 
	document.body.appendChild(textArea); 
	textArea.select(); 
	document.execCommand('Скопированно!'); 
	document.body.removeChild(textArea); 
	this.setState({ alertVisible: true }); 
	setTimeout(() => { 
		this.setState({ alertVisible: false }); 
	}, 2000); 
	} catch (error) { 
	console.error('Ошибка копирования', error); 
	} 
}; 
 
deletePassword = (website) => { 
	const updatedPasswords = this.state.passwords.filter( 
	(e) => e.website !== website 
	); 
	this.setState({ passwords: updatedPasswords }); 
	alert(`Успешно удален пароль ${website}`); 
}; 

showPasswords = () => { 
	this.setState({ 
	passwords: [], 
	website: '', 
	username: '', 
	password: '', 
	editing: false, 
	editIndex: null, 
	showPassword: false, 
	}); 
}; 

savePassword = () => { 
	const { website, username, password, editing, editIndex, passwords } = 
	this.state; 

	if (!website || !username || !password) { 
	alert('Пожалуйста, заполните все поля.'); 
	return; 
	} 

	if (editing && editIndex !== null) { 
	const updatedPasswords = [...passwords]; 
	updatedPasswords[editIndex] = { 
		website, 
		username, 
		password, 
	}; 
	this.setState({ 
		passwords: updatedPasswords, 
		editing: false, 
		editIndex: null, 
		website: '', 
		username: '', 
		password: '', 
	}); 
	} else { 
	const newPassword = { 
		website, 
		username, 
		password, 
	}; 
	this.setState((prevState) => ({ 
		passwords: [...prevState.passwords, newPassword], 
		website: '', 
		username: '', 
		password: '', 
	})); 
	} 
}; 

editPassword = (index) => { 
	const { passwords } = this.state; 
	this.setState({ 
	editing: true, 
	editIndex: index, 
	website: passwords[index].website, 
	username: passwords[index].username, 
	password: passwords[index].password, 
	}); 
}; 

togglePasswordVisibility = () => { 
	this.setState((prevState) => ({ 
	showPassword: !prevState.showPassword, 
	})); 
}; 

renderPasswordList = () => { 
	const { passwords, showPassword } = this.state; 

	return passwords.map((item, index) => ( 
	<div className="passwordItem" key={index}> 
		<div className="listItem"> 
		<div className="listLabel">Сайт:</div> 
		<div className="listValue">{item.website}</div> 
		<div className="listLabel">Юзер:</div> 
		<div className="listValue">{item.username}</div> 
		<div className="listLabel">Пароль:</div> 
		<div className="listValue"> 
			<span className="passwordField"> 
			{showPassword ? item.password : item.password.replace(/./g, '*')} 
			</span> 
		</div> 
		<div className="passwordButtons"> 
			<button 
			className="showPasswordButton"
			onClick={this.togglePasswordVisibility} 
			> 
			{showPassword ? 'Спрятать' : 'Показать'} 
			</button> 
		</div> 
		<div className="iconContainer"> 
			<div 
			className="icon"
			onClick={() => this.copyPassword(item.password)} 
			> 
			<FaCopy size={20} color="#ffff" /> 
			</div> 
			<div className="icon" onClick={() => this.editPassword(index)}> 
			<FaEdit size={20} color="#ffff" /> 
			</div> 
			<div 
			className="icon"
			onClick={() => this.deletePassword(item.website)} 
			> 
			<FaTrash size={20} color="#ffff" /> 
			</div> 
		</div> 
		</div> 
	</div> 
	)); 
}; 

render() { 
	const { website, username, password, editing } = this.state; 

	return ( 
	<div className="container"> 
		<div className="content"> 
		<h1 className="heading" style={{ color: 'black' }}>Менеджер паролей </h1> 
		<h2 className="subHeading" style={{ color: 'black' }}>  
		Ваши пароли
			{this.state.alertVisible && <span id="alert">(Скопировано!)</span>} 
		</h2> 
		{this.state.passwords.length === 0 ? ( 
			<p className="noData">Нет данных</p> 
		) : ( 
			<div className="table">{this.renderPasswordList()}</div> 
		)} 

		<h2 className="subHeading" style={{ color: 'black' }}> 
			{editing ? 'Обновить пароль' : 'Добвавить пароль'} 
		</h2> 
		<input 
			className="input"
			placeholder="URL ссылка"
			value={website} 
			onChange={(e) => this.setState({ website: e.target.value })} 
		/> 
		<input 
			className="input"
			placeholder="Имя пользователя"
			value={username} 
			onChange={(e) => this.setState({ username: e.target.value })} 
		/> 
		<input 
			className="input"
			placeholder="Пароль"
			type="password"
			value={password} 
			onChange={(e) => this.setState({ password: e.target.value })} 
		/> 
		<div className="submitButton" onClick={this.savePassword}> 
			<span className="submitButtonText"> 
			{editing ? 'Обновить пароль' : 'Добвавить пароль'} 
			</span> 
		</div> 
		</div> 
	</div> 
	); 
} 
} 

export default App; 

