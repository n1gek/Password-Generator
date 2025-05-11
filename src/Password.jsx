import './index.css';
import { useState, useCallback, useEffect, useRef } from 'react';

function Password() {
    const [length, setLength] = useState(20);
    const [numbers, setNumbers] = useState(false);
    const [characters, setCharacters] = useState(false);
    const [password, setPassword] = useState('');

    const generatePassword = useCallback(() => {
        let password = '';
        let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (numbers) str += '0123456789';
        if (characters) str += '!@#$%^&*()_+[]{}|;:,.<>?';

        for (let i=0; i < length; i++) {
            password += str.charAt(Math.floor(Math.random() * str.length + 1));
        }
        setPassword(password);
    } , [length, numbers, characters]);

    useEffect(() => {
        generatePassword();
    }, [length, numbers, characters]);

    const passwordRef = useRef(null);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password)
        passwordRef.current?.select();
    };

    return (
        <>
            <div className='w-full h-screen bg-gray-600 justify-center flex'>
               <div className='text-white p-20 m-20 w-200 text-center justify-center items-center bg-gray-700 rounded-3xl'>
                   <h1 className='text-2xl'>Password Generator</h1>

                   <form action="" className='flex flex-row mt-20 m-3' onSubmit={(e) => e.preventDefault()}>
                       <input type="text" value={password} ref={passwordRef} className="p-2 text-black bg-white h-20 rounded-l-2xl w-150 outline-none focus:ring-0" />
                       <button type="submit" className="h-20 bg-blue-500 text-white rounded-r-2xl w-50 focus:bg-blue-800" onClick={copyToClipboard}>Copy</button>
                   </form>

                   <div className="flex flex-row gap-4 mt-5 px-4 justify-between w-150">
                        <div>
                            <input type="range" id='length' min={8} max={32} value={length} className='w-1/2' onChange={(event) => setLength(event.target.value)} />
                             <label htmlFor="length" className='m-2'>Length: {length}</label>
                        </div>

                        <div>
                            <label htmlFor="numbers" className='m-2'>Numbers</label>
                            <input type="checkbox" id="numbers" checked={numbers} onChange={() => setNumbers((prev) => !prev)} />
                        </div>

                        <div>
                            <label htmlFor="characters" className='m-2'>Characters</label>
                            <input type="checkbox" id="characters" checked={characters} onChange={() => setCharacters((prev) => !prev)} />
                        </div>
                   </div>

               </div>
            </div>
        </>
    )

}
export default Password;