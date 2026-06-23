import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import Astra from "../assets/Astra.png";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    idea: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "budget" && value && !/^\d*$/.test(value)) return;

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Fill this field";
    if (!formData.email.trim()) newErrors.email = "Fill this field";
    if (!formData.service.trim()) newErrors.service = "Fill this field";
    if (!formData.idea.trim()) newErrors.idea = "Fill this field";

    if (formData.service && formData.service !== "other" && !formData.budget.trim()) {
      newErrors.budget = "Fill this field";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStatus("sending");
    try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,{
        ...formData,
        from_name: formData.name,
        reply_to: formData.email,
      },
      PUBLIC_KEY
    );setStatus("success");
    setFormData({
      name:"",
  email:"",
  service:"",
  budget:"",
  idea:"",
    });

    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus("error");
    }
  };

  const inputClassName = (error) =>
    `p-3 rounded-md bg-white/10 border ${error ? "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500`;

  return(
    <section id="contact"
    className="w-full min-h-screen relative  overflow-hidden text-white py-20 px-6 md:px-20 flex flex-col
    md:flex-row items-center gap-10 ">
      <div
      className="relative z-10 w-full flex flex-col md:flex-row items-center gap-10">
        <motion.div className="w-full md:w-1/2 flex justify-center"
        initial={{opacity:0,x:-50}}
        whileInView={{opacity:1,x:0 }}
        transition={{duration:0.6}}
        >
          <motion.img src={Astra} alt="Astro"
          className="w-72 md:w-140 rounded-2xl shadow-lg object-cover"
          animate={{y:[0,-10,0]}}
          transition={{duration:2, repeat:Infinity, ease:"easeInOut"}}
          />
          </motion.div>

          <motion.div className="w-full md:w-1/2 bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10"
          initial={{opacity:0,x:50}}
        whileInView={{opacity:1,x:0 }}
        transition={{duration:0.6}}
          >
            <h2 className="text-3xl font-bold mb-6">
              Let's Work Together
            </h2>
            <form
            className="flex flex-col gap-5" onSubmit={handleSubmit}
            >
              <div className="flex flex-col ">
                <label className="mb-1">Your Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClassName(errors.name)}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}

              </div>
              <div className="flex flex-col">
                <label className="mb-1 ">Your E-mail
                  <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClassName(errors.email)}
                  />
                {errors.email && <p className="text-red-500">{errors.email}</p>}

              </div >
              <div className="flex flex-col">
                <label className="mb-1"> Service Needed <span className="text-red-500">*</span></label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={inputClassName(errors.service)}
                >
                  <option value="" disabled>Something in Mind?</option>
                  <option value="Data Science" className="text-black">Data Science</option>
                  <option value="Python" className="text-black">Python</option>
                  <option value="Machine Learning"className="text-black">Machine Learning</option>
                  <option value="other" className="text-black">Others</option>

                </select>
                {errors.service && <p className="text-red-500">{errors.service}</p>}

              </div>

                {formData.service && formData.service !== "other" && (
                  <div className="flex flex-col">
                    <label className="mb-1">Budget <span className="text-red-500">*</span></label>
                    <input
                      type="number"
                      min="0"
                      name="budget"
                      placeholder="Your Budget"
                      onChange={handleChange}
                      value={formData.budget}
                      className={inputClassName(errors.budget)}
                    />
                    {errors.budget && <p className="text-red-500">{errors.budget}</p>}
                    

                  </div>
                )}
                <div className="flex flex-col">
                  <label className="mb-1"> Explain Your Idea<span className="text-red-500">*</span></label>
                  <textarea
                    name="idea"
                    rows={5}
                    placeholder="Enter your idea"
                    value={formData.idea}
                    onChange={handleChange}
                    className={inputClassName(errors.idea)}
                  ></textarea>
                  {errors.idea && <p className="text-red-500">{errors.idea}</p>}


                </div>
                {status && (
                  <p className={`text-sm ${status === "success" ? "text-green-500" : status === "error" ? "text-red-500" : "text-yellow-400"}`}>
                    {status === "sending" ? "sending..." : status === "success" ? "Message sent successfully ✅" : "Something went wrong ❌"}
                  </p>
                )}
                <motion.button className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-md font-semibold transition"
                whileHover={{scale:1.05}}
                whileTap={{scale:0.95}}
                disabled={status==="sending"}
                type="submit"
                >
                  {status==="sending" ? "sending..." : "Send Message"}
                </motion.button>
              


            </form>

          </motion.div>

      </div>

    </section>
  )
}