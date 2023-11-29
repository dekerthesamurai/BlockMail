import { senderData } from "../../data";
import React , {useState} from 'react';
import ComposeModal from "../../components/ComposeModal/ComposeModal";


const Mail = ({email}) => {
    const [showComposeModal, setShowComposeModal] = useState(false);

    const openComposeModal = async () => {
        console.log(openComposeModal)
        try {
            // Check if MetaMask is installed
            if (window.ethereum) {
                // Request the user to connect their MetaMask account
                await window.ethereum.request({ method: 'eth_requestAccounts' });

                // If the user approves the connection, show the compose mail modal
                setShowComposeModal(true);
            } else {
                console.error('MetaMask not detected. Please install MetaMask to use this feature.');
            }
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
        }
    };

    const closeComposeModal = () => {
        setShowComposeModal(false);
    }
    const handleSubmit = ({ email, body }) => {
        console.log(email, body);
    };
    
    return (
        <div className="bg-white text-black min-h-screen w-full flex flex-row items-center" >
            <div className='w-[15%] h-screen justify-between bg-[#374249]'>
                <div className='bg-white-500 h-[5%] border border-gray border-1 p-4 flex items-center justify-center'>
                    <button onClick={openComposeModal} className="bg-blue-500 text-white px-2 py-1 rounded-lg">Compose Mail</button>
                    <ComposeModal 
                        isOpen = {showComposeModal} 
                        onClose = {closeComposeModal} 
                        onSubmit = {handleSubmit}
                    />
                </div>
                <div className='h-[7%] text-white flex flex-col pl-4 pt-2'>Inbox</div>
                <div className='h-[7%] text-white pl-4 pt-2'>Starred</div>
                <div className='h-[7%] text-white pl-4 pt-2'>Important</div>
                <div className='h-[7%] text-white pl-4 pt-2'>Sent</div>
                <div className='h-[7%] text-white pl-4 pt-2'>Draft</div>
                <div className='h-[7%] text-white pl-4 pt-2'>Trash</div>
                <hr className='bg-white-500 h-[0.1%]'></hr>
                {/* <div className=' h-[7%] text-white/30 pl-4 pt-2'>Settings</div> */}
                <div className=' h-[7%] text-white/30 pl-4 pt-2'>Logout</div>
            </div>
            <div className='w-[30%] bg-white-500 h-screen'>
                <div className='h-[5%] border border-gray border-1 p-4 flex items-center justify-center text-xl font-bold '>INBOX</div>
                <div className='border border-gray border-1  flex justify-center'>
                    <div className='w-full border'>
                        {senderData.map((sender) => (
                            <div key={sender.senderName} className='flex flex-row  p-4'>
                                <div className='bg-blue-500 rounded-full border'></div>
                                <div className='flex flex-col pl-4'>
                                    <div className='text-black font-bold'>{sender.senderName}</div>
                                    <div className='text-black/30'>{sender.subject}</div>
                                </div>
                                <hr className='bg-white-500 h-[0.1%]'></hr>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
            <div className='w-[55%] bg-white-500 h-screen'>
                <div className='h-[5%] border border-gray border-1 p-4 flex items-center justify-left font-bold text-xl'>Jarvis is Live</div>
                <div className='h-full border border-gray border-1 p-4 '>
                    <div className='items-left'>
                        <div className='flex items-center justify-between'>

                            <div className='text-black font-bold'>{senderData[2].senderName}</div>
                            <div className='text-black'>{senderData[2].time}</div>
                            <div className='text-black'>{senderData[2].date}</div>
                        </div>
                        <div className='text-black'>{senderData[2].senderEmail}</div>
                        <br></br>
                        {/* <div className='text-black font-bold'>{senderData[2].subject}</div> */}
                        <div className='text-black'>{senderData[2].message}</div>

                    </div>

                </div>
            </div>
        </div>
    )

}


export default Mail;