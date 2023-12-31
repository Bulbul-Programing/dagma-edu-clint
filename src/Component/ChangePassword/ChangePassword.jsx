import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const ChangePassword = () => {
    const { resetPassword } = useContext(AuthContext)

    const handleResetPassword = (e) => {
        e.preventDefault()
        const email = e.target.email.value

        resetPassword(email)
            .then(() => {

            })
            .catch(() => {
                console.log('error');
            })
    }

    return (
        <div className="m-5 md:m-10 lg:m-20">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center">Please Provide your email for change password</h1>
            <div className="flex gap-x-5 gap-y-10 flex-col-reverse md:flex-row-reverse lg:flex-row-reverse justify-between items-center ">
                <div className="w-full md:w-1/2 lg:w-1/2 ">
                    <img className="md:w-[350px] lg:w-[500px]" src="https://i.ibb.co/vQNgPyS/7070629-3293465.jpg" alt="" />
                </div>
                <div className="w-[450px] shadow-2xl p-10 rounded-3xl">
                    <form onSubmit={handleResetPassword}>
                        <div className="form-control">
                            <input type="email" placeholder="Email" className="px-4 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" name="email" required />
                        </div>
                        <input className='btn mt-6 bg-blue-500 w-full text-white hover:text-black' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;