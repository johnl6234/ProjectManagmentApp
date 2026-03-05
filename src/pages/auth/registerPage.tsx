import { useState, type SubmitEvent } from 'react';
import { registerUser } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const navigate = useNavigate();
	const handleOnSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!name || !email || !password || !confirmPassword) return;
		if (password != confirmPassword) {
			//TODO show error
			return;
		}
		const user = await registerUser(name, email, password);
		console.log(user);
		if (user) navigate('/');
	};

	return (
		<div className='login'>
			<div className='form-container'>
				<div className='form-header'>
					<h2>Login</h2>
				</div>
				<div className='form-group'>
					<form onSubmit={e => handleOnSubmit(e)}>
						<div className='input-group'>
							<label htmlFor='name'>Name</label>
							<input
								id='name'
								type='text'
								value={name}
								onChange={e => setName(e.target.value)}
								placeholder='name'
								required
							/>
						</div>
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
						<div className='input-group'>
							<label htmlFor='confirmPassword'>Confirm Password</label>
							<input
								id='confirmPassword'
								type='password'
								value={confirmPassword}
								onChange={e => setConfirmPassword(e.target.value)}
								placeholder='Password'
								required
							/>
						</div>
						<div className='button-group'>
							<button title='Login' type='submit'>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
export default RegisterPage;
