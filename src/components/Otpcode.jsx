import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import forget from '../components/images/forget.png';
import '../components/css/signup.css'; // Assuming your CSS file is correctly imported

const Otpcode = () => {
    const [isSetupCompleted, setIsSetupCompleted] = useState(false);
    const [seconds, setSeconds] = useState(120);
    const [canResend, setCanResend] = useState(false);
    const [verificationCode, setVerificationCode] = useState(['', '', '', '']); // Array to hold 4-digit code
    const navigate = useNavigate();

    useEffect(() => {
        const countdown = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds <= 1) {
                    clearInterval(countdown);
                    setCanResend(true);
                    return 0;
                }
                return prevSeconds - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, []);

    const handleSubmit = () => {
        const code = verificationCode.join('');
        if (code.length === 4) {
            // You can add your verification logic here
            // For now, we just simulate the completion
            setIsSetupCompleted(true);
        } else {
            alert("Please enter a 4-digit verification code.");
        }
    };

    const handleGoBack = () => {
        navigate('/login'); // Adjust the path as needed to point to your login screen
    };

    const handleResendCode = () => {
        if (canResend) {
            setSeconds(120); // Reset the timer to 2 minutes
            setCanResend(false);
            // Add logic to resend the verification code
            alert("Verification code resent!");
        } else {
            alert("You can only resend the code after the timer runs out.");
        }
    };

    const handleChange = (index, value) => {
        const updatedCode = [...verificationCode];
        updatedCode[index] = value;
        setVerificationCode(updatedCode);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
            <main className="flex flex-col items-center justify-center w-full h-full px-20 text-center">
                <div className='bg-white rounded-2xl shadow-2xl flex w-full max-w-4xl'>
                    {/* Left side */}
                    <div className='w-full md:w-2/5 bg-green-500 text-white rounded-tl-2xl rounded-bl-2- flex items-center justify-center'>
                        <div>
                            <h2 className='text-3xl font-bold mb-2'>SmartCricket</h2>
                            <img src={forget} alt="forget Image" className="w-56 h-56 mb-4" />
                        </div>
                    </div>
                    {/* Right side */}
                    <div className='w-full md:w-3/5 p-5'>
                        <div className='text-right font-bold'>
                            <span className='text-green-500'> Smart</span>Cricket
                        </div>
                        {isSetupCompleted ? (
                            <div className="flex flex-col items-center justify-center my-4">
                                <h2 className='text-3xl font-bold text-green-500 mb-2'>Setup Completed</h2>
                                <p>Your account is now protected with two-factor authentication.</p>
                                <button
                                    className="mt-4 bg-green-500 text-white rounded-lg px-8 py-2 font-semibold hover:bg-green-600"
                                    onClick={handleGoBack}
                                >
                                    Go Back to Login
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className='py-10'>
                                    <h2 className='text-3xl font-bold text-green-500 mb-2'>Two-Factor Authentication</h2>
                                    <div className='border-2 border-green-500 inline-block mb-2 w-96'></div>
                                </div>
                                <div className="flex flex-col items-center justify-center my-4">
                                    <b><p>Email Setup</p></b>
                                    <p>We have sent a verification code to player@gmail.com</p>
                                    <b><p>1. Go to your inbox</p></b>
                                    <p>Can't find a verification code? Make sure to check the spam folder.</p>
                                    <b><p>2. Finish setup</p></b>
                                    <p>Enter a verification code we sent to your email.</p>
                                    <div className="flex space-x-2 mt-4">
                                        {verificationCode.map((digit, index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                className="border-2 border-gray-300 rounded-lg w-12 h-12 text-center text-2xl"
                                                maxLength="1"
                                                value={digit}
                                                onChange={(e) => handleChange(index, e.target.value)}
                                            />
                                        ))}
                                    </div>
                                    <button 
                                        className="mt-4 bg-green-500 text-white rounded-lg px-8 py-2 font-semibold hover:bg-green-600"
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </button>
                                    <p className="mt-2">{`00:${seconds < 10 ? `0${seconds}` : seconds} sec`}</p>
                                    <p className="mt-2">Don't receive a code? <a href="#" className="text-green-500" onClick={handleResendCode}>Re-send</a></p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Otpcode;
