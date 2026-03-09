import { useState, type SubmitEvent } from 'react';
import { SignIn } from '../../services/auth';
import { Link, useNavigate } from 'react-router-dom';
import img from '../../../public/vite.svg';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleOnSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const user = await SignIn(email, password);
			console.log(user);
			if (user) navigate('/');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className='login'>
			<div className='form-container'>
				<div className='logo'>
					<img src={img} />
				</div>
				<div className='form-header'>
					<h2>Login</h2>
				</div>
				<div className='form-group'>
					<form onSubmit={e => handleOnSubmit(e)}>
						<div className='input-group'>
							<label htmlFor='email'>Email</label>
							<input
								id='email'
								type='email'
								value={email}
								onChange={e => setEmail(e.target.value)}
								placeholder='email'
								required
							/>
						</div>
						<div className='input-group'>
							<label htmlFor='password'>Password</label>
							<input
								id='password'
								type='password'
								value={password}
								onChange={e => setPassword(e.target.value)}
								placeholder='Password'
								required
							/>
						</div>
						<div className='button-group'>
							<button title='Login' type='submit'>
								Submit
							</button>
							<Link to='/register'>Register</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
export default LoginPage;
