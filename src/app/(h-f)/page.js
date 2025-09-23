'use client'
import RequiredIndicator from "@/components/RequiredIndicator"
import Link from "next/link"
import { toast } from "react-toastify"

const Home = () => {

  const handleContactUs = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/contact-query', {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: e.target.name.value,
          email: e.target.email.value,
          query: e.target.query.value
        })
      })
      const data = await response.json()
      if (data.message) {
        toast.success(data.message)
      } else {
        toast.error(data.error)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="flex flex-col text-white text-[20px]">
      <div className="animated-gradient text-[20px] flex flex-col items-center justify-center h-[calc(100vh-80px)] shadow-lg shadow-[#001010b7] z-10">
        <h1 className="text-[150px] text-teal-400">EduSync</h1>
        <p>Simplify education management and empower educators.</p>
        <p>Transform learning with ease and efficiency.</p>
      </div>
      <div className="bg-zinc-950 text-[18px]">
        <div className="flex flex-col p-[50px] border-b-[1px] border-gray-900">
          <h1 className="text-[40px] mb-[10px] font-bold">What We Do</h1>
          <div className="text-gray-300">
            <p className="my-[10px]">At Edusync, we are dedicated to revolutionizing the way education is managed and experienced. Our innovative platform simplifies course creation, management, and communication for educators and students alike.</p>
            <p className="my-[10px]">We strive to make learning more accessible, efficient, and engaging. With a focus on innovation and ease of use, our platform empowers educators to focus on what they do best: teaching, while providing students with a seamless learning experience.</p>
            <p className="my-[10px]">Our vision is to foster a connected world where education is personalized, interactive, and accessible to everyone. We are committed to helping educational institutions, instructors, and learners achieve their goals through technology.</p>
            <p className="my-[10px]">Join us as we build the future of education!</p>
          </div>
        </div>
        <div className="p-[50px]  border-b-[1px] border-gray-900">
          <p className="text-center">We believe in transparency and flexibility. Whether you're an individual educator, a small institution, or a large organization, we have plans tailored to your unique needs. Start with the basics or unlock advanced features for a comprehensive experience.</p>
          <div className="text-center py-8">
            <Link href="/pricing" className="inline-block bg-teal-500 text-black font-semibold text-lg py-3 px-6 rounded-lg shadow-md hover:bg-teal-600 transition ease-in-out duration-200">
              Check Out Our Pricing Plans
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center w-full p-[50px] border-b-[1px] border-gray-900">
          <h1 className="text-[40px] mb-[20px] font-bold">Contact Us</h1>
          <div className="w-full flex justify-center">
            <form className="w-1/2" onSubmit={handleContactUs}>
              <div className="flex flex-col mb-[20px]">
                <label htmlFor="name" className="mb-[10px] text-[20px]"><RequiredIndicator />Name</label>
                <input id='name' type="name" className="w-full px-[20px] py-[10px] bg-zinc-900 rounded-md outline-none focus:border-[1px] focus:border-teal-800" required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-[10px] text-[20px]"><RequiredIndicator />Email</label>
                <input id='email' type="email" className="w-full px-[20px] py-[10px] bg-zinc-900 rounded-md outline-none focus:border-[1px] focus:border-teal-800" required />
              </div>
              <div className="flex flex-col my-[20px]">
                <label htmlFor="query" className="mb-[10px] text-[20px]"><RequiredIndicator />Query</label>
                <textarea id="query" name="query" className="w-full px-[20px] py-[10px] bg-zinc-900 rounded-md outline-none focus:border-[1px] focus:border-teal-800 overflow-hidden resize-none" required rows="1"
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }} />
              </div>
              <div className="mt-[40px] w-full flex justify-center">
                <input type="submit" value='Send' className="cursor-pointer w-1/2 bg-teal-500 text-black font-semibold py-[10px] rounded-md shadow-md hover:bg-teal-600 transition ease-in-out duration-200" />
              </div>
            </form>
          </div>
        </div>
      </div >
    </div >
  )
}

export default Home
