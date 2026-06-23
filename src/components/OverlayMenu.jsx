import {motion,AnimatePresence} from "framer-motion";
import {FiX} from "react-icons/fi";



const menuItems = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Contact",
];

export default function OverlayMenu({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          style={{ backgroundColor: "rgba(0,0,0,0.22)" }}
        >
          <motion.div
            className="w-full max-w-xs rounded-3xl border border-white/10 bg-slate-950/95 shadow-2xl backdrop-blur-xl"
            initial={{ opacity: 0, y: -24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.94 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <span className="text-base font-semibold text-white">Menu</span>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-white/5 p-2 text-white transition hover:bg-white/10"
                aria-label="Close menu"
              >
                <FiX size={20} />
              </button>
            </div>
            <motion.ul className="space-y-2 px-4 pb-4">
              {menuItems.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ delay: index * 0.05, duration: 0.22 }}
                >
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={onClose}
                    className="block rounded-2xl px-4 py-3 text-white text-lg font-medium transition-colors hover:bg-white/5 hover:text-cyan-300"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

