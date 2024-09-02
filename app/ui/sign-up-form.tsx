import { CiLock, CiMail, CiUser } from "react-icons/ci"

export default function SignUpForm() {
    return (
        <form className="flex flex-col w-full md:w-1/2 px-6 py-4 bg-white border border-green-200 shadow-lg rounded-lg">
            <h1 className="text-2xl font-semibold mb-6 text-center text-green-700">Sign Up</h1>
            <div className="flex flex-col mb-4">
                <label htmlFor="firstname" className="flex gap-2 items-center mb-2 text-green-600">
                    <CiUser className="text-xl" />
                    <span>First Name</span>
                </label>
                <input type="text" name="firstname" id="firstname" className="p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div className="flex flex-col mb-4">
                <label htmlFor="lastname" className="flex gap-2 items-center mb-2 text-green-600">
                    <CiUser className="text-xl" />
                    <span>Last Name</span>
                </label>
                <input type="text" name="lastname" id="lastname" className="p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div className="flex flex-col mb-4">
                <label htmlFor="username" className="flex gap-2 items-center mb-2 text-green-600">
                    <CiUser className="text-xl" />
                    <span>Username</span>
                </label>
                <input type="text" name="username" id="username" className="p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div className="flex flex-col mb-4">
                <label htmlFor="email" className="flex gap-2 items-center mb-2 text-green-600">
                    <CiMail className="text-xl" />
                    <span>Email</span>
                </label>
                <input type="email" name="email" id="email" className="p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div className="flex flex-col mb-4">
                <label htmlFor="password" className="flex gap-2 items-center mb-2 text-green-600">
                    <CiLock className="text-xl" />
                    <span>Password</span>
                </label>
                <input type="password" name="password" id="password" className="p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div className="flex flex-col mb-6">
                <label htmlFor="confirm-password" className="flex gap-2 items-center mb-2 text-green-600">
                    <CiLock className="text-xl" />
                    <span>Confirm Password</span>
                </label>
                <input type="password" name="confirm-password" id="confirm-password" className="p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div className="flex justify-center mb-4">
                <button className="w-full py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition duration-300">Sign Up</button>
            </div>
            <p className="text-center text-green-600">Already have an account? <a href="/login" className="text-green-700 hover:underline">Login</a></p>
        </form>

    );
}